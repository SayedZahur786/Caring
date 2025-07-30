import React from 'react';
import { Camera, BarChart, Search, Calendar } from 'lucide-react';

const features = [
  {
    id: 1,
    title: 'Facial Analysis',
    description: 'Upload a selfie and get instant analysis of your skin concerns including acne, dryness, spots, and more.',
    icon: <Camera className="h-12 w-12 text-primary-600" />,
    imageUrl: 'https://images.pexels.com/photos/3373716/pexels-photo-3373716.jpeg',
  },
  {
    id: 2,
    title: 'Progress Tracking',
    description: 'Monitor your skin improvement over time with side-by-side photo comparisons and data visualization.',
    icon: <BarChart className="h-12 w-12 text-primary-600" />,
    imageUrl: 'https://images.pexels.com/photos/4049672/pexels-photo-4049672.jpeg',
  },
  {
    id: 3,
    title: 'Ingredient Checker',
    description: 'Scan or enter ingredients to instantly know if they are good for your skin type and concerns.',
    icon: <Search className="h-12 w-12 text-primary-600" />,
    imageUrl: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg',
  },
  {
    id: 4,
    title: 'Routine Generator',
    description: 'Get a personalized AM/PM skincare routine based on your skin type, concerns, and goals.',
    icon: <Calendar className="h-12 w-12 text-primary-600" />,
    imageUrl: 'https://images.pexels.com/photos/3762876/pexels-photo-3762876.jpeg',
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900">
            Powerful Features for Your Skincare Journey
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to achieve your best skin, all in one place
          </p>
        </div>
        
        <div className="space-y-24">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary-50 rounded-lg">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <li 
                      key={item} 
                      className="flex items-start"
                    >
                      <svg 
                        className="h-5 w-5 text-success mr-2 mt-0.5" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-700">
                        {feature.title === 'Facial Analysis' && item === 1 && 'Detect multiple skin concerns at once'}
                        {feature.title === 'Facial Analysis' && item === 2 && 'Get severity scores for each issue'}
                        {feature.title === 'Facial Analysis' && item === 3 && 'Receive personalized recommendations'}
                        
                        {feature.title === 'Progress Tracking' && item === 1 && 'Compare photos from different time periods'}
                        {feature.title === 'Progress Tracking' && item === 2 && 'Track changes in skin condition over time'}
                        {feature.title === 'Progress Tracking' && item === 3 && 'Visualize improvements with graphs'}
                        
                        {feature.title === 'Ingredient Checker' && item === 1 && 'Identify potentially harmful ingredients'}
                        {feature.title === 'Ingredient Checker' && item === 2 && 'Learn about ingredient functions'}
                        {feature.title === 'Ingredient Checker' && item === 3 && 'Find safer alternatives'}
                        
                        {feature.title === 'Routine Generator' && item === 1 && 'Get step-by-step morning and evening routines'}
                        {feature.title === 'Routine Generator' && item === 2 && 'Customize product recommendations'}
                        {feature.title === 'Routine Generator' && item === 3 && 'Update as your skin changes'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="relative max-w-md mx-auto">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl transform -rotate-2 opacity-70"></div>
                  <img
                    src={feature.imageUrl}
                    alt={feature.title}
                    className="relative rounded-xl shadow-lg w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;