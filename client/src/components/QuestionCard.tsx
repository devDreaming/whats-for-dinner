import { useState } from "react";
import type { Question } from "../types";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string | string[]) => void;
  initialValue?: string | string[];
}

export function QuestionCard({
  question,
  onAnswer,
  initialValue,
}: QuestionCardProps) {
  const [textValue, setTextValue] = useState(
    typeof initialValue === "string" ? initialValue : ""
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    Array.isArray(initialValue) ? initialValue : []
  );

  const handleSingleSelect = (option: string) => {
    onAnswer(option);
  };

  const handleMultipleSelect = (option: string) => {
    const newSelected = selectedOptions.includes(option)
      ? selectedOptions.filter((o) => o !== option)
      : [...selectedOptions, option];
    setSelectedOptions(newSelected);
  };

  const handleTextSubmit = () => {
    if (textValue.trim()) {
      onAnswer(textValue.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 id="question-title" className="font-bold text-gray-800 mb-2 text-xl">{question.title}</h2>
      <p className="text-gray-500 mb-6">{question.description}</p>

      {question.type === "text" ? (
        <div className="space-y-4">
          <textarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Type your answer here..."
            aria-label={question.title}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none h-32"
          />
          <button
            onClick={handleTextSubmit}
            disabled={!textValue.trim()}
            className="w-full py-3 px-6 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      ) : (
        <div className="space-y-3" role="group" aria-labelledby="question-title">
          {question.options?.map((option) => {
            const isSelected =
              question.type === "multiple"
                ? selectedOptions.includes(option)
                : false;

            return (
              <button
                key={option}
                onClick={() =>
                  question.type === "single"
                    ? handleSingleSelect(option)
                    : handleMultipleSelect(option)
                }
                aria-pressed={question.type === "multiple" ? isSelected : undefined}
                className={`w-full py-2 px-4 text-left rounded-lg border-2 transition-all ${
                  isSelected
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-gray-200 hover:border-primary-300 hover:bg-gray-50"
                }`}
              >
                <span className="font-medium">{option}</span>
              </button>
            );
          })}

          {question.type === "multiple" && (
            <button
              onClick={() => onAnswer(selectedOptions)}
              disabled={selectedOptions.length === 0}
              className="w-full mt-4 py-2 px-4 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          )}
        </div>
      )}
    </div>
  );
}
