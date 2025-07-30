import React from 'react';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Faq from '../components/landing/Faq';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HowItWorks from '../components/landing/HowItWorks';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <Features />
        <Faq />
        
        <section className="py-12 bg-gradient-primary">
          <div className="container mx-auto px-4 text-center flex flex-col justify-center h-[80vh]">
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Ready to Transform Your Skincare Routine?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-6">
              Join thousands of users who have discovered their best skin with our personalized approach
            </p>
            <Link to="/auth">
              <Button 
                variant="secondary"
                size="lg" 
                className="bg-white text-primary-600 hover:bg-gray-100"
              >
                Get Started For Free
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;