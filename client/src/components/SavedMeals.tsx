import { useState } from "react";
import type { SavedMeal } from "../types";

interface SavedMealsProps {
  meals: SavedMeal[];
  onRemove: (id: string) => void;
  onBack: () => void;
}

export function SavedMeals({ meals, onRemove, onBack }: SavedMealsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Saved Meals</h2>
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
        >
          <span aria-hidden="true">&larr;</span> Back
        </button>
      </div>

      {meals.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No saved meals yet. Find a meal you love and save it!
        </p>
      ) : (
        <div className="space-y-4">
          {meals.map((meal) => {
            const isExpanded = expandedId === meal.id;

            return (
              <div
                key={meal.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {meal.name}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {meal.description}
                      </p>
                      <div className="flex gap-3 mt-2">
                        <span className="text-sm text-primary-700">
                          {meal.cookingTime}
                        </span>
                        <span className="text-sm text-primary-700">
                          {meal.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() =>
                          setExpandedId(isExpanded ? null : meal.id)
                        }
                        className="text-sm px-3 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        {isExpanded ? "Hide" : "View"}
                      </button>
                      <button
                        onClick={() => onRemove(meal.id)}
                        className="text-sm px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="font-medium text-gray-700 mb-2">
                        Ingredients
                      </h4>
                      <ul className="grid grid-cols-2 gap-1 mb-4">
                        {meal.ingredients.map((ingredient, i) => (
                          <li
                            key={i}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <span
                              className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2"
                              aria-hidden="true"
                            />
                            {ingredient}
                          </li>
                        ))}
                      </ul>

                      <h4 className="font-medium text-gray-700 mb-2">
                        Instructions
                      </h4>
                      <ol className="space-y-2 mb-4">
                        {meal.instructions.map((step, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-sm text-gray-600"
                          >
                            <span className="flex-shrink-0 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                              {i + 1}
                            </span>
                            <span className="pt-0.5">{step}</span>
                          </li>
                        ))}
                      </ol>

                      {meal.tips && (
                        <div className="bg-secondary-100 border border-secondary-300 rounded-lg p-3">
                          <p className="text-sm text-primary-700">
                            <span className="font-semibold">Pro Tip:</span>{" "}
                            {meal.tips}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
