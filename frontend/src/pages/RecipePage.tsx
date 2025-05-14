import React, { useEffect, useState } from "react";
import axios from "axios";
import { Recipe } from "../types/Recipe";
import { Button } from "../components/ui/button";

const RecipePage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    <div className="max-w-4xl mx-auto py-8 bg-white">
      <h1 className="text-4xl sm:text-5xl font-playfair text-[#3E2723] text-center mb-6">
        All Recipes
      </h1>

      {error && <div className="text-[#D32F2F] text-center mb-4">{error}</div>}

      {recipes.length > 0 ? (
        <div className="space-y-6">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="border p-6 rounded-lg shadow-lg bg-[#F5F5F5] border-[#D7CCC8]"
            >
              <h2 className="text-2xl font-playfair font-semibold text-[#3E2723] mb-2">
                {recipe.title}
              </h2>
              <p className="text-[#4E342E] mb-4">{recipe.description}</p>

              <a
                href={`/recipe/${recipe._id}`}
                className="inline-block bg-[#8D6E63] text-white py-2 px-4 rounded-md hover:bg-[#6D4C41] font-playfair"
              >
                View Recipe
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-[#4E342E]">No recipes available.</p>
      )}
    </div>
  );
};

export default RecipePage;
