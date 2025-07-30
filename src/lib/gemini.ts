
import { GoogleGenerativeAI } from '@google/generative-ai';

const LLM_API_KEY = import.meta.env.VITE_LLM_API_KEY;

if (!LLM_API_KEY) {
  throw new Error('LLM API key is required. Please set VITE_LLM_API_KEY in your .env file.');
}

const genAI = new GoogleGenerativeAI(LLM_API_KEY);

export const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export interface AssessmentAnswers {
  skin_feel_day: string;
  pore_size_nose: string;
  skin_feel_cleansing: string;
  breakout_frequency: string;
  reaction_new_products: string;
  cheek_bounce_test: string;
  skin_texture: string;
  sun_exposure: string;
  daily_water_intake: string;
  sleep_pattern: string;
  work_hours: string;
  current_skincare_steps: string;
  comfortable_routine_length: string;
  food_preference: string;
  meal_type: string;
  known_allergies: string;
  side_effects_ingredients: string;
}

export interface AssessmentResult {
  skin_type: string;
  hydration_level: string;
  daily_water_intake: string;
  direct_sun_exposure: string;
  current_skincare_steps: string;
  comfortable_routine_length: string;
  known_allergies: string;
}

export async function analyzeAssessment(answers: AssessmentAnswers): Promise<AssessmentResult> {
  const prompt = `You are a certified dermatologist and skincare expert. Analyze the following skincare assessment answers and provide professional insights.

Assessment Data:
${Object.entries(answers).map(([key, value]) => `${key}: ${value}`).join('\n')}

Based on this assessment, provide a detailed analysis in JSON format with these exact fields:

{
  "skin_type": "Determine the skin type (Dry, Oily, Combination, Sensitive, Normal) based on the skin-related questions",
  "hydration_level": "Assess hydration level (Low, Moderate, Good, Excellent) based on skin feel, texture, and lifestyle factors",
  "daily_water_intake": "Extract the user's reported daily water intake from the assessment",
  "direct_sun_exposure": "Extract the user's reported sun exposure time from the assessment", 
  "current_skincare_steps": "Extract the user's current skincare routine description from the assessment",
  "comfortable_routine_length": "Extract the user's preferred routine complexity from the assessment",
  "known_allergies": "Extract any mentioned allergies or ingredient sensitivities from the assessment"
}

Provide only the JSON response, no additional text.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean the response to extract JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error analyzing assessment:', error);
    throw error;
  }
}

export async function analyzeIngredient(ingredient: string) {
  const prompt = `You are a certified dermatologist and cosmetic chemist with 15+ years of experience. Analyze the skincare ingredient "${ingredient}" comprehensively.

Provide a detailed, professional analysis in JSON format with these exact fields:

{
  "benefits": "Comprehensive list of proven benefits with scientific backing. Include specific skin improvements and research findings.",
  "safety_usage_limit": "Detailed safe usage guidelines including concentration percentages, frequency of use, and any regulatory limits. Be specific about daily/weekly limits.",
  "side_effects": "Complete list of potential side effects, contraindications, and warning signs. Include both common and rare reactions.",
  "suitable_skin_types": "Detailed breakdown of which skin types benefit most, which should use with caution, and any skin types that should avoid completely.",
  "how_to_use": "Step-by-step application instructions including timing (AM/PM), layering order with other ingredients, and best practices for maximum efficacy.",
  "mechanism_of_action": "Scientific explanation of how this ingredient works at the cellular level, including molecular pathways and biological processes.",
  "rating": 8,
  "category": "Active Ingredient/Moisturizing Agent/Exfoliant/Antioxidant/etc"
}

Rating scale: 1-10 (1=avoid, 5=neutral, 10=excellent)
Category options: Active Ingredient, Moisturizing Agent, Exfoliant, Antioxidant, Anti-aging, Acne Treatment, Brightening Agent, Soothing Agent, Preservative, Emulsifier, Other

Make each section detailed and informative (3-5 sentences minimum). Include specific percentages, timeframes, and scientific terminology where appropriate.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error analyzing ingredient:', error);
    throw error;
  }
}

export async function generateRoutine(skinType: string, skinConcerns: string[], routineComplexity: string) {
  const stepGuidelines = {
    '2-step': 'Focus on cleanser + moisturizer/SPF combo',
    '3-4-step': 'Add serum/treatment + separate SPF',
    '5+ step': 'Include toner, multiple serums, eye cream, treatments'
  };

  const prompt = `You are a board-certified dermatologist with expertise in personalized skincare. Create a detailed, professional skincare routine for:

**Patient Profile:**
- Skin Type: ${skinType}
- Primary Concerns: ${skinConcerns.join(', ')}
- Routine Complexity: ${routineComplexity} (${stepGuidelines[routineComplexity]})

**Requirements:**
${stepGuidelines[routineComplexity]}

Provide a comprehensive response in JSON format:

{
  "morning_routine": [
    {
      "step": 1,
      "product_type": "Gentle Cleanser",
      "product_name": "Specific product recommendation with key ingredients",
      "instructions": "Detailed application technique with timing and pressure",
      "timing": "30-60 seconds",
      "benefits": "Specific benefits for this skin type and concerns",
      "optional": false
    }
  ],
  "evening_routine": [
    {
      "step": 1,
      "product_type": "Double Cleanse - Oil Cleanser",
      "product_name": "Specific recommendation with active ingredients",
      "instructions": "Detailed step-by-step application method",
      "timing": "1-2 minutes",
      "benefits": "Targeted benefits for skin concerns",
      "optional": false
    }
  ],
  "general_tips": "Professional advice on routine implementation, timing, and lifestyle factors that affect skin health",
  "frequency_notes": "Detailed schedule for active ingredients, including how to introduce new products safely",
  "weekly_schedule": "Day-by-day breakdown of when to use specific products or treatments",
  "product_recommendations": "Specific ingredient recommendations and product types to look for, including concentration guidelines"
}

**CRITICAL REQUIREMENTS - READ CAREFULLY:**
1. ALL text fields (general_tips, frequency_notes, weekly_schedule, product_recommendations) MUST be single string values, NOT objects or arrays
2. weekly_schedule should be one continuous string like "Monday: Full routine, Tuesday: Gentle cleansing only, Wednesday: Add active ingredient..."
3. product_recommendations should be one continuous string listing ingredients and products
4. NEVER format these as objects with day keys or product keys
5. For 2-step: Focus on cleanser + moisturizer/SPF combo
6. For 3-4-step: Add serum/treatment + separate SPF  
7. For 5+ step: Include toner, multiple serums, eye cream, treatments
8. Always include SPF in morning routine
9. Provide specific ingredient percentages where relevant
10. Address each listed skin concern specifically`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }
    
    const routineData = JSON.parse(jsonMatch[0]);
    
    // Safety function to convert objects to strings if needed
    const ensureString = (field: any): string => {
      if (typeof field === 'string') return field;
      if (typeof field === 'object' && field !== null) {
        // Convert object to readable string format
        return Object.entries(field)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ');
      }
      return String(field || '');
    };

    // Ensure all text fields are strings
    if (routineData.general_tips) {
      routineData.general_tips = ensureString(routineData.general_tips);
    }
    if (routineData.frequency_notes) {
      routineData.frequency_notes = ensureString(routineData.frequency_notes);
    }
    if (routineData.weekly_schedule) {
      routineData.weekly_schedule = ensureString(routineData.weekly_schedule);
    }
    if (routineData.product_recommendations) {
      routineData.product_recommendations = ensureString(routineData.product_recommendations);
    }
    
    return routineData;
  } catch (error) {
    console.error('Error generating routine:', error);
    throw error;
  }
}