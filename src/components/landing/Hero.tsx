import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Camera, BarChart, Search, Sparkles, Calendar } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-skin-light pt-20 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-transparent to-secondary-50 opacity-70"></div>
      <div className="relative container mx-auto px-4 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
            <div className="text-center lg:text-left ">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight">
                Personalized Skincare <br />
                <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                  Made Simple
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                Achieve your best skin with personalized routines, ingredient analysis, and progress tracking — all in one place.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/dashboard">
                  <Button variant="hero" size="lg">
                    Get Started
                  </Button>
                </Link>
                <Link to="/#features">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -top-8 -left-8 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-8">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-soft flex flex-col items-center">
            <Camera className="h-8 w-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-gray-800 text-center">Facial Analysis</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-soft flex flex-col items-center">
            <BarChart className="h-8 w-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-gray-800 text-center">Progress Tracking</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-soft flex flex-col items-center">
            <Search className="h-8 w-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-gray-800 text-center">Ingredient Checker</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-soft flex flex-col items-center">
            <Calendar className="h-8 w-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-gray-800 text-center">Skincare Routine</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-soft flex flex-col items-center">
            <Sparkles className="h-8 w-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-gray-800 text-center">Quick Fixes</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Hero;