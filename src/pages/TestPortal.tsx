import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BookOpen, FileText, Award, Target, CheckCircle } from "lucide-react";

const TestPortal = () => {
  const [selectedExam, setSelectedExam] = useState("JEE Main");
  const navigate = useNavigate(); // ✅ Initialize navigate

  const exams = [
    "JEE Main",
    "JEE Advanced",
    "NEET",
    "BITSAT",
    "VITEEE",
    "COMEDK",
    "KCET",
    "MHT CET",
    "WBJEE",
  ];

  const testData = {
    "JEE Main": {
      icon: <Target className="w-6 h-6" />,
      badge: "NEW",
      title: "JEE Main 2025",
      description: "15 Full-Length Test • Based on the Latest Pattern",
      tests: [
        {
          name: "Mock Test",
          count: "15 Tests",
          description: "Full-length mock tests",
        },
        {
          name: "Sample Paper",
          count: "20 Papers",
          description: "Previous year patterns",
        },
        {
          name: "MCQ Test",
          count: "50 Tests",
          description: "Multiple choice questions",
        },
        {
          name: "Previous Year Question Paper",
          count: "25 Papers",
          description: "Last 10 years papers",
        },
        {
          name: "Chapter-wise PYQs",
          count: "300+ Questions",
          description: "Topic-wise practice",
        },
        {
          name: "JEE Adv Mock Test",
          count: "10 Tests",
          description: "Advanced level preparation",
        },
        {
          name: "JEE Adv PYQs",
          count: "200+ Questions",
          description: "Advanced previous questions",
        },
      ],
    },
    "JEE Advanced": {
      icon: <Award className="w-6 h-6" />,
      badge: "PREMIUM",
      title: "JEE Advanced 2025",
      description: "12 Full-Length Test • Advanced Level Preparation",
      tests: [
        {
          name: "Mock Test",
          count: "12 Tests",
          description: "Advanced mock tests",
        },
        {
          name: "Sample Paper",
          count: "15 Papers",
          description: "IIT level papers",
        },
        { name: "MCQ Test", count: "40 Tests", description: "Complex MCQs" },
        {
          name: "Previous Year Question Paper",
          count: "20 Papers",
          description: "IIT JEE papers",
        },
        {
          name: "Chapter-wise PYQs",
          count: "250+ Questions",
          description: "Advanced topics",
        },
        {
          name: "Subject-wise Tests",
          count: "30 Tests",
          description: "Physics, Chemistry, Math",
        },
        {
          name: "Integer Type Questions",
          count: "100+ Questions",
          description: "Numerical answer type",
        },
      ],
    },
    NEET: {
      icon: <BookOpen className="w-6 h-6" />,
      badge: "POPULAR",
      title: "NEET 2025",
      description: "20 Full-Length Test • Medical Entrance Preparation",
      tests: [
        {
          name: "Mock Test",
          count: "20 Tests",
          description: "NEET mock tests",
        },
        {
          name: "Sample Paper",
          count: "25 Papers",
          description: "Medical entrance papers",
        },
        {
          name: "MCQ Test",
          count: "60 Tests",
          description: "Biology, Physics, Chemistry",
        },
        {
          name: "Previous Year Question Paper",
          count: "30 Papers",
          description: "NEET previous papers",
        },
        {
          name: "Chapter-wise PYQs",
          count: "400+ Questions",
          description: "Subject-wise practice",
        },
        {
          name: "Biology Tests",
          count: "25 Tests",
          description: "Botany & Zoology",
        },
        {
          name: "AIIMS PYQs",
          count: "150+ Questions",
          description: "AIIMS previous questions",
        },
      ],
    },
    BITSAT: {
      icon: <FileText className="w-6 h-6" />,
      badge: "NEW",
      title: "BITSAT 2025",
      description: "15 Full-Length Test • BITS Pilani Preparation",
      tests: [
        {
          name: "Mock Test",
          count: "15 Tests",
          description: "BITSAT mock tests",
        },
        {
          name: "Sample Paper",
          count: "18 Papers",
          description: "BITS pattern papers",
        },
        {
          name: "MCQ Test",
          count: "45 Tests",
          description: "Computer-based practice",
        },
        {
          name: "Previous Year Question Paper",
          count: "22 Papers",
          description: "BITSAT previous papers",
        },
        {
          name: "Chapter-wise PYQs",
          count: "280+ Questions",
          description: "Topic-wise questions",
        },
        {
          name: "English Proficiency",
          count: "20 Tests",
          description: "English & Logical Reasoning",
        },
        {
          name: "Speed Tests",
          count: "30 Tests",
          description: "Time management practice",
        },
      ],
    },
    VITEEE: {
      icon: <CheckCircle className="w-6 h-6" />,
      badge: "UPDATED",
      title: "VITEEE 2025",
      description: "12 Full-Length Test • VIT Engineering Entrance",
      tests: [
        {
          name: "Mock Test",
          count: "12 Tests",
          description: "VITEEE mock tests",
        },
        {
          name: "Sample Paper",
          count: "15 Papers",
          description: "VIT pattern papers",
        },
        {
          name: "MCQ Test",
          count: "35 Tests",
          description: "Multiple choice practice",
        },
        {
          name: "Previous Year Question Paper",
          count: "18 Papers",
          description: "VITEEE previous papers",
        },
        {
          name: "Chapter-wise PYQs",
          count: "220+ Questions",
          description: "Subject-wise practice",
        },
        {
          name: "Mathematics Tests",
          count: "20 Tests",
          description: "Advanced mathematics",
        },
        {
          name: "Aptitude Tests",
          count: "15 Tests",
          description: "Logical reasoning",
        },
      ],
    },
    COMEDK: {
      icon: <Target className="w-6 h-6" />,
      badge: "NEW",
      title: "COMEDK 2025",
      description: "10 Full-Length Test • Karnataka Engineering",
      tests: [
        {
          name: "Mock Test",
          count: "10 Tests",
          description: "COMEDK mock tests",
        },
        {
          name: "Sample Paper",
          count: "12 Papers",
          description: "Karnataka pattern",
        },
        {
          name: "MCQ Test",
          count: "30 Tests",
          description: "State level practice",
        },
        {
          name: "Previous Year Question Paper",
          count: "15 Papers",
          description: "COMEDK previous papers",
        },
        {
          name: "Chapter-wise PYQs",
          count: "180+ Questions",
          description: "Topic-wise questions",
        },
        {
          name: "Physics Tests",
          count: "15 Tests",
          description: "Physics specialization",
        },
        {
          name: "Chemistry Tests",
          count: "15 Tests",
          description: "Chemistry focus",
        },
      ],
    },
    KCET: {
      icon: <BookOpen className="w-6 h-6" />,
      badge: "POPULAR",
      title: "KCET 2025",
      description: "12 Full-Length Test • Karnataka CET",
      tests: [
        {
          name: "Mock Test",
          count: "12 Tests",
          description: "KCET mock tests",
        },
        {
          name: "Sample Paper",
          count: "15 Papers",
          description: "CET pattern papers",
        },
        {
          name: "MCQ Test",
          count: "40 Tests",
          description: "State syllabus based",
        },
        {
          name: "Previous Year Question Paper",
          count: "20 Papers",
          description: "KCET previous papers",
        },
        {
          name: "Chapter-wise PYQs",
          count: "250+ Questions",
          description: "Chapter-wise practice",
        },
        {
          name: "Biology Tests",
          count: "18 Tests",
          description: "For medical stream",
        },
        {
          name: "Mathematics Tests",
          count: "18 Tests",
          description: "For engineering stream",
        },
      ],
    },
    "MHT CET": {
      icon: <Award className="w-6 h-6" />,
      badge: "UPDATED",
      title: "MHT CET 2025",
      description: "15 Full-Length Test • Maharashtra CET",
      tests: [
        {
          name: "Mock Test",
          count: "15 Tests",
          description: "MHT CET mock tests",
        },
        {
          name: "Sample Paper",
          count: "18 Papers",
          description: "Maharashtra pattern",
        },
        {
          name: "MCQ Test",
          count: "45 Tests",
          description: "State board practice",
        },
        {
          name: "Previous Year Question Paper",
          count: "25 Papers",
          description: "MHT CET previous papers",
        },
        {
          name: "Chapter-wise PYQs",
          count: "300+ Questions",
          description: "Topic-wise questions",
        },
        {
          name: "PCM Tests",
          count: "20 Tests",
          description: "Physics, Chemistry, Math",
        },
        {
          name: "PCB Tests",
          count: "20 Tests",
          description: "Physics, Chemistry, Biology",
        },
      ],
    },
    WBJEE: {
      icon: <FileText className="w-6 h-6" />,
      badge: "NEW",
      title: "WBJEE 2025",
      description: "10 Full-Length Test • West Bengal JEE",
      tests: [
        {
          name: "Mock Test",
          count: "10 Tests",
          description: "WBJEE mock tests",
        },
        {
          name: "Sample Paper",
          count: "12 Papers",
          description: "WB pattern papers",
        },
        {
          name: "MCQ Test",
          count: "30 Tests",
          description: "State level practice",
        },
        {
          name: "Previous Year Question Paper",
          count: "15 Papers",
          description: "WBJEE previous papers",
        },
        {
          name: "Chapter-wise PYQs",
          count: "200+ Questions",
          description: "Subject-wise practice",
        },
        {
          name: "Mathematics Tests",
          count: "15 Tests",
          description: "Advanced mathematics",
        },
        {
          name: "Category Tests",
          count: "12 Tests",
          description: "Category-wise practice",
        },
      ],
    },
  };

  const currentExamData = testData[selectedExam];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="pt-20 pb-16 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Test Portal
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Practice with our comprehensive test series for all major entrance
              exams
            </p>
          </div>

          {/* Exam Selection */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {exams.map((exam) => (
              <Button
                key={exam}
                onClick={() => setSelectedExam(exam)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedExam === exam
                    ? "bg-blue-500 text-white shadow-lg hover:bg-blue-600"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {exam}
              </Button>
            ))}
          </div>

          {/* Selected Exam Details */}
          <div className="max-w-5xl mx-auto">
            <Card className="mb-8 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    {currentExamData.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-2xl">
                        {currentExamData.title}
                      </CardTitle>
                      <span className="px-2 py-1 text-xs font-semibold bg-red-500 text-white rounded">
                        {currentExamData.badge}
                      </span>
                    </div>
                    <CardDescription className="text-gray-600">
                      {currentExamData.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentExamData.tests.map((test, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer hover:bg-blue-50"
                    >
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {test.name}
                      </h3>
                      <p className="text-blue-600 font-medium text-sm mb-2">
                        {test.count}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {test.description}
                      </p>

                      {/* ✅ Explore Button Redirect */}
                      <Button
                        className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white"
                        onClick={() => {
                          if (test.name === "MCQ Test") {
                            navigate("/exam-page");
                          } else {
                            console.log(`Explore clicked for ${test.name}`);
                          }
                        }}
                      >
                        Explore
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TestPortal;
