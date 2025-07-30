import { useEffect, useState } from "react"
import Card from "../common/Card"
import Button from "../common/Button"
import { TrendingUp, Camera, Search, Zap, ArrowRight, CheckCircle, AlertCircle, Sparkles, ClipboardList, Droplets, Sun, Shield, Heart, RefreshCw } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface SkinAssessment {
  skin_type: string;
  hydration_level: string;
  assessment_answers: {
    skin_answers: string[];
    lifestyle_answers: Record<string, string>;
  };
  created_at: string;
  updated_at?: string;
}

interface UserProfile {
  daily_water_intake: string;
  sun_exposure: string;
  current_skincare_steps: string;
  comfortable_routine_length: string;
  known_allergies: string;
  side_effects_ingredients: string;
  skin_type: string;
  hydration_level: string;
}

export default function DashboardHome() {
  const { user } = useAuth();
  const [assessment, setAssessment] = useState<SkinAssessment | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [skinInsights, setSkinInsights] = useState<string>("");
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);

  useEffect(() => {
    if (user) {
      loadAssessmentData();
      loadUserProfile();
    }
  }, [user]);

  const loadAssessmentData = async () => {
    try {
      const { data, error } = await supabase
        .from('user_assessments')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data && !error) {
        // Transform the data to match our interface
        const transformedAssessment: SkinAssessment = {
          skin_type: data.skin_type,
          hydration_level: data.hydration_level,
          assessment_answers: {
            skin_answers: [],
            lifestyle_answers: {}
          },
          created_at: data.created_at,
          updated_at: data.updated_at
        };
        setAssessment(transformedAssessment);
        setHasCompletedAssessment(true);
        generateInsights(transformedAssessment);
      } else {
        setHasCompletedAssessment(false);
      }
    } catch (error) {
      console.error('Error loading assessment:', error);
      setHasCompletedAssessment(false);
    }
  };

  const loadUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('user_assessments')
        .select('daily_water_intake, current_skincare_steps, comfortable_routine_length, known_allergies, skin_type, hydration_level')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (data && !error) {
        // Transform the data to match our interface
        const transformedProfile: UserProfile = {
          daily_water_intake: data.daily_water_intake || 'Not specified',
          sun_exposure: 'Not specified', // This field doesn't exist in user_assessments
          current_skincare_steps: data.current_skincare_steps || 'Not specified',
          comfortable_routine_length: data.comfortable_routine_length || 'Not specified',
          known_allergies: data.known_allergies || '',
          side_effects_ingredients: '', // This field doesn't exist in user_assessments
          skin_type: data.skin_type || 'Unknown',
          hydration_level: data.hydration_level || 'Unknown'
        };
        setUserProfile(transformedProfile);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const generateInsights = async (assessmentData: SkinAssessment) => {
    setIsLoadingInsights(true);
    try {
      // Simulate insight generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSkinInsights("Based on your assessment, we've identified your skin type and can provide personalized recommendations. Explore the features to get detailed analysis and routines tailored for you.");
    } catch (error) {
      console.error('Error generating insights:', error);
      setSkinInsights("Based on your assessment, we've identified your skin type and can provide personalized recommendations. Explore the features to get detailed analysis and routines tailored for you.");
    } finally {
      setIsLoadingInsights(false);
    }
  };

  // If assessment not completed, show assessment prompt
  if (!hasCompletedAssessment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-white to-[#F3E8FF] p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Welcome to CARE CANVAS!</h1>
            <p className="text-lg text-gray-600 mt-2">Let's start by understanding your skin better</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full inline-flex items-center text-base font-semibold shadow">
              <ClipboardList className="w-5 h-5 mr-2" />
              Assessment Needed
            </span>
          </div>
        </div>

        {/* Assessment Prompt */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-[#E0F7FA] to-[#F3E8FF]">
            <div className="p-10 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-[#3B82F6] to-[#6EE7B7] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <ClipboardList className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Complete Your Skin Assessment</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">To provide you with personalized skincare recommendations, we need to understand your skin type, concerns, and lifestyle. This assessment takes just 5-10 minutes and will unlock all our features.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-xl font-bold">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Skin Analysis</h3>
                  <p className="text-base text-gray-600">Answer questions about your skin type and concerns</p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-xl font-bold">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Lifestyle Factors</h3>
                  <p className="text-base text-gray-600">Tell us about your daily routine and habits</p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-xl font-bold">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Get Results</h3>
                  <p className="text-base text-gray-600">Receive personalized recommendations and routines</p>
                </div>
              </div>
              <Link to="/dashboard/assessment">
                <Button size="lg" className="bg-gradient-to-r from-[#3B82F6] to-[#6EE7B7] hover:from-[#2563EB] hover:to-[#059669] shadow-xl text-lg font-semibold">
                  <ClipboardList className="w-6 h-6 mr-2" />
                  Start Skin Assessment
                </Button>
              </Link>
              <p className="text-base text-gray-500 mt-6">⏱️ Takes 5-10 minutes • 🔒 Your data is secure and private</p>
            </div>
          </Card>
        </div>

        {/* Feature Preview */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">What you'll unlock after assessment:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Camera, title: "Facial Analysis", desc: "AI-powered skin analysis", color: "from-blue-400 to-blue-600" },
              { icon: Search, title: "Ingredient Checker", desc: "Verify product safety", color: "from-green-400 to-green-600" },
              { icon: Sparkles, title: "Custom Routines", desc: "Personalized skincare plans", color: "from-purple-400 to-purple-600" },
              { icon: TrendingUp, title: "Progress Tracking", desc: "Monitor improvements", color: "from-orange-400 to-orange-600" }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg opacity-80 hover:opacity-100 transition-opacity duration-200">
                <div className="p-6 text-center">
                  <div className={`w-10 h-10 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show full dashboard if assessment is completed
  const quickStats = [
    {
      title: "Skin Type",
      value: userProfile?.skin_type || assessment?.skin_type || "Unknown",
      change: "From assessment",
      icon: CheckCircle,
      color: "text-blue-600",
      bgColor: "bg-gradient-to-r from-blue-50 to-blue-100"
    },
    {
      title: "Hydration Level",
      value: userProfile?.hydration_level || assessment?.hydration_level || "Unknown",
      change: "Current status",
      icon: Droplets,
      color: "text-blue-600",
      bgColor: "bg-gradient-to-r from-blue-50 to-blue-100"
    },
    {
      title: "Daily Water Intake",
      value: userProfile?.daily_water_intake || "Not specified",
      change: "Lifestyle factor",
      icon: Droplets,
      color: "text-cyan-600",
      bgColor: "bg-gradient-to-r from-cyan-50 to-cyan-100"
    },
    {
      title: "Sun Exposure",
      value: userProfile?.sun_exposure || "Not specified",
      change: "Daily routine",
      icon: Sun,
      color: "text-orange-600",
      bgColor: "bg-gradient-to-r from-orange-50 to-orange-100"
    },
    {
      title: "Skincare Steps",
      value: userProfile?.current_skincare_steps || "Not specified",
      change: "Current routine",
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-gradient-to-r from-pink-50 to-pink-100"
    },
    {
      title: "Preferred Routine",
      value: userProfile?.comfortable_routine_length || "Not specified",
      change: "Comfort level",
      icon: Sparkles,
      color: "text-purple-600",
      bgColor: "bg-gradient-to-r from-purple-50 to-purple-100"
    },
    // Only show allergies if they exist and are not empty
    ...(userProfile?.known_allergies && userProfile.known_allergies.trim() !== '' ? [{
      title: "Known Allergies",
      value: userProfile.known_allergies.length > 30 ? 
        userProfile.known_allergies.substring(0, 30) + "..." : 
        userProfile.known_allergies,
      change: "Safety info",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-gradient-to-r from-red-50 to-red-100"
    }] : [])
  ]

  const handleRetakeAssessment = () => {
    if (window.confirm("Are you sure you want to retake your skin assessment? This will update your current results.")) {
      window.location.href = "/dashboard/assessment";
    }
  }

  const quickActions = [
    {
      title: "Take Progress Photo",
      description: "Upload a new photo to track your progress",
      icon: Camera,
      href: "/dashboard/progress",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Analyze Your Skin",
      description: "Get AI-powered analysis of your current skin condition",
      icon: Search,
      href: "/dashboard/analysis",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Check Ingredients",
      description: "Verify if your products are suitable for your skin",
      icon: Search,
      href: "/dashboard/ingredients",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Generate Routine",
      description: "Get a personalized skincare routine for your skin type",
      icon: Sparkles,
      href: "/dashboard/routine",
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-gray-600 mt-1">Here's your personalized skincare overview</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 hover:from-green-200 hover:to-green-300 px-3 py-1 rounded-full inline-flex items-center text-sm font-medium shadow-sm transition-all duration-200">
            <CheckCircle className="w-4 h-4 mr-1" />
            Assessment Complete
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-sm font-bold text-gray-900 mb-1 break-words">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
                <div className={`p-2 rounded-lg ${stat.bgColor} ml-2 flex-shrink-0 shadow-sm`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skin Insights */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg mr-3 shadow-md">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">Your Skin Insights</span>
              </div>
              <div className="text-gray-600 mb-4">Personalized analysis based on your assessment</div>
              
              {isLoadingInsights ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  <span className="ml-2 text-gray-600">Generating insights...</span>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line bg-white p-4 rounded-lg shadow-sm">
                    {skinInsights || "Based on your assessment, we've identified your skin type and can provide personalized recommendations. Explore the features to get detailed analysis and routines tailored for you."}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg mr-3 shadow-md">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">Quick Actions</span>
              </div>
              <div className="text-gray-600 mb-4">Common tasks to maintain your skincare routine</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link key={index} to={action.href}>
                    <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer group hover:shadow-md">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-r ${action.color} text-white group-hover:scale-110 transition-transform shadow-sm`}
                        >
                          <action.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700">{action.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Skin Profile Summary */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mr-3 shadow-md">
                  <ClipboardList className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">Assessment Summary</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Assessment Date:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {assessment ? new Date(assessment.created_at).toLocaleDateString() : 'Not completed'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className="text-sm font-medium text-green-600">Complete</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Updated:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {assessment ? new Date(assessment.updated_at || assessment.created_at).toLocaleDateString() : 'Not completed'}
                  </span>
                </div>
              </div>
              
              <Link to="/dashboard/routine">
                <Button variant="outline" size="sm" className="w-full mt-4 border-blue-300 text-blue-700 hover:bg-blue-50">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Personalized Routine
                </Button>
              </Link>
            </div>
          </Card>

          {/* Tips & Recommendations */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-50 to-blue-50">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg mr-3 shadow-md">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">Today's Tip</span>
              </div>
              <div className="p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border border-teal-200">
                <h4 className="font-medium text-sm text-gray-900 mb-2">💡 Personalized Care</h4>
                <p className="text-sm text-gray-600">
                  {(userProfile?.skin_type || assessment?.skin_type) === 'Dry' && "Your dry skin needs extra hydration. Consider using a humidifier and drinking more water."}
                  {(userProfile?.skin_type || assessment?.skin_type) === 'Oily' && "For oily skin, use gentle cleansers and avoid over-washing which can increase oil production."}
                  {(userProfile?.skin_type || assessment?.skin_type) === 'Combination' && "Focus on different products for different areas - lighter on T-zone, richer on cheeks."}
                  {(userProfile?.skin_type || assessment?.skin_type)?.includes('Sensitive') && "Patch test new products and stick to fragrance-free, gentle formulations."}
                  {(userProfile?.skin_type || assessment?.skin_type) === 'Normal' && "Maintain your skin's balance with consistent, gentle care and sun protection."}
                  {!userProfile?.skin_type && !assessment?.skin_type && "Complete your skin assessment to get personalized tips and recommendations."}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Retake Assessment Button */}
      <div className="mt-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-200 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Want to Update Your Assessment?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Retake your skin assessment to update your profile and get fresh recommendations.
            </p>
            <Button 
              onClick={handleRetakeAssessment}
              variant="outline"
              className="w-full border-primary-300 hover:bg-primary-50 text-primary-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retake Assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}