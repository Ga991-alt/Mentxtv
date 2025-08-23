import React, { useEffect, useState } from "react";

export default function ExamResult() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [unanswered, setUnanswered] = useState(0);

  const norm = (v) =>
    String(v ?? "")
      .trim()
      .toLowerCase();

  useEffect(() => {
    const storedQuestions =
      JSON.parse(localStorage.getItem("mentorQuestions")) || [];
    const storedAnswers =
      JSON.parse(localStorage.getItem("selectedAnswers")) || [];

    setQuestions(storedQuestions);
    setSelectedAnswers(storedAnswers);

    let c = 0,
      w = 0,
      u = 0;

    storedQuestions.forEach((q, i) => {
      const correctText = norm(q.correctAnswer);
      const selRaw = storedAnswers[i];
      let selectedText = "";
      if (typeof selRaw === "number") {
        selectedText = norm(q.options?.[selRaw]);
      } else {
        selectedText = norm(selRaw);
      }

      if (!selectedText) {
        u++;
      } else if (selectedText === correctText) {
        c++;
      } else {
        w++;
      }
    });

    setCorrect(c);
    setWrong(w);
    setUnanswered(u);

    // ✅ Save result for mentor view
    const submission = {
      name: localStorage.getItem("studentName") || "Unknown Student",
      email: localStorage.getItem("studentEmail") || "unknown@example.com",
      examName: localStorage.getItem("examName") || "Untitled Exam",
      examDate: new Date().toLocaleDateString(),
      examTime: new Date().toLocaleTimeString(),
      timeTaken: localStorage.getItem("timeTaken") || "N/A",
      correct: c,
      wrong: w,
    };

    const previousSubmissions =
      JSON.parse(localStorage.getItem("studentSubmissions")) || [];
    previousSubmissions.push(submission);
    localStorage.setItem(
      "studentSubmissions",
      JSON.stringify(previousSubmissions)
    );
  }, []);

  const percentage =
    questions.length > 0 ? (correct / questions.length) * 100 : 0;
  const percentageLabel = `${percentage.toFixed(2)}%`;

  const getEmoji = () => {
    if (percentage >= 80) return "🎉 Excellent!";
    if (percentage >= 50) return "😊 Good Job!";
    return "😢 Needs Improvement";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">Exam Result</h1>
      <p className="text-xl mb-4">{getEmoji()}</p>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center mb-8">
        <div className="bg-green-100 text-green-800 rounded-lg p-4 shadow-md">
          <p className="text-lg font-semibold">{correct}</p>
          <p className="text-sm">Correct</p>
        </div>
        <div className="bg-red-100 text-red-800 rounded-lg p-4 shadow-md">
          <p className="text-lg font-semibold">{wrong}</p>
          <p className="text-sm">Wrong</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 rounded-lg p-4 shadow-md">
          <p className="text-lg font-semibold">{unanswered}</p>
          <p className="text-sm">Unanswered</p>
        </div>
        <div className="bg-blue-100 text-blue-800 rounded-lg p-4 shadow-md">
          <p className="text-lg font-semibold">{questions.length}</p>
          <p className="text-sm">Total</p>
        </div>
        <div className="bg-purple-100 text-purple-800 rounded-lg p-4 shadow-md">
          <p className="text-lg font-semibold">{percentageLabel}</p>
          <p className="text-sm">Percentage</p>
        </div>
      </div>

      {questions.map((q, i) => {
        const correctText = norm(q.correctAnswer);
        const selRaw = selectedAnswers[i];
        const selectedText =
          typeof selRaw === "number"
            ? q.options?.[selRaw] ?? ""
            : String(selRaw ?? "");

        const isUnanswered = !norm(selectedText);
        const isCorrect = !isUnanswered && norm(selectedText) === correctText;

        return (
          <div key={i} className="bg-white p-4 rounded shadow mb-4">
            <h2 className="font-semibold">{q.question}</h2>
            <p>Your Answer: {selectedText || "Unanswered"}</p>
            <p>Correct Answer: {q.correctAnswer}</p>
            <p className="font-bold">
              Result:{" "}
              {isUnanswered
                ? "⚠️ Unanswered"
                : isCorrect
                ? "✅ Correct"
                : "❌ Wrong"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
