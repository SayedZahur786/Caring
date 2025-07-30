import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Camera, 
  Search, 
  Calendar, 
  Settings, 
  User,
  ClipboardList,
  BarChart
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  
  const navItems = [
    { label: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
    { 
      label: 'Skin Assessment', 
      icon: <ClipboardList size={20} />, 
      path: '/dashboard/assessment'
    },
    { label: 'Facial Analysis', icon: <Camera size={20} />, path: '/dashboard/analysis' },
    { label: 'Progress Tracker', icon: <BarChart size={20} />, path: '/dashboard/progress' },
    { label: 'Ingredient Checker', icon: <Search size={20} />, path: '/dashboard/ingredients' },
    { label: 'Routine Generator', icon: <Calendar size={20} />, path: '/dashboard/routine' },
    { label: 'Settings', icon: <Settings size={20} />, path: '/dashboard/settings' },
  ];

  return (
    <aside className="bg-white border-r border-gray-200 w-64 h-screen fixed top-0 left-0 overflow-y-auto shadow-sm flex flex-col">
      <div className="py-8 px-6">
        <div className="flex items-center justify-center mb-10">
          <span className="text-3xl font-extrabold font-display bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] bg-clip-text text-transparent tracking-tight">
            CARE CANVAS
          </span>
        </div>
        {/* User profile */}
        <div className="flex items-center px-4 py-3 mb-8 bg-gradient-to-r from-[#E0F7FA] to-[#F3E8FF] rounded-lg border border-[#A7F3D0]">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#6EE7B7] flex items-center justify-center">
              <User size={22} className="text-white" />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-base font-semibold text-gray-900">{user?.email?.split('@')[0] || 'User'}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
          </div>
        </div>
        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item, idx) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-colors font-medium text-gray-700 hover:bg-[#F3E8FF] hover:text-[#3B82F6] ${
                  isActive ? 'bg-[#E0F7FA] text-[#3B82F6] font-bold shadow' : ''
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
              {item.label === 'Skin Assessment' && (
                <span className="ml-auto text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-semibold">Start Here</span>
              )}
            </NavLink>
          ))}
        </nav>
        {/* Bottom gradient decoration */}
        <div className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-100">
          <div className="text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mb-2 flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <p className="text-xs text-gray-600 font-medium">Personalized Experience</p>
            <p className="text-xs text-gray-500">Tailored for your skin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;