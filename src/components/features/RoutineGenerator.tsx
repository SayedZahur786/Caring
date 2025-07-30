import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, Sun, Moon, Star } from 'lucide-react';
import { generateRoutine } from '@/lib/gemini';
import { toast } from 'sonner';

interface RoutineStep {
  step: number;
  product_type: string;
  product_name: string;
  instructions: string;
  timing: string;
  benefits: string;
  optional: boolean;
}

interface Routine {
  morning_routine: RoutineStep[];
  evening_routine: RoutineStep[];
  general_tips: string;
  frequency_notes: string;
  weekly_schedule: string;
  product_recommendations: string;
}

const RoutineGenerator: React.FC = () => {
  const [skinType, setSkinType] = useState('');
  const [concerns, setConcerns] = useState<string[]>([]);
  const [routineComplexity, setRoutineComplexity] = useState('');
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const skinTypes = ['Dry', 'Oily', 'Combination', 'Sensitive', 'Normal'];
  const skinConcerns = [
    'Acne', 'Dark Spots', 'Fine Lines', 'Wrinkles', 'Large Pores', 
    'Dullness', 'Redness', 'Dehydration', 'Uneven Texture', 'Sun Damage'
  ];
  const complexityOptions = [
    { value: '2-step', label: '2-Step Routine (Quick & Simple)' },
    { value: '3-4-step', label: '3-4 Step Routine (Balanced)' },
    { value: '5+ step', label: '5+ Step Routine (Comprehensive)' }
  ];

  const handleConcernChange = (concern: string, checked: boolean) => {
    if (checked) {
      setConcerns(prev => [...prev, concern]);
    } else {
      setConcerns(prev => prev.filter(c => c !== concern));
    }
  };

  const generateSkincareRoutine = async () => {
    if (!skinType || concerns.length === 0 || !routineComplexity) {
      toast.error('Please fill in all fields before generating routine');
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateRoutine(skinType, concerns, routineComplexity);
      setRoutine(result);
      toast.success('Routine generated successfully!');
    } catch (error) {
      console.error('Error generating routine:', error);
      toast.error('Failed to generate routine. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderRoutineSteps = (steps: RoutineStep[], isEvening = false) => (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <Card key={index} className={step.optional ? 'border-dashed border-gray-300' : ''}>
          <CardContent className="pt-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold text-sm">
                {step.step}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-gray-900">{step.product_type}</h4>
                  {step.optional && <Badge variant="outline">Optional</Badge>}
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {step.timing}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-primary-600 mb-2">{step.product_name}</p>
                <p className="text-sm text-gray-600 mb-2">{step.instructions}</p>
                <p className="text-xs text-gray-500">{step.benefits}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-white to-[#F3E8FF] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold font-display text-gray-900 mb-2 tracking-tight">Routine Generator</h1>
            <p className="text-lg text-gray-600">Get a personalized skincare routine based on your skin type and concerns</p>
          </div>
          <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold text-base shadow flex items-center gap-2">
            <Star className="w-5 h-5" />
            AI-Generated
          </span>
        </div>
        {/* Form Section */}
        <Card className="mb-10 border-0 shadow-xl bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <Calendar className="h-6 w-6" />
              Your Skin Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Skin Type */}
            <div>
              <Label className="text-lg font-semibold mb-3 block">Skin Type</Label>
              <Select value={skinType} onValueChange={setSkinType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your skin type" />
                </SelectTrigger>
                <SelectContent>
                  {skinTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Routine Complexity */}
            <div>
              <Label className="text-lg font-semibold mb-3 block">Routine Complexity</Label>
              <div className="flex flex-col gap-2">
                {complexityOptions.map(option => (
                  <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="routineComplexity"
                      value={option.value}
                      checked={routineComplexity === option.value}
                      onChange={() => setRoutineComplexity(option.value)}
                      className="accent-purple-600 w-4 h-4"
                    />
                    <span className="text-base font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Skin Concerns */}
            <div>
              <Label className="text-lg font-semibold mb-3 block">Skin Concerns (Select all that apply)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skinConcerns.map(concern => (
                  <div key={concern} className="flex items-center space-x-2">
                    <Checkbox
                      id={concern}
                      checked={concerns.includes(concern)}
                      onCheckedChange={(checked) => handleConcernChange(concern, checked as boolean)}
                    />
                    <Label htmlFor={concern} className="text-base">{concern}</Label>
                  </div>
                ))}
              </div>
            </div>
            <Button 
              onClick={generateSkincareRoutine} 
              disabled={isLoading}
              size="lg"
              className="w-full text-lg font-semibold bg-gradient-to-r from-[#8B5CF6] to-[#F472B6] hover:from-[#7C3AED] hover:to-[#EC4899] shadow-lg"
            >
              {isLoading ? 'Generating Routine...' : 'Generate My Routine'}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Routine */}
        {routine && (
          <div className="space-y-10">
            {/* Routine Overview */}
            <Card className="border-0 shadow-xl bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                  <Star className="h-6 w-6 text-yellow-500" />
                  Your Personalized Routine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 mb-4">
                  <Badge className="bg-purple-100 text-purple-700 text-base px-3 py-1">Skin Type: {skinType}</Badge>
                  <Badge className="bg-pink-100 text-pink-700 text-base px-3 py-1">Complexity: {routineComplexity}</Badge>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {concerns.map(concern => (
                    <Badge key={concern} variant="outline" className="text-base px-3 py-1">{concern}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Morning Routine */}
              <Card className="border-0 shadow-lg bg-[#FFF7ED]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-600 text-xl font-bold">
                    <Sun className="h-6 w-6" />
                    Morning Routine
                  </CardTitle>
                  <span className="text-sm text-gray-500 font-medium">{routine.morning_routine.length} steps</span>
                </CardHeader>
                <CardContent>
                  {renderRoutineSteps(routine.morning_routine)}
                </CardContent>
              </Card>
              {/* Evening Routine */}
              <Card className="border-0 shadow-lg bg-[#EFF6FF]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600 text-xl font-bold">
                    <Moon className="h-6 w-6" />
                    Evening Routine
                  </CardTitle>
                  <span className="text-sm text-gray-500 font-medium">{routine.evening_routine.length} steps</span>
                </CardHeader>
                <CardContent>
                  {renderRoutineSteps(routine.evening_routine, true)}
                </CardContent>
              </Card>
            </div>
            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-md bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">General Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-base">{routine.general_tips}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Frequency Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-base">{routine.frequency_notes}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Weekly Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-base">{routine.weekly_schedule}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Product Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-base">{routine.product_recommendations}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* No Results State */}
        {!routine && !isLoading && (
          <Card className="text-center py-12 border-0 shadow-lg bg-white">
            <CardContent>
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready to create your routine?</h3>
              <p className="text-gray-500">
                Fill out the form above to get a personalized skincare routine tailored to your specific needs.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RoutineGenerator;