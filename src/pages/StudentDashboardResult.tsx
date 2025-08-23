import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentResult() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("studentSubmissions")) || [];
    setSubmissions(stored);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
      >
        Back
      </button>

      <h1 className="text-2xl font-bold mb-6">Student Exam Results</h1>

      {submissions.length === 0 ? (
        <p className="text-gray-600">No student data available.</p>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3 border">Student Name</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Exam Name</th>
                  <th className="p-3 border">Exam Date</th>
                  <th className="p-3 border">Exam Time</th>
                  <th className="p-3 border">Time Taken</th>
                  <th className="p-3 border">Correct</th>
                  <th className="p-3 border">Wrong</th>
                  <th className="p-3 border">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((student, index) => {
                  const totalQuestions =
                    (student.correct || 0) + (student.wrong || 0);
                  const percentage =
                    totalQuestions > 0
                      ? ((student.correct / totalQuestions) * 100).toFixed(2)
                      : 0;

                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="p-3 border">{student.name}</td>
                      <td className="p-3 border">{student.email}</td>
                      <td className="p-3 border">{student.examName}</td>
                      <td className="p-3 border">{student.examDate}</td>
                      <td className="p-3 border">{student.examTime}</td>
                      <td className="p-3 border">{student.timeTaken}</td>
                      <td className="p-3 border">{student.correct}</td>
                      <td className="p-3 border">{student.wrong}</td>
                      <td className="p-3 border">{percentage}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
