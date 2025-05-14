import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Home, Book } from 'lucide-react';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className="font-playfair text-xl font-bold text-brand">RecipeCraft</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/recipes">
              <Button variant="ghost" size="sm" className="flex items-center">
                <Book className="h-4 w-4 mr-2" />
                Recipes
              </Button>
            </Link>
            <Link to="/add">
              <Button size="sm" className="flex items-center bg-brand hover:bg-brand-light text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Recipe
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
