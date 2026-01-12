import { useQuestionnaire } from "../hooks/useQuestionnaire";
import { ProgressBar } from "../components/ProgressBar";
import { QuestionCard } from "../components/QuestionCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { MealRecommendation } from "../components/MealRecommendation";

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
    canGoBack,
  } = useQuestionnaire();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            What's for Dinner?
          </h1>
          <p className="text-gray-500">
            Let AI help you decide what to cook tonight
          </p>
        </header>

        {status === "questions" && (
          <>
            <ProgressBar current={currentIndex} total={totalQuestions} />

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              onAnswer={handleAnswer}
            />

            {canGoBack && (
              <button
                onClick={goBack}
                className="mt-6 text-gray-500 hover:text-gray-700 flex items-center gap-2 mx-auto"
              >
                <span>←</span> Go back
              </button>
            )}
          </>
        )}

        {status === "loading" && <LoadingSpinner />}

        {status === "result" && recommendation && (
          <MealRecommendation meal={recommendation} onStartOver={startOver} />
        )}
      </div>
    </div>
  );
}
