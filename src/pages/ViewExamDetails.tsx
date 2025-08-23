import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExamDetails = () => {
  const navigate = useNavigate();

  // Sample data — replace with API call
  const exams = [
    {
      id: 1,
      name: "JEE Main Practice Test 1",
      date: "2025-07-05",
      time: "10:00 AM",
      status: "completed",
      studentsAttempted: 15,
    },
    {
      id: 2,
      name: "Physics Chapter 5 Test",
      date: "2025-07-08",
      time: "2:00 PM",
      status: "pending",
      studentsAttempted: 8,
    },
    {
      id: 3,
      name: "Mathematics Mock Test",
      date: "2025-07-10",
      time: "9:00 AM",
      status: "completed",
      studentsAttempted: 20,
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">All Exams</h2>
      <div className="space-y-4">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="flex justify-between items-center border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <div>
              <h3 className="text-lg font-semibold">{exam.name}</h3>
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <FaCalendarAlt className="mr-1" /> {exam.date} • {exam.time}
              </div>
              <span
                className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                  exam.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {exam.status}
              </span>
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <FaUsers className="mr-1" /> {exam.studentsAttempted} students
                attempted
              </div>
            </div>
            <Link to="/student-performance">
              <button
                onClick={() => navigate(`/exam/${exam.id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamDetails;
