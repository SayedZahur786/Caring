import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Star, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { analyzeIngredient } from '@/lib/gemini';
import { toast } from 'sonner';

interface IngredientAnalysis {
  benefits: string;
  safety_usage_limit: string;
  side_effects: string;
  suitable_skin_types: string;
  how_to_use: string;
  mechanism_of_action: string;
  rating: number;
  category: string;
}

const IngredientChecker: React.FC = () => {
  const [ingredient, setIngredient] = useState('');
  const [analysis, setAnalysis] = useState<IngredientAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const commonIngredients = [
    'Hyaluronic Acid',
    'Niacinamide',
    'Retinol',
    'Vitamin C',
    'Salicylic Acid',
    'Glycolic Acid',
    'Ceramides',
    'Peptides',
    'Alpha Arbutin',
    'Azelaic Acid'
  ];
  const handleSelectCommon = (name: string) => {
    setIngredient(name);
    setAnalysis(null);
  };

  const handleAnalyze = async () => {
    if (!ingredient.trim()) {
      toast.error('Please enter an ingredient name');
      return;
    }

    setIsLoading(true);
    try {
      const result = await analyzeIngredient(ingredient.trim());
      setAnalysis(result);
      toast.success('Ingredient analyzed successfully!');
    } catch (error) {
      console.error('Error analyzing ingredient:', error);
      toast.error('Failed to analyze ingredient. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-600';
    if (rating >= 6) return 'text-yellow-600';
    if (rating >= 4) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRatingBadgeColor = (rating: number) => {
    if (rating >= 8) return 'bg-green-100 text-green-800';
    if (rating >= 6) return 'bg-yellow-100 text-yellow-800';
    if (rating >= 4) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-white to-[#F3E8FF] p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Section */}
        <div className="lg:col-span-3">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extrabold font-display text-gray-900 mb-2 tracking-tight">Ingredient Checker</h1>
              <p className="text-lg text-gray-600">Analyze skincare ingredients for safety and effectiveness</p>
            </div>
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold text-base shadow flex items-center gap-2">
              <Search className="w-5 h-5" />
              AI-Powered Analysis
            </span>
          </div>
          {/* Search Section */}
          <Card className="mb-8 border-0 shadow-xl bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <Search className="h-6 w-6" />
                Analyze Ingredient
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="Enter ingredient name (e.g., Niacinamide, Retinol, Hyaluronic Acid)"
                  value={ingredient}
                  onChange={(e) => setIngredient(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                  className="flex-1 text-lg"
                />
                <Button onClick={handleAnalyze} disabled={isLoading} size="lg" className="text-base font-semibold">
                  {isLoading ? 'Analyzing...' : 'Analyze'}
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-8">
              {/* Header with Rating */}
              <Card className="border-0 shadow-xl bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-3xl capitalize mb-2 font-bold">{ingredient}</CardTitle>
                      <Badge variant="secondary" className="mb-2 text-base px-3 py-1">{analysis.category}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className={`h-6 w-6 ${getRatingColor(analysis.rating)}`} />
                        <span className={`text-3xl font-extrabold ${getRatingColor(analysis.rating)}`}>{analysis.rating}/10</span>
                      </div>
                      <Badge className={getRatingBadgeColor(analysis.rating) + ' text-base px-3 py-1'}>
                        {analysis.rating >= 8 ? 'Excellent' : analysis.rating >= 6 ? 'Good' : analysis.rating >= 4 ? 'Moderate' : 'Caution'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              {/* Analysis Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-0 shadow-md bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600 text-lg font-semibold">
                      <CheckCircle className="h-5 w-5" />
                      Benefits & Effects
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed text-base">{analysis.benefits}</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-600 text-lg font-semibold">
                      <AlertTriangle className="h-5 w-5" />
                      Safety & Usage Limits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed text-base">{analysis.safety_usage_limit}</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600 text-lg font-semibold">
                      <AlertTriangle className="h-5 w-5" />
                      Potential Side Effects
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed text-base">{analysis.side_effects}</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600 text-lg font-semibold">
                      <CheckCircle className="h-5 w-5" />
                      Suitable Skin Types
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed text-base">{analysis.suitable_skin_types}</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-600 text-lg font-semibold">
                      <Info className="h-5 w-5" />
                      How to Use
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed text-base">{analysis.how_to_use}</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600 text-lg font-semibold">
                      <Info className="h-5 w-5" />
                      How It Works
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed text-base">{analysis.mechanism_of_action}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          {/* No Results State */}
          {!analysis && !isLoading && (
            <Card className="text-center py-16 border-0 shadow-xl bg-white">
              <CardContent>
                <Search className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-600 mb-4">Enter an ingredient to analyze</h3>
                <p className="text-lg text-gray-500">Get detailed information about any skincare ingredient including benefits, usage guidelines, and safety information.</p>
              </CardContent>
            </Card>
          )}
        </div>
        {/* Sidebar: Common Ingredients */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-xl bg-white sticky top-8">
            <CardHeader>
              <CardTitle className="text-xl font-bold mb-2">Popular Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {commonIngredients.map((name) => (
                  <Button
                    key={name}
                    variant={ingredient === name ? 'default' : 'outline'}
                    className={`w-full text-left px-4 py-2 font-medium text-base ${ingredient === name ? 'bg-blue-100 text-blue-700' : ''}`}
                    onClick={() => handleSelectCommon(name)}
                  >
                    {name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IngredientChecker;