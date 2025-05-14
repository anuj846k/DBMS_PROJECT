import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../types/Recipe';

interface Props {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p>{recipe.tags.join(', ')}</p>
      <Link to={`/recipes/${recipe._id}`} className="btn">View Details</Link>
    </div>
  );
};

export default RecipeCard;
