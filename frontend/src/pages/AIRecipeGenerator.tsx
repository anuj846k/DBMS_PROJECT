import React, { useState } from 'react';
import axios from 'axios';
import { Recipe } from '../types/Recipe';

const AIRecipeGenerator: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddIngredient = () => {
    if (inputValue.trim()) {
      setIngredients([...ingredients, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3000/api/ai/generate-recipe', {
        ingredients
      });
      setGeneratedRecipe(response.data);
    } catch (error) {
      setError('Failed to generate recipe. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 ">
          <div className="w-12 h-12 bg-[#FF5722] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">AI Recipe Generator</h1>
          <p className="text-gray-600">
            List your ingredients and let Gemini AI create a recipe for you
          </p>
        </div>

        {/* Ingredient Input */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add Your Ingredients</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddIngredient()}
              placeholder="Enter an ingredient (e.g., chicken, tomatoes, basil)"
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent"
            />
            <button
              onClick={handleAddIngredient}
              className="px-4 py-2 bg-[#FF5722] text-white rounded-lg hover:bg-[#F4511E] transition-colors"
            >
              Add
            </button>
          </div>

          {/* Ingredients List */}
          <div className="flex flex-wrap gap-2 mb-6">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="px-3 py-1 bg-[#FFF0EC] text-[#FF5722] rounded-full flex items-center gap-2"
              >
                <span>{ingredient}</span>
                <button
                  onClick={() => handleRemoveIngredient(index)}
                  className="text-[#FF5722] hover:text-[#F4511E]"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleGenerateRecipe}
            disabled={loading || ingredients.length === 0}
            className="w-full py-3 bg-[#FF5722] text-white rounded-lg hover:bg-[#F4511E] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating Recipe...' : 'Generate Recipe'}
          </button>

          {error && (
            <p className="mt-4 text-red-500 text-center">{error}</p>
          )}
        </div>

        {/* Generated Recipe */}
        {generatedRecipe && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-2">{generatedRecipe.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                </svg>
                {generatedRecipe.cookingTime}
              </span>
              <span className="px-2 py-1 bg-gray-100 rounded-full">
                {generatedRecipe.category}
              </span>
            </div>

            <p className="text-gray-600 mb-6">{generatedRecipe.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Ingredients</h3>
              <ul className="list-disc list-inside space-y-1">
                {generatedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-600">{ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Instructions</h3>
              <ol className="list-decimal list-inside space-y-2">
                {generatedRecipe.instructions.map((instruction, index) => (
                  <li key={index} className="text-gray-600">{instruction}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecipeGenerator; 