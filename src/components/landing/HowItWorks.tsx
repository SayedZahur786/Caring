import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-skin-rose to-primary-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Get started in just 3 simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Sign Up & Set Profile</h3>
            <p className="text-gray-600">
              Create your account and tell us about your skin type, concerns, and goals.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Upload & Analyze</h3>
            <p className="text-gray-600">
              Take a photo for AI analysis and get your personalized skincare routine.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Track Progress</h3>
            <p className="text-gray-600">
              Monitor your skin improvements and adjust your routine as needed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;