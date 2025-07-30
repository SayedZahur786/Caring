import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                Care Canvas
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Your personalized skincare companion. Achieve your best skin with science-backed recommendations.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-primary-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@carecanvas.app"
                className="text-gray-500 hover:text-primary-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Features
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/dashboard/progress" className="text-sm text-gray-600 hover:text-primary-600">
                  Progress Tracking
                </Link>
              </li>
              <li>
                <Link to="/dashboard/analysis" className="text-sm text-gray-600 hover:text-primary-600">
                  Facial Analysis
                </Link>
              </li>
              <li>
                <Link to="/dashboard/ingredients" className="text-sm text-gray-600 hover:text-primary-600">
                  Ingredient Checker
                </Link>
              </li>
              <li>
                <Link to="/dashboard/routine" className="text-sm text-gray-600 hover:text-primary-600">
                  Skincare Routine
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-primary-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-600 hover:text-primary-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-600 hover:text-primary-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-primary-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-primary-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-primary-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-sm text-gray-600 hover:text-primary-600">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Care Canvas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;