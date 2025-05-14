import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{ type: String }],
  instructions: { type: String },
  tags: [{ type: String }],
  prepTime: { type: String },
  cookTime: { type: String },
  servings: { type: Number },
  likes: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Recipe", recipeSchema);
