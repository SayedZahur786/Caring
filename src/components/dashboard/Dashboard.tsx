import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Droplets, Sun, Layers, Shield, RefreshCw } from 'lucide-react';
import { AssessmentResult } from '@/lib/gemini';
import { supabase } from '@/integrations/supabase/client';

interface DashboardProps {
  onStartAssessment: () => void;
  assessmentResult: AssessmentResult | null;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartAssessment, assessmentResult }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!assessmentResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl text-center border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="text-3xl font-display mb-4">Welcome to Care Canvas!</CardTitle>
            <p className="text-lg text-gray-600">
              Let's start by understanding your skin better. Take our comprehensive assessment to get personalized recommendations.
            </p>
          </CardHeader>
          <CardContent>
            <Button onClick={onStartAssessment} size="lg" className="w-full sm:w-auto">
              Start Skin Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Your Skin Dashboard</h1>
          <p className="text-gray-600">Track your progress and get personalized insights</p>
        </div>

        {/* Primary Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Droplets className="h-5 w-5" />
                </div>
                Skin Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{assessmentResult.skin_type}</div>
              <p className="text-primary-100">Your primary skin type based on our analysis</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Droplets className="h-5 w-5" />
                </div>
                Hydration Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{assessmentResult.hydration_level}</div>
              <p className="text-secondary-100">Current hydration status of your skin</p>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                Daily Water Intake
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">{assessmentResult.daily_water_intake}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Sun className="h-4 w-4 text-yellow-500" />
                Sun Exposure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">{assessmentResult.direct_sun_exposure}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Layers className="h-4 w-4 text-purple-500" />
                Current Routine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">{assessmentResult.current_skincare_steps}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                Allergies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">{assessmentResult.known_allergies || 'None specified'}</div>
            </CardContent>
          </Card>
        </div>

        {/* Preferred Routine Length */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Routine Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary-100 text-primary-700">
                Preferred Steps: {assessmentResult.comfortable_routine_length}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Retake Assessment */}
        <Card>
          <CardHeader>
            <CardTitle>Update Your Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Skin changes over time. Retake the assessment to keep your recommendations current.
            </p>
            <Button onClick={onStartAssessment} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retake Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;