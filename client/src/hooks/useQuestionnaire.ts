import { useState, useCallback } from "react";
import type {
  Question,
  QuestionnaireAnswers,
  MealRecommendation,
  QuestionnaireStatus,
} from "../types";
import { getRecommendation } from "../api/dinner";

const questions: Question[] = [
  {
    id: "dietaryRestrictions",
    title: "Any dietary restrictions?",
    description:
      "Select all that apply, or choose 'None' if you have no restrictions.",
    type: "multiple",
    options: [
      "None",
      "Vegetarian",
      "Vegan",
      "Gluten-free",
      "Dairy-free",
      "Nut-free",
      "Low-carb",
    ],
  },
  {
    id: "cuisinePreference",
    title: "What cuisine are you in the mood for?",
    description: "Pick one that sounds appealing right now.",
    type: "single",
    options: [
      "Italian",
      "Asian",
      "Mexican",
      "American",
      "Mediterranean",
      "Indian",
      "Surprise me!",
    ],
  },
  {
    id: "cookingTime",
    title: "How much time do you have to cook?",
    description: "Be realistic - we want this to be achievable!",
    type: "single",
    options: ["15 minutes", "30 minutes", "45 minutes", "1 hour or more"],
  },
  {
    id: "availableIngredients",
    title: "What ingredients do you have on hand?",
    description:
      "List the main ingredients in your fridge or pantry. This helps us suggest something practical.",
    type: "text",
  },
  {
    id: "mood",
    title: "What's your dinner mood tonight?",
    description: "How are you feeling about dinner?",
    type: "single",
    options: [
      "Comfort food",
      "Light & healthy",
      "Something new & exciting",
      "Quick & easy",
      "Impressive (cooking for others)",
    ],
  },
];

const initialAnswers: QuestionnaireAnswers = {
  dietaryRestrictions: [],
  cuisinePreference: "",
  cookingTime: "",
  availableIngredients: "",
  mood: "",
};

export function useQuestionnaire() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswers>(initialAnswers);
  const [status, setStatus] = useState<QuestionnaireStatus>("welcome");
  const [recommendation, setRecommendation] =
    useState<MealRecommendation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleAnswer = useCallback(
    async (answer: string | string[]) => {
      const questionId = currentQuestion.id as keyof QuestionnaireAnswers;

      const newAnswers = {
        ...answers,
        [questionId]: answer,
      };
      setAnswers(newAnswers);

      if (isLastQuestion) {
        setStatus("loading");
        setError(null);

        try {
          const result = await getRecommendation(newAnswers);
          setRecommendation(result);
          setStatus("result");
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to get recommendation"
          );
          setStatus("questions");
        }
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    },
    [currentQuestion, answers, isLastQuestion]
  );

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const begin = useCallback(() => {
    setStatus("questions");
  }, []);

  const viewSavedMeals = useCallback(() => {
    setStatus("saved");
  }, []);

  const startOver = useCallback(() => {
    setCurrentIndex(0);
    setAnswers(initialAnswers);
    setStatus("welcome");
    setRecommendation(null);
    setError(null);
  }, []);

  return {
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    status,
    recommendation,
    error,
    handleAnswer,
    goBack,
    startOver,
    begin,
    viewSavedMeals,
    canGoBack: currentIndex > 0,
  };
}
