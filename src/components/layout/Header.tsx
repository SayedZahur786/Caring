import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X, User, LogOut } from 'lucide-react';
import Button from '../common/Button';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      console.log('Header: Starting logout process...');
      await signOut();
      console.log('Header: Logout successful, navigating to home...');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Header: Logout error:', error);
      // Even if there's an error, navigate to home
      navigate('/', { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}
        ${location.pathname !== '/' ? 'bg-white shadow-md' : ''}
      `}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center"
          >
            <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              CARE CANVAS
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/"
              className={`text-sm font-medium transition-colors
                ${location.pathname === '/' 
                  ? 'text-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
                }
              `}
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              Home
            </Link>
            <Link 
              to="#"
              className={`text-sm font-medium transition-colors`}
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname === '/') {
                  const el = document.getElementById('features');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#features';
                }
              }}
            >
              Features
            </Link>
            <Link 
              to="#"
              className={`text-sm font-medium transition-colors`}
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname === '/') {
                  const el = document.getElementById('faq');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#faq';
                }
              }}
            >
              FAQ
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button 
                    variant="ghost"
                    leftIcon={<User className="h-4 w-4" />}
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  isLoading={isLoggingOut}
                  leftIcon={!isLoggingOut ? <LogOut className="h-4 w-4" /> : undefined}
                >
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/auth/login">
                  <Button variant="ghost">Log In</Button>
                </Link>
                <Link to="/auth/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fadeIn">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/"
                className={`text-base font-medium px-4 py-2 rounded-md
                  ${location.pathname === '/' 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                Home
              </Link>
              <Link 
                to="#"
                className={`text-base font-medium px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50`}
                onClick={(e) => {
                  e.preventDefault();
                  if (location.pathname === '/') {
                    const el = document.getElementById('features');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#features';
                  }
                }}
              >
                Features
              </Link>
              <Link 
                to="#"
                className={`text-base font-medium px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50`}
                onClick={(e) => {
                  e.preventDefault();
                  if (location.pathname === '/') {
                    const el = document.getElementById('faq');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#faq';
                  }
                }}
              >
                FAQ
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/dashboard"
                    className="text-base font-medium px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="text-base font-medium px-4 py-2 rounded-md text-left text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/auth/login"
                    className="text-base font-medium px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/auth/signup"
                    className="text-base font-medium px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;