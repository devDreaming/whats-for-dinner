import Anthropic from "@anthropic-ai/sdk";

let anthropic: Anthropic | null = null;

function getClient(): Anthropic {
  if (!anthropic) {
    anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }
  return anthropic;
}

export interface DinnerRequest {
  dietaryRestrictions: string[];
  cuisinePreference: string;
  cookingTime: string;
  availableIngredients: string;
  mood: string;
}

export interface MealRecommendation {
  name: string;
  description: string;
  cookingTime: string;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  tips: string;
}

export async function getRecommendation(
  request: DinnerRequest
): Promise<MealRecommendation> {
  const prompt = `You are a helpful culinary assistant. Based on the following preferences, recommend ONE perfect dinner recipe.

User Preferences:
- Dietary Restrictions: ${request.dietaryRestrictions.length > 0 ? request.dietaryRestrictions.join(", ") : "None"}
- Cuisine Preference: ${request.cuisinePreference}
- Available Cooking Time: ${request.cookingTime}
- Ingredients on Hand: ${request.availableIngredients || "Not specified"}
- Mood/Craving: ${request.mood}

Please respond with a JSON object (no markdown, just valid JSON) in this exact format:
{
  "name": "Recipe Name",
  "description": "A brief, appetizing description of the dish (2-3 sentences)",
  "cookingTime": "Actual cooking time",
  "difficulty": "Easy/Medium/Hard",
  "ingredients": ["ingredient 1", "ingredient 2", ...],
  "instructions": ["Step 1 description", "Step 2 description", ...],
  "tips": "One helpful tip for making this dish even better"
}

Make the recipe practical, delicious, and appropriate for a home cook. If the user has listed available ingredients, try to incorporate them.`;

  const message = await getClient().messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }

  try {
    const recommendation = JSON.parse(content.text) as MealRecommendation;
    return recommendation;
  } catch {
    throw new Error("Failed to parse Claude response as JSON");
  }
}
