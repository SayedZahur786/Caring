import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import { useAuth } from '@/hooks/useAuth';

const AuthPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-20 bg-gradient-to-br from-primary-50 via-transparent to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="hidden md:block relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-secondary-500 opacity-90"></div>
                  <img
                    className="absolute inset-0 h-full w-full object-cover mix-blend-overlay"
                    src="https://images.pexels.com/photos/3373716/pexels-photo-3373716.jpeg"
                    alt="Skincare"
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-white text-center">
                      <h2 className="text-2xl font-display font-bold mb-4">
                        {type === 'login' 
                          ? 'Welcome Back to CARE CANVAS' 
                          : 'Start Your Skincare Journey'}
                      </h2>
                      <p className="text-white/80">
                        {type === 'login'
                          ? 'Log in to continue your personalized skincare journey'
                          : 'Create an account to unlock personalized skincare recommendations'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 md:p-12">
                  {type === 'login' ? <LoginForm /> : <SignupForm />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;