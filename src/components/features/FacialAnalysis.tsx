import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera } from 'lucide-react';

const FacialAnalysis: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Facial Analysis</h1>
          <p className="text-gray-600">AI-powered skin analysis from your photos</p>
        </div>

        <Card className="text-center py-12 border-0 shadow-lg bg-white">
          <CardHeader>
            <div className="mx-auto w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Camera className="h-12 w-12 text-primary-600" />
            </div>
            <CardTitle className="text-2xl font-display">Feature Under Development</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Our facial analysis feature is coming soon! Soon you'll be able to upload photos and get 
              instant AI-powered analysis of your skin concerns.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacialAnalysis;