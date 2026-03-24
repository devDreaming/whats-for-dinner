import { useState, useCallback } from "react";
import type { MealRecommendation, SavedMeal } from "../types";

const STORAGE_KEY = "whats-for-dinner-saved-meals";

function loadMeals(): SavedMeal[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function persistMeals(meals: SavedMeal[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(meals));
}

export function useSavedMeals() {
  const [savedMeals, setSavedMeals] = useState<SavedMeal[]>(loadMeals);

  const saveMeal = useCallback((meal: MealRecommendation) => {
    setSavedMeals((prev) => {
      const newMeal: SavedMeal = {
        ...meal,
        id: crypto.randomUUID(),
        savedAt: new Date().toISOString(),
      };
      const updated = [newMeal, ...prev];
      persistMeals(updated);
      return updated;
    });
  }, []);

  const removeMeal = useCallback((id: string) => {
    setSavedMeals((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      persistMeals(updated);
      return updated;
    });
  }, []);

  const isSaved = useCallback(
    (meal: MealRecommendation) => {
      return savedMeals.some((m) => m.name === meal.name);
    },
    [savedMeals]
  );

  return { savedMeals, saveMeal, removeMeal, isSaved };
}
