// // ExamPage.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ExamPage() {
//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

//   const navigate = useNavigate();

//   useEffect(() => {
//     const stored = localStorage.getItem("mentorQuestions");
//     if (stored) {
//       const parsed = JSON.parse(stored);
//       setQuestions(parsed);
//       // initialize student selections: nulls
//       const init = new Array(parsed.length).fill(null);
//       setSelectedAnswers(init);
//       localStorage.setItem("selectedAnswers", JSON.stringify(init));
//     }
//   }, []);

//   // countdown
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmit();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [questions]);

//   const handleOptionSelect = (optionIndex) => {
//     const updated = [...selectedAnswers];
//     updated[currentIndex] = optionIndex; // store INDEX
//     setSelectedAnswers(updated);
//     // keep localStorage in sync so Result page can read it
//     localStorage.setItem("selectedAnswers", JSON.stringify(updated));
//   };

//   const handleSubmit = () => {
//     // ✅ Save selected answers
//     localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));

//     // ✅ Calculate time taken
//     const timeTakenInSeconds = 300 - timeLeft;
//     const minutes = Math.floor(timeTakenInSeconds / 60);
//     const seconds = timeTakenInSeconds % 60;
//     const formattedTime = `${minutes}m ${seconds}s`;

//     localStorage.setItem("timeTaken", formattedTime);

//     // Navigate to result page
//     navigate("/result");
//   };

//   if (questions.length === 0) {
//     return (
//       <p className="p-6 text-center">
//         No questions found. Please create them first.
//       </p>
//     );
//   }

//   const currentQ = questions[currentIndex];

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-white p-4 shadow-md">
//         <h2 className="font-bold mb-4">Questions</h2>
//         <div className="grid grid-cols-4 gap-2">
//           {questions.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentIndex(i)}
//               className={`p-2 rounded ${
//                 selectedAnswers[i] !== null ? "bg-green-300" : "bg-red-300"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//         <div className="mt-6 font-semibold">
//           Time Left: {Math.floor(timeLeft / 60)}:
//           {String(timeLeft % 60).padStart(2, "0")}
//         </div>
//         <button
//           onClick={handleSubmit}
//           className="mt-6 w-full bg-blue-500 text-white py-2 rounded"
//         >
//           Submit
//         </button>
//       </div>

//       {/* Main Question Area */}
//       <div className="flex-1 p-6">
//         <h1 className="text-xl font-bold mb-4">{currentQ.question}</h1>
//         <div className="space-y-4">
//           {currentQ.options.map((opt, idx) => (
//             <div
//               key={idx}
//               onClick={() => handleOptionSelect(idx)}
//               className={`p-3 border rounded cursor-pointer ${
//                 selectedAnswers[currentIndex] === idx ? "bg-blue-200" : ""
//               }`}
//             >
//               {opt}
//             </div>
//           ))}
//         </div>
//         <div className="flex gap-4 mt-6">
//           <button
//             disabled={currentIndex === 0}
//             onClick={() => setCurrentIndex((prev) => prev - 1)}
//             className="bg-gray-400 text-white px-4 py-2 rounded"
//           >
//             Prev
//           </button>
//           <button
//             disabled={currentIndex === questions.length - 1}
//             onClick={() => setCurrentIndex((prev) => prev + 1)}
//             className="bg-gray-400 text-white px-4 py-2 rounded"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// ExamPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
export default function ExamPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  if(!user || user.role !== 'Student') {
    return <div><p className="p-6 text-center text-red-500">Access Denied. Students only.</p>;
    <button onClick={() => navigate('/login')} className="mt-6 w-full bg-blue-500 text-white py-2 rounded">Go to Login</button></div>
  }
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
   // 5 minutes

  
  const location = useLocation();
  const { test } = location.state || {}; // ✅ Get test from navigate state
const [timeLeft, setTimeLeft] = useState(test.questions.length * 60); // time based on number of questions
  useEffect(() => {
    if (test && test.questions) {
      setQuestions(test.questions);
      const init = new Array(test.questions.length).fill(null);
      setSelectedAnswers(init);
      localStorage.setItem("selectedAnswers", JSON.stringify(init)); // keep in sync for result page
    }
  }, [test]);

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
    localStorage.setItem("selectedAnswers", JSON.stringify(updated));
  };

  const handleSubmit = async () => {
  // Calculate time taken
  const timeTakenInSeconds = 300 - timeLeft;
  const minutes = Math.floor(timeTakenInSeconds / 60);
  const seconds = timeTakenInSeconds % 60;
  const formattedTime = `${minutes}m ${seconds}s`;

  // Calculate correct/wrong answers
  const norm = (v) => String(v ?? "").trim().toLowerCase();
  let correct = 0,
      wrong = 0;

  test.questions.forEach((q, i) => {
    const correctText = norm(q.correctAnswer);
    const selRaw = selectedAnswers[i];
    const selectedText =
      typeof selRaw === "number" ? norm(q.options?.[selRaw]) : norm(selRaw);
    
    if (selectedText && selectedText === correctText) correct++;
    else if (selectedText) wrong++;
  });

  // Prepare result payload
  const payload = {
    studentId: user.id, // your logged-in student's ID
    testId: test._id,
    examDate: new Date(),
    timeTaken: formattedTime,
    correct,
    wrong,
    percentage: ((correct / test.questions.length) * 100).toFixed(2),
  };

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tests/add-result`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit result");
    }

    // ✅ Navigate to result page with state
    navigate("/result", {
      state: { test, selectedAnswers, timeTaken: formattedTime },
    });
  } catch (error) {
    console.error(error);
    alert("Error submitting result: " + error.message);
  }
};


  if (!test || questions.length === 0) {
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

