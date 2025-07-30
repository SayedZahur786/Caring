import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { assessmentQuestions, Question } from '@/data/assessmentQuestions';
import { analyzeAssessment, AssessmentAnswers, AssessmentResult } from '@/lib/gemini';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface SkinAssessmentProps {
  onComplete: (result: AssessmentResult) => void;
  onBack?: () => void;
}

const SkinAssessment: React.FC<SkinAssessmentProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;
  const question = assessmentQuestions[currentQuestion];

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [question.key]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const canProceed = () => {
    return answers[question.key] && answers[question.key].trim() !== '';
  };

  const submitAssessment = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to save your assessment results.",
        variant: "destructive"
      });
      return;
    }

    if (!canProceed()) {
      toast({
        title: "Incomplete answer",
        description: "Please answer the current question before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Analyze answers with Gemini
      const result = await analyzeAssessment(answers as unknown as AssessmentAnswers);
      
      // Save to Supabase with user authentication
      const { error } = await supabase
        .from('user_assessments')
        .upsert({
          user_id: user.id,
          skin_type: result.skin_type,
          hydration_level: result.hydration_level,
          daily_water_intake: result.daily_water_intake,
          direct_sun_exposure: result.direct_sun_exposure,
          current_skincare_steps: result.current_skincare_steps,
          comfortable_routine_length: result.comfortable_routine_length,
          known_allergies: result.known_allergies || 'None',
          assessment_data: answers,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Error saving assessment:', error);
        throw error;
      }

      toast({
        title: "Assessment completed!",
        description: "Your skin analysis has been saved successfully.",
      });

      onComplete(result);
    } catch (error) {
      console.error('Failed to process assessment:', error);
      toast({
        title: "Failed to process assessment",
        description: "There was an error analyzing your responses. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLastQuestion = currentQuestion === assessmentQuestions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Skin Assessment
          </h1>
          <p className="text-gray-600">
            Help us understand your skin better to provide personalized recommendations
          </p>
        </div>
        
        <Card className="border-0 shadow-lg bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-display">Skin Assessment</CardTitle>
            {onBack && (
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Question {currentQuestion + 1} of {assessmentQuestions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">{question.q}</h3>
            
            {question.opts ? (
              <div className="space-y-3">
                {question.opts.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      answers[question.key] === option
                        ? 'border-primary bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.key}
                      value={option}
                      checked={answers[question.key] === option}
                      onChange={(e) => handleAnswer(e.target.value)}
                      className="sr-only"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <Textarea
                  placeholder="Enter your answer here..."
                  value={answers[question.key] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  rows={4}
                />
                {question.note && (
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <div className="whitespace-pre-line">{question.note}</div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {isLastQuestion ? (
              <Button
                onClick={submitAssessment}
                disabled={!canProceed() || isSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting ? 'Analyzing...' : 'Complete Assessment'}
              </Button>
            ) : (
              <Button
                onClick={nextQuestion}
                disabled={!canProceed()}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SkinAssessment;