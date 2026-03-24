import { useQuestionnaire } from "../hooks/useQuestionnaire";
import { useSavedMeals } from "../hooks/useSavedMeals";
import { ProgressBar } from "../components/ProgressBar";
import { QuestionCard } from "../components/QuestionCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { MealRecommendation } from "../components/MealRecommendation";
import { SavedMeals } from "../components/SavedMeals";

export function Home() {
  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    status,
    recommendation,
    error,
    handleAnswer,
    goBack,
    startOver,
    begin,
    viewSavedMeals,
    canGoBack,
  } = useQuestionnaire();

  const { savedMeals, saveMeal, removeMeal, isSaved } = useSavedMeals();

  return (
    <div className={`min-h-screen ${status === "welcome" ? "bg-secondary-100 bg-diagonal-split flex items-center justify-center md:block" : "bg-secondary-100"}`}>
      <main className={`px-4 py-8 ${status === "welcome" ? "max-w-xl md:absolute md:bottom-16 md:left-[8%]" : "container mx-auto max-w-3xl"}`}>
        <header className={`mb-6 ${status === "welcome" ? "text-center md:text-left" : "text-center"}`}>
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            What's for Dinner
          </h1>
        </header>

        {status === "welcome" && (
          <div className="max-w-2xl text-center md:text-left mb-20">
            <p className="text-lg text-gray-600 mb-2 max-w-md mx-auto md:mx-0">
              Need a little inspiration? We're here to help.
            </p>
            <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto md:mx-0">
              We'll ask a few quick questions and find you the perfect meal for you.
            </p>
            <div className="flex flex-wrap md:justify-start justify-center items-center gap-3">
              <button
                onClick={begin}
                className="py-2 px-6 border-2 border-primary-500 bg-primary-500 text-white font-medium text-lg rounded-lg hover:bg-primary-600 transition-colors"
              >
                {savedMeals.length > 0 ? "New meal" : "Get cooking"}
              </button>
              {savedMeals.length > 0 && (
                <button
                  onClick={viewSavedMeals}
                  className="py-2 px-6 border-2 border-primary-500 text-primary-600 hover:bg-primary-50 font-medium text-lg rounded-lg transition-colors"
                >
                  Saved meals
                </button>
              )}
            </div>
          </div>
        )}

        {status === "questions" && (
          <>
            <ProgressBar current={currentIndex} total={totalQuestions} />

            {error && (
              <div role="alert" className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              onAnswer={handleAnswer}
            />

            <button
              onClick={canGoBack ? goBack : startOver}
              aria-label={canGoBack ? "Go back to previous question" : "Return to start"}
              className="mt-6 text-gray-500 hover:text-gray-700 flex items-center gap-2 mx-auto"
            >
              <span aria-hidden="true">←</span> {canGoBack ? "Go back" : "Back to start"}
            </button>
          </>
        )}

        {status === "loading" && <LoadingSpinner />}

        {status === "result" && recommendation && (
          <MealRecommendation
            meal={recommendation}
            onStartOver={startOver}
            onSave={() => saveMeal(recommendation)}
            isSaved={isSaved(recommendation)}
          />
        )}

        {status === "saved" && (
          <SavedMeals
            meals={savedMeals}
            onRemove={removeMeal}
            onBack={startOver}
          />
        )}
      </main>
    </div>
  );
}
