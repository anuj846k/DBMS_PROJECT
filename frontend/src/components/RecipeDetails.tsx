import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../services/recipeServices'
import { Recipe } from '../types/Recipe';
import ReviewSection from './ReviewSection';
import { Comment } from '../types/Comment';

const RecipeDetails: React.FC = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const fetchedRecipe = await getRecipeById(id as string);
      setRecipe(fetchedRecipe);
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, idx) => (
          <li key={idx}>{ingredient}</li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <ul>
        {recipe.instructions.map((instruction, idx) => (
          <li key={idx}>{instruction}</li>
        ))}
      </ul>

      <ReviewSection recipeId={recipe._id} reviews={recipe.reviews || []} />
    </div>
  );
};

export default RecipeDetails;
