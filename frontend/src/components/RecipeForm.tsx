import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';


interface Props {
  onSubmit: (recipe: { title: string; description: string; ingredients: string[]; instructions: string[] }) => void;
  initialData?: { title: string; description: string; ingredients: string[]; instructions: string[] };
}

const RecipeForm: React.FC<Props> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [ingredients, setIngredients] = useState(initialData?.ingredients || ['']);
  const [instructions, setInstructions] = useState(initialData?.instructions || ['']);

  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const handleInstructionChange = (index: number, value: string) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setInstructions(updatedInstructions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, ingredients, instructions });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div>
        <Label>Description</Label>
        <Input value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>

      <div>
        <Label>Ingredients</Label>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <Input
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              required
            />
          </div>
        ))}
        <Button type="button" onClick={() => setIngredients([...ingredients, ''])}>Add Ingredient</Button>
      </div>

      <div>
        <Label>Instructions</Label>
        {instructions.map((instruction, index) => (
          <div key={index}>
            <Input
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              required
            />
          </div>
        ))}
        <Button type="button" onClick={() => setInstructions([...instructions, ''])}>Add Instruction</Button>
      </div>

      <Button type="submit">Submit Recipe</Button>
    </form>
  );
};

export default RecipeForm;
