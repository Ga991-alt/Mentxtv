// // MentorQuestionCreator.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaPlus } from "react-icons/fa";

// function normalizeQuestions(raw) {
//   return raw.map((q) => {
//     const question = (q.question || "").trim();
//     const options = (q.options || []).map((o) => (o || "").trim());
//     const ans = (q.correctAnswer || "").trim();

//     let correctIndex = null;

//     // If mentor typed a number 1-4, convert to 0-based index
//     if (/^[1-4]$/.test(ans)) {
//       const idx = parseInt(ans, 10) - 1;
//       if (options[idx]) correctIndex = idx;
//     } else if (ans) {
//       // Otherwise try to match by text (case-insensitive)
//       const lower = ans.toLowerCase();
//       const found = options.findIndex((o) => o.trim().toLowerCase() === lower);
//       if (found >= 0) correctIndex = found;
//     }

//     // Keep a resolved correct answer text for display
//     const resolvedCorrectText =
//       correctIndex != null && options[correctIndex] !== undefined
//         ? options[correctIndex]
//         : ans;

//     return {
//       question,
//       options,
//       correctIndex, // number or null
//       correctAnswer: resolvedCorrectText, // text for display
//     };
//   });
// }

// export default function MentorQuestionCreator() {
//   const [questions, setQuestions] = useState([
//     { question: "", options: ["", "", "", ""], correctAnswer: "" },
//   ]);

//   const navigate = useNavigate();

//   const handleQuestionChange = (index, value) => {
//     const updated = [...questions];
//     updated[index].question = value;
//     setQuestions(updated);
//   };

//   const handleOptionChange = (qIndex, optIndex, value) => {
//     const updated = [...questions];
//     updated[qIndex].options[optIndex] = value;
//     setQuestions(updated);
//   };

//   const handleCorrectAnswerChange = (qIndex, value) => {
//     const updated = [...questions];
//     updated[qIndex].correctAnswer = value;
//     setQuestions(updated);
//   };

//   const addQuestion = () => {
//     setQuestions((prev) => [
//       ...prev,
//       { question: "", options: ["", "", "", ""], correctAnswer: "" },
//     ]);
//   };

//   const persist = () => {
//     const normalized = normalizeQuestions(questions);
//     localStorage.setItem("mentorQuestions", JSON.stringify(normalized));
//     // Clear any old student answers so we don't read stale data
//     localStorage.removeItem("selectedAnswers");
//     return normalized;
//   };

//   const saveQuestions = () => {
//     persist();
//     alert("Questions saved locally!");
//   };

//   const uploadQuestions = () => {
//     persist();
//     navigate("/test-portal"); // route to your exam page
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-bold mb-6 text-center">
//         Mentor - Create Questions
//       </h1>

//       {questions.map((q, qIndex) => (
//         <div key={qIndex} className="bg-white p-4 rounded-lg shadow mb-6">
//           <label className="block font-semibold mb-2">
//             Question {qIndex + 1}
//           </label>
//           <input
//             type="text"
//             value={q.question}
//             onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
//             className="w-full border p-2 rounded mb-4"
//             placeholder="Enter your question"
//           />

//           <div className="grid grid-cols-1 gap-2 mb-4">
//             {q.options.map((opt, optIndex) => (
//               <input
//                 key={optIndex}
//                 type="text"
//                 value={opt}
//                 onChange={(e) =>
//                   handleOptionChange(qIndex, optIndex, e.target.value)
//                 }
//                 className="w-full border p-2 rounded"
//                 placeholder={`Option ${optIndex + 1}`}
//               />
//             ))}
//           </div>

//           <label className="block font-semibold mb-2">Correct Answer</label>
//           <input
//             type="text"
//             value={q.correctAnswer}
//             onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
//             className="w-full border p-2 rounded"
//             placeholder="Enter 1-4 OR exact option text"
//           />
//         </div>
//       ))}

//       <button
//         onClick={addQuestion}
//         className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded mb-6"
//       >
//         <FaPlus /> Add Question
//       </button>

//       <div className="flex gap-4">
//         <button
//           onClick={saveQuestions}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Save
//         </button>
//         <button
//           onClick={uploadQuestions}
//           className="bg-purple-500 text-white px-4 py-2 rounded"
//         >
//           Upload & Go to Exam
//         </button>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useUser } from "@/contexts/UserContext";

const categories = [
  { label: "All", value: "All" },
  { label: "JEE Main", value: "JEE Main" },
  { label: "JEE Advanced", value: "JEE Advanced" },
  { label: "NEET", value: "NEET" },
  { label: "BITSAT", value: "BITSAT" },
  { label: "VITEEE", value: "VITEEE" },
  { label: "COMEDK", value: "COMEDK" },
  { label: "KCET", value: "KCET" },
  { label: "MHT CET", value: "MHT CET" },
  { label: "WBJEE", value: "WBJEE" },
];


function normalizeQuestions(raw) {
  return raw.map((q) => {
    const question = (q.question || "").trim();
    const options = (q.options || []).map((o) => (o || "").trim());
    let correctIndex = q.correctIndex ?? null;

    return {
      question,
      options,
      correctIndex,
      correctAnswer:
        correctIndex != null && options[correctIndex] !== undefined
          ? options[correctIndex]
          : "",
    };
  });
}

export default function MentorQuestionCreator() {
  const { user } = useUser(); 
  const mentorId = user?.id;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("All");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctIndex: null },
  ]);

  const navigate = useNavigate();

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleCorrectToggle = (qIndex, optIndex) => {
    const updated = [...questions];
    updated[qIndex].correctIndex = optIndex;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { question: "", options: ["", "", "", ""], correctIndex: null },
    ]);
  };

  const deleteQuestion = (index) => {
    if (questions.length === 1) {
      alert("You must have at least one question.");
      return;
    }
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const persist = () => {
    const normalized = normalizeQuestions(questions);
    localStorage.setItem(
      "mentorQuestions",
      JSON.stringify({ title, category, questions: normalized })
    );
    localStorage.removeItem("selectedAnswers");
    return normalized;
  };

  const saveQuestions = () => {
    persist();
    alert("Test saved locally!");
  };

  const uploadQuestions = async () => {
    const normalized = persist();

    if (!mentorId) {
      alert("Mentor ID not found. Please login again.");
      return;
    }

    const payload = {
      title,
      category,
      questions: normalized.map((q) => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
      })),
      mentorId,
    };

    console.log("Uploading payload:", payload);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/tests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload test");
      }

      const data = await response.json();
      alert("Test uploaded successfully!");
      navigate("/test-portal");
    } catch (error) {
      console.error(error);
      alert("Error uploading test: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6 flex justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-700">
          Mentor - Create Test
        </h1>

        {/* Title + Category */}
        <div className="bg-white p-5 rounded-xl shadow mb-6 hover:shadow-lg transition">
          <label className="block font-semibold mx-3 my-2 text-gray-700 text-sm ">
            Test Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-[95%] border-b border-gray-300 p-3 m-3 focus:ring-0 outline-none focus:bg-gray-50 focus:shadow-inner focus:rounded-md"
            placeholder="Enter test title"
          />

          <label className="block font-semibold mb-2 text-gray-700 mx-3 my-2 mt-4 text-sm">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-[95%] border-b border-gray-300 p-3 m-3 focus:ring-0 outline-none focus:bg-gray-50 focus:shadow-inner focus:rounded-md"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Questions */}
        {questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className="group relative bg-white p-5 rounded-xl shadow mb-8 border border-gray-200 hover:shadow-lg transition"
          >
            {/* Trash button */}
            <button
              onClick={() => deleteQuestion(qIndex)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>

            <label className="block font-semibold mb-2 text-gray-700">
              Question {qIndex + 1}
            </label>
            <textarea
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              className="w-full border-b border-gray-300 p-3 my-5 focus:ring-0 outline-none focus:bg-gray-50 focus:shadow-inner focus:rounded-md"
              placeholder="Enter your question"
            />

            <div className="flex flex-col gap-3 mb-4">
              {q.options.map((opt, optIndex) => {
                const isCorrect = q.correctIndex === optIndex;
                return (
                  <div
                    key={optIndex}
                    className={`w-[95%] flex items-center gap-2 p-2 rounded-lg border transition ${
                      isCorrect
                        ? "bg-green-100/50 border-green-400"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) =>
                        handleOptionChange(qIndex, optIndex, e.target.value)
                      }
                      className="flex-1 border-none outline-none bg-transparent text-sm"
                      placeholder={`Option ${optIndex + 1}`}
                    />

                    <input
                      type="checkbox"
                      checked={isCorrect}
                      onChange={() => handleCorrectToggle(qIndex, optIndex)}
                      className="h-5 w-5 text-green-600"
                    />
                  </div>
                );
              })}
            </div>

            {/* Add Question Button */}
            {qIndex === questions.length - 1 && (
              <button
                onClick={addQuestion}
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-white text-indigo-600 px-4 py-2 rounded-full shadow transition flex items-center gap-2 hover:scale-105"
              >
                <FaPlus className="h-3" />
                <span className="text-sm">Add Question</span>
              </button>
            )}
          </div>
        ))}

        {/* Actions */}
        <div className="flex gap-4 justify-center mt-10">
          <button
            onClick={saveQuestions}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow transition"
          >
            Save
          </button>
          <button
            onClick={uploadQuestions}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium shadow transition"
          >
            Upload & Go to Exam
          </button>
        </div>
      </div>
    </div>
  );
}
