import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-[#FF5722]" />
              <span className="font-medium text-lg">Culina</span>
            </div>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link to="/recipes" className="text-gray-700 hover:text-gray-900">
              Recipes
            </Link>
            <Link to="/ai" className="text-gray-700 hover:text-gray-900">
              Chefs/AI
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-gray-900">
              Login
            </Link>
            <Link 
              to="/create" 
              className="bg-[#FF5722] text-white px-4 py-2 rounded-full hover:bg-[#F4511E] transition-colors"
            >
              Create Recipe
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;