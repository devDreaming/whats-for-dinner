export interface Question {
  id: string;
  title: string;
  description: string;
  type: "single" | "multiple" | "text";
  options?: string[];
}

export interface QuestionnaireAnswers {
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

export type QuestionnaireStatus = "questions" | "loading" | "result";
