import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (err: any) {
        setError('Failed to fetch recipe.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div className="text-center text-xl font-poppins mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 font-poppins">
      {error && <div className="text-red-600 text-center mb-6">{error}</div>}

      {recipe ? (
        <div className="space-y-8">
          <h1 className="text-4xl font-playfair font-bold text-center text-[#3E2723]">
            {recipe.title}
          </h1>

          {recipe.image && (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-auto rounded-xl shadow-md"
            />
          )}

          <div className="bg-[#FBE9E7] rounded-xl p-6 shadow-sm">
            <p className="text-lg text-[#4E342E] text-center">{recipe.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#FFF3E0] rounded-xl p-6 shadow-sm">
              <h3 className="text-2xl font-playfair text-[#3E2723] mb-4">Ingredients</h3>
              <ul className="list-disc pl-5 space-y-1 text-[#4E342E]">
                {recipe.ingredients.map((ingredient: string, idx: number) => (
                  <li key={idx} className="text-base">{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="bg-[#FFF3E0] rounded-xl p-6 shadow-sm">
              <h3 className="text-2xl font-playfair text-[#3E2723] mb-4">Instructions</h3>
              <p className="text-[#4E342E] leading-relaxed">
                {Array.isArray(recipe.instructions) ? recipe.instructions.join(' ') : recipe.instructions}
              </p>
            </div>
          </div>

          <div className="bg-[#EFEBE9] rounded-xl p-6 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div><strong>Prep Time:</strong><br /> {recipe.prepTime}</div>
            <div><strong>Cook Time:</strong><br /> {recipe.cookTime}</div>
            <div><strong>Servings:</strong><br /> {recipe.servings}</div>
          </div>

          <div className="text-center mt-8">
            <a
              href="/recipes"
              className="inline-block px-6 py-3 bg-[#8D6E63] hover:bg-[#6D4C41] text-white rounded-lg text-lg transition duration-300"
            >
              Back to Recipes
            </a>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No recipe details available.</p>
      )}
    </div>
  );
};

export default RecipeDetailsPage;
