import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ChefHat, Plus, BookOpen } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-charcoal px-4">
      <div className="text-center max-w-2xl">
        <div className="flex justify-center mb-6">
          <ChefHat className="w-16 h-16 text-brand" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold font-playfair mb-4">
          Welcome to <span className="text-brand">RecipeCraft</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover, share, and craft your favorite recipes in one beautiful place. Whether you're a home cook or a seasoned chef, RecipeCraft is your kitchen companion.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/recipes">
            <Button variant="default" size="lg" className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              View Recipes
            </Button>
          </Link>
          <Link to="/add">
            <Button size="lg" className="flex items-center gap-2 bg-brand hover:bg-brand-light text-white">
              <Plus className="w-5 h-5" />
              Add New Recipe
            </Button>
          </Link>
        </div>
      </div>

      <footer className="mt-16 text-sm text-gray-500">
        © {new Date().getFullYear()} RecipeCraft. Built with love and flavor.
      </footer>
    </div>
  );
};

export default Home;
