import express from "express";
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  likeRecipe,
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", getRecipeById);
router.post("/", createRecipe);

router.put("/:id/like", likeRecipe);

export default router;
