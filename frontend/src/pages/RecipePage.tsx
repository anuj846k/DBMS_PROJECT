import React, { useEffect, useState } from "react";
import axios from "axios";
import { Recipe } from "../types/Recipe";
import { Link } from "react-router-dom";

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Vegetarian", "Vegan"];

const RecipePage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/recipes");
        setRecipes(response.data);
      } catch (error) {
        setError("Failed to fetch recipes.");
        console.error("Failed to fetch recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-start space-x-6">
          <img 
            src="/chef.png" 
            alt="Chef" 
            className="w-24 h-24 object-contain"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">Explore Recipes</h1>
            <p className="text-gray-600 max-w-xl">
              Discover delicious recipes shared by our community. Find your next culinary inspiration!
            </p>
          </div>
        </div>
        <Link 
          to="/create"
          className="bg-[#FF5722] text-white px-6 py-3 rounded-full hover:bg-[#F4511E] transition-colors"
        >
          + Create New Recipe
        </Link>
      </div>

      {/* Category Filters */}
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeCategory === category
                ? "bg-[#FF5722] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={recipe.image || "https://via.placeholder.com/400x300"}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 mb-2">
                  {recipe.category || "Breakfast"}
                </div>
                <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {recipe.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    {recipe.cookingTime || "30 mins"}
                  </div>
                  <Link
                    to={`/recipe/${recipe._id}`}
                    className="text-[#FF5722] hover:text-[#F4511E] font-medium"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No recipes available.</p>
        )}
      </div>
    </div>
  );
};

export default RecipePage;
