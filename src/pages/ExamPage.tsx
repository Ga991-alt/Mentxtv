// ExamPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ExamPage() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("mentorQuestions");
    if (stored) {
      const parsed = JSON.parse(stored);
      setQuestions(parsed);
      // initialize student selections: nulls
      const init = new Array(parsed.length).fill(null);
      setSelectedAnswers(init);
      localStorage.setItem("selectedAnswers", JSON.stringify(init));
    }
  }, []);

  // countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [questions]);

  const handleOptionSelect = (optionIndex) => {
    const updated = [...selectedAnswers];
    updated[currentIndex] = optionIndex; // store INDEX
    setSelectedAnswers(updated);
    // keep localStorage in sync so Result page can read it
    localStorage.setItem("selectedAnswers", JSON.stringify(updated));
  };

  const handleSubmit = () => {
    // ✅ Save selected answers
    localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));

    // ✅ Calculate time taken
    const timeTakenInSeconds = 300 - timeLeft;
    const minutes = Math.floor(timeTakenInSeconds / 60);
    const seconds = timeTakenInSeconds % 60;
    const formattedTime = `${minutes}m ${seconds}s`;

    localStorage.setItem("timeTaken", formattedTime);

    // Navigate to result page
    navigate("/result");
  };

  if (questions.length === 0) {
    return (
      <p className="p-6 text-center">
        No questions found. Please create them first.
      </p>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 shadow-md">
        <h2 className="font-bold mb-4">Questions</h2>
        <div className="grid grid-cols-4 gap-2">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`p-2 rounded ${
                selectedAnswers[i] !== null ? "bg-green-300" : "bg-red-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="mt-6 font-semibold">
          Time Left: {Math.floor(timeLeft / 60)}:
          {String(timeLeft % 60).padStart(2, "0")}
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded"
        >
          Submit
        </button>
      </div>

      {/* Main Question Area */}
      <div className="flex-1 p-6">
        <h1 className="text-xl font-bold mb-4">{currentQ.question}</h1>
        <div className="space-y-4">
          {currentQ.options.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => handleOptionSelect(idx)}
              className={`p-3 border rounded cursor-pointer ${
                selectedAnswers[currentIndex] === idx ? "bg-blue-200" : ""
              }`}
            >
              {opt}
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-6">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Prev
          </button>
          <button
            disabled={currentIndex === questions.length - 1}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
