import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import Dashboard from '@/components/dashboard/Dashboard';
import SkinAssessment from '@/components/assessment/SkinAssessment';
import FacialAnalysis from '@/components/features/FacialAnalysis';
import IngredientChecker from '@/components/features/IngredientChecker';
import RoutineGenerator from '@/components/features/RoutineGenerator';
import { AssessmentResult } from '@/lib/gemini';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const DashboardPage: React.FC = () => {
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const checkAssessment = async () => {
      if (!user) {
        setShowAssessment(true);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('user_assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (data && !error) {
        setAssessmentResult({
          skin_type: data.skin_type,
          hydration_level: data.hydration_level,
          daily_water_intake: data.daily_water_intake,
          direct_sun_exposure: data.direct_sun_exposure,
          current_skincare_steps: data.current_skincare_steps,
          comfortable_routine_length: data.comfortable_routine_length,
          known_allergies: data.known_allergies,
        });
        setShowAssessment(false);
      } else {
        setShowAssessment(true);
      }
      setLoading(false);
    };
    checkAssessment();
  }, [user]);

  const handleAssessmentComplete = (result: AssessmentResult) => {
    setAssessmentResult(result);
    setShowAssessment(false);
  };

  const handleStartAssessment = () => {
    setShowAssessment(true);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (showAssessment) {
    return (
      <SkinAssessment 
        onComplete={handleAssessmentComplete}
        onBack={() => setShowAssessment(false)}
      />
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <header className="h-12 flex items-center border-b bg-white px-4">
            <SidebarTrigger />
          </header>
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  onStartAssessment={handleStartAssessment}
                  assessmentResult={assessmentResult}
                />
              } 
            />
            <Route 
              path="/assessment" 
              element={
                <SkinAssessment 
                  onComplete={handleAssessmentComplete}
                />
              } 
            />
            <Route path="/facial-analysis" element={<FacialAnalysis />} />
            <Route path="/ingredient-checker" element={<IngredientChecker />} />
            <Route path="/routine-generator" element={<RoutineGenerator />} />
          </Routes>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardPage;