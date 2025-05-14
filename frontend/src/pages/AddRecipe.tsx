import React, { useState } from 'react';
import axios from 'axios';

const AddRecipe: React.FC = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState('');
  const [tags, setTags] = useState(['']);
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [servings, setServings] = useState<number | ''>('');
  const [message, setMessage] = useState('');

  const handleAddIngredient = () => setIngredients([...ingredients, '']);
  const handleAddTag = () => setTags([...tags, '']);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRecipe = {
      title,
      ingredients: ingredients.filter(Boolean),
      instructions,
      tags: tags.filter(Boolean),
      prepTime,
      cookTime,
      servings: Number(servings) || 0
    };

    try {
      await axios.post('http://localhost:3000/api/recipes', newRecipe);
      setMessage('✅ Recipe added successfully!');
      setTitle('');
      setIngredients(['']);
      setInstructions('');
      setTags(['']);
      setPrepTime('');
      setCookTime('');
      setServings('');
    } catch (error) {
      console.error(error);
      setMessage('❌ Error adding recipe.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl sm:text-5xl font-playfair text-[#3E2723] text-center mb-8">
        Create New Recipe
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-lg font-medium text-[#4E342E]">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full p-3 border border-[#D7CCC8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
            required
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-lg font-medium text-[#4E342E]">Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => {
                const updated = [...ingredients];
                updated[index] = e.target.value;
                setIngredients(updated);
              }}
              className="mt-2 w-full p-3 border border-[#D7CCC8] rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
              required
            />
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="text-[#8D6E63] hover:underline"
          >
            + Add Ingredient
          </button>
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-lg font-medium text-[#4E342E]">Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={4}
            className="mt-2 w-full p-3 border border-[#D7CCC8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-lg font-medium text-[#4E342E]">Tags</label>
          {tags.map((tag, index) => (
            <input
              key={index}
              type="text"
              value={tag}
              onChange={(e) => {
                const updated = [...tags];
                updated[index] = e.target.value;
                setTags(updated);
              }}
              className="mt-2 w-full p-3 border border-[#D7CCC8] rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
              required
            />
          ))}
          <button
            type="button"
            onClick={handleAddTag}
            className="text-[#8D6E63] hover:underline"
          >
            + Add Tag
          </button>
        </div>

        {/* Prep Time */}
        <div>
          <label className="block text-lg font-medium text-[#4E342E]">Preparation Time</label>
          <input
            type="text"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            className="mt-2 w-full p-3 border border-[#D7CCC8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
            placeholder="e.g. 15 mins"
          />
        </div>

        {/* Cook Time */}
        <div>
          <label className="block text-lg font-medium text-[#4E342E]">Cook Time</label>
          <input
            type="text"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            className="mt-2 w-full p-3 border border-[#D7CCC8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
            placeholder="e.g. 30 mins"
          />
        </div>

        {/* Servings */}
        <div>
          <label className="block text-lg font-medium text-[#4E342E]">Servings</label>
          <input
            type="number"
            value={servings}
            onChange={(e) => setServings(Number(e.target.value))}
            className="mt-2 w-full p-3 border border-[#D7CCC8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
            min={1}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 py-3 bg-[#8D6E63] text-white rounded-md hover:bg-[#6D4C41]"
        >
          Create Recipe
        </button>
      </form>

      {/* Message */}
      {message && (
        <div className="mt-4 text-center text-lg font-semibold text-green-600">{message}</div>
      )}
    </div>
  );
};

export default AddRecipe;
