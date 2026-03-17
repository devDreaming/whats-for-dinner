import type { MealRecommendation as MealRecommendationType } from "../types";

interface MealRecommendationProps {
  meal: MealRecommendationType;
  onStartOver: () => void;
}

export function MealRecommendation({
  meal,
  onStartOver,
}: MealRecommendationProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-4xl mb-4 block" aria-hidden="true">🍽️</span>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{meal.name}</h2>
        <p className="text-gray-600">{meal.description}</p>
      </div>

      <div className="flex gap-4 justify-center mb-8">
        <div className="bg-primary-50 px-4 py-2 rounded-full" aria-label={`Cooking time: ${meal.cookingTime}`}>
          <span className="text-primary-700 font-medium">
            <span aria-hidden="true">⏱️</span> {meal.cookingTime}
          </span>
        </div>
        <div className="bg-primary-50 px-4 py-2 rounded-full" aria-label={`Difficulty: ${meal.difficulty}`}>
          <span className="text-primary-700 font-medium">
            <span aria-hidden="true">📊</span> {meal.difficulty}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Ingredients
        </h3>
        <ul className="grid grid-cols-2 gap-2">
          {meal.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-center text-gray-600">
              <span className="w-2 h-2 bg-primary-400 rounded-full mr-2" aria-hidden="true" />
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Instructions
        </h3>
        <ol className="space-y-4">
          {meal.instructions.map((instruction, index) => (
            <li key={index} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </span>
              <p className="text-gray-600 pt-1">{instruction}</p>
            </li>
          ))}
        </ol>
      </div>

      {meal.tips && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
          <p className="text-yellow-800">
            <span className="font-semibold"><span aria-hidden="true">💡</span> Pro Tip:</span> {meal.tips}
          </p>
        </div>
      )}

      <button
        onClick={onStartOver}
        className="w-full py-3 px-6 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
      >
        Find Another Meal
      </button>
    </div>
  );
}
