import type { QuestionnaireAnswers, MealRecommendation } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "";

export async function getRecommendation(
  answers: QuestionnaireAnswers
): Promise<MealRecommendation> {
  const response = await fetch(`${API_URL}/api/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(answers),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to get recommendation");
  }

  return response.json();
}
