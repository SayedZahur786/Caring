import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'How does facial analysis work?',
    answer: 'Our system uses AI models to detect skin concerns like acne, dryness, redness, or pigmentation based on your uploaded images. It analyzes the visual data to identify patterns associated with different skin conditions and provides recommendations based on the analysis results.'
  },
  {
    question: 'Is my data and photos safe?',
    answer: 'Yes. We take your privacy very seriously. Your data is stored securely with encryption, and we never share your personal information with third parties. You can delete your data and photos at any time from your account settings.'
  },
  {
    question: 'Can I use this for sensitive skin?',
    answer: 'Absolutely. Our routine suggestions consider allergies and skin types, including sensitive skin. When you set up your profile, you can indicate sensitive skin or specific allergies, and our recommendations will be adjusted accordingly.'
  },
  {
    question: 'How do I track my skincare progress?',
    answer: 'Simply upload images regularly through the Progress Tracker feature. The app will organize your photos chronologically and allow you to see side-by-side comparisons. We also generate graphs showing how your skin concerns have changed over time.'
  },
  {
    question: 'Can I use my existing skincare products?',
    answer: 'Yes, you can input the ingredients of your current products into our Ingredient Checker to verify if they are suitable for your skin type and concerns. Our system will flag any potentially problematic ingredients and suggest alternatives if needed.'
  },
  {
    question: 'How often should I update my skincare routine?',
    answer: 'Skin needs change with seasons, age, and environment. We recommend reassessing your routine every 3-4 months, or whenever you notice significant changes in your skin. You can update your profile anytime to generate a new routine.'
  },
  {
    question: 'Does the app recommend specific brands?',
    answer: 'Our app focuses on ingredients and product types rather than specific brands. We provide recommendations based on what your skin needs, and you can choose products from any brand that contains the suggested ingredients.'
  }
];

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about our skincare app
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="py-6">
              <button
                className="flex justify-between items-center w-full text-left focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                <span className="ml-6 flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-primary-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="mt-4 pr-12 animate-fadeIn">
                  <p className="text-base text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;