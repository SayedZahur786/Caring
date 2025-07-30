-- Create a table for user assessments
CREATE TABLE public.user_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  skin_type TEXT NOT NULL,
  hydration_level TEXT NOT NULL,
  daily_water_intake TEXT NOT NULL,
  direct_sun_exposure TEXT NOT NULL,
  current_skincare_steps TEXT NOT NULL,
  comfortable_routine_length TEXT NOT NULL,
  known_allergies TEXT,
  assessment_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_assessments ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own assessments" 
ON public.user_assessments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own assessments" 
ON public.user_assessments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assessments" 
ON public.user_assessments 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own assessments" 
ON public.user_assessments 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_assessments_updated_at
BEFORE UPDATE ON public.user_assessments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();