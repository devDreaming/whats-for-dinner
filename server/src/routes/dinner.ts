import { Router, Request, Response } from "express";
import { getRecommendation, DinnerRequest } from "../services/claude.js";

const router = Router();

router.post("/recommend", async (req: Request, res: Response) => {
  try {
    const dinnerRequest: DinnerRequest = {
      dietaryRestrictions: req.body.dietaryRestrictions || [],
      cuisinePreference: req.body.cuisinePreference || "Surprise me",
      cookingTime: req.body.cookingTime || "30 minutes",
      availableIngredients: req.body.availableIngredients || "",
      mood: req.body.mood || "Something delicious",
    };

    const recommendation = await getRecommendation(dinnerRequest);
    res.json(recommendation);
  } catch (error) {
    console.error("Error getting recommendation:", error);
    res.status(500).json({
      error: "Failed to get meal recommendation",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
