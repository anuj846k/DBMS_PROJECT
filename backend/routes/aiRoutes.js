import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// Initialize Gemini AI
if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is not set in environment variables");
}
const genAI = new GoogleGenerativeAI("AIzaSyCQhNtnn1EnBz9cDVHTJVpBgLBKl2aiyQ0");

router.post("/generate-recipe", async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (
      !ingredients ||
      !Array.isArray(ingredients) ||
      ingredients.length === 0
    ) {
      return res
        .status(400)
        .json({ error: "Invalid ingredients array provided" });
    }

    // Format ingredients for prompt
    const ingredientsList = ingredients.join(", ");
    console.log("Generating recipe for ingredients:", ingredientsList);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Create a detailed recipe using these ingredients: ${ingredientsList}.
    Format the response as a JSON object with the following structure:
    {
      "title": "Recipe name",
      "description": "Brief description",
      "cookingTime": "Total time in minutes",
      "category": "One of: Breakfast, Lunch, Dinner, Dessert, Snack",
      "ingredients": ["List of ingredients with quantities"],
      "instructions": ["Step by step instructions"]
    }
    Important: Return ONLY the JSON object, no markdown formatting or code blocks.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    try {
      // Clean the response text by removing markdown code block markers if present
      text = text.replace(/```json|```/g, "").trim();

      // Parse the JSON response
      const recipe = JSON.parse(text);
      res.json(recipe);
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", text);
      console.error("Parse error:", parseError);
      res.status(500).json({
        error: "Failed to parse recipe response",
        details: parseError.message,
        rawResponse: text,
      });
    }
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.status(500).json({
      error: "Failed to generate recipe",
      details: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

export default router;
