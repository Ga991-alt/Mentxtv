// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Clock, ChevronLeft, ChevronRight, Flag } from "lucide-react";
// import { toast } from "sonner";

// // Mock questions data
// const mockQuestions = [
//   {
//     id: "1",
//     question: "Which symbol is used to declare variable in PHP?",
//     options: ["#", "@", "$", "%"],
//     correctAnswer: "$"
//   },
//   {
//     id: "2", 
//     question: "Which keyword is used to declare constant variable in Java?",
//     options: ["const", "constant", "final", "static"],
//     correctAnswer: "final"
//   },
//   {
//     id: "3",
//     question: "Which keyword is used to use interface with class in Java?",
//     options: ["extends", "implements", "interface", "class"],
//     correctAnswer: "implements"
//   },
//   {
//     id: "4",
//     question: "In C++, how to create object?",
//     options: ["using \"new\" keyword", "using \"create\" keyword", "using \"make\" keyword", "using \"constant\" keyword"],
//     correctAnswer: "using \"new\" keyword"
//   },
//   {
//     id: "5",
//     question: "What is the correct syntax for a for loop in JavaScript?",
//     options: ["for (i = 0; i <= 5; i++)", "for (i = 0; i <= 5)", "for i = 1 to 5", "for (i <= 5; i++)"],
//     correctAnswer: "for (i = 0; i <= 5; i++)"
//   }
// ];

// const TestExam = () => {
//   const { testId } = useParams();
//   const navigate = useNavigate();
  
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState<Record<string, string>>({});
//   const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   // Timer effect
//   useEffect(() => {
//     if (timeLeft > 0 && !isSubmitted) {
//       const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
//       return () => clearTimeout(timer);
//     } else if (timeLeft === 0 && !isSubmitted) {
//       handleSubmitExam();
//     }
//   }, [timeLeft, isSubmitted]);

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const currentQuestion = mockQuestions[currentQuestionIndex];

//   const handleAnswerChange = (value: string) => {
//     setAnswers({
//       ...answers,
//       [currentQuestion.id]: value
//     });
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < mockQuestions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handleSubmitExam = () => {
//     const correctAnswers = mockQuestions.filter(q => answers[q.id] === q.correctAnswer).length;
//     const totalQuestions = mockQuestions.length;
//     const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
//     // Navigate to results page with results
//     navigate(`/test-result/${testId}`, {
//       state: {
//         answers,
//         questions: mockQuestions,
//         correctAnswers,
//         totalQuestions,
//         percentage,
//         timeTaken: 300 - timeLeft
//       }
//     });
    
//     setIsSubmitted(true);
//     toast.success("Exam submitted successfully!");
//   };

//   const getQuestionStatus = (index: number) => {
//     const question = mockQuestions[index];
//     if (answers[question.id]) return "answered";
//     if (index === currentQuestionIndex) return "current";
//     return "unanswered";
//   };

//   const getQuestionStatusColor = (status: string) => {
//     switch (status) {
//       case "answered": return "bg-green-100 text-green-800 border-green-300";
//       case "current": return "bg-blue-100 text-blue-800 border-blue-300";
//       default: return "bg-gray-100 text-gray-800 border-gray-300";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <Card className="mb-6">
//           <CardHeader className="pb-3">
//             <div className="flex justify-between items-center">
//               <div>
//                 <CardTitle>JEE Main Mathematics - Algebra</CardTitle>
//                 <p className="text-muted-foreground mt-1">Question {currentQuestionIndex + 1} of {mockQuestions.length}</p>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-2 text-red-600">
//                   <Clock size={20} />
//                   <span className="font-mono text-lg font-bold">Time Left: {formatTime(timeLeft)}</span>
//                 </div>
//                 <Button 
//                   onClick={handleSubmitExam}
//                   className="bg-blue-600 hover:bg-blue-700"
//                 >
//                   Submit
//                 </Button>
//               </div>
//             </div>
//           </CardHeader>
//         </Card>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Question Navigation Panel */}
//           <Card className="lg:col-span-1">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-lg">Questions</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-5 lg:grid-cols-1 gap-2">
//                 {mockQuestions.map((_, index) => {
//                   const status = getQuestionStatus(index);
//                   return (
//                     <Button
//                       key={index}
//                       variant="outline"
//                       size="sm"
//                       onClick={() => setCurrentQuestionIndex(index)}
//                       className={`h-10 ${getQuestionStatusColor(status)}`}
//                     >
//                       {index + 1}
//                     </Button>
//                   );
//                 })}
//               </div>
              
//               <div className="mt-4 space-y-2 text-sm">
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
//                   <span>Answered ({Object.keys(answers).length})</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
//                   <span>Current</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
//                   <span>Unanswered ({mockQuestions.length - Object.keys(answers).length})</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Question Panel */}
//           <Card className="lg:col-span-3">
//             <CardHeader>
//               <div className="flex items-center gap-2">
//                 <Badge variant="outline">Question {currentQuestionIndex + 1}</Badge>
//                 {answers[currentQuestion.id] && (
//                   <Badge className="bg-green-100 text-green-800">
//                     <Flag size={12} className="mr-1" />
//                     Answered
//                   </Badge>
//                 )}
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div>
//                 <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
                
//                 <RadioGroup
//                   value={answers[currentQuestion.id] || ""}
//                   onValueChange={handleAnswerChange}
//                   className="space-y-3"
//                 >
//                   {currentQuestion.options.map((option, index) => (
//                     <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
//                       <RadioGroupItem value={option} id={`option-${index}`} />
//                       <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
//                         <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
//                         {option}
//                       </Label>
//                     </div>
//                   ))}
//                 </RadioGroup>
//               </div>

//               {/* Navigation Buttons */}
//               <div className="flex justify-between pt-4">
//                 <Button
//                   variant="outline"
//                   onClick={handlePreviousQuestion}
//                   disabled={currentQuestionIndex === 0}
//                   className="flex items-center gap-2"
//                 >
//                   <ChevronLeft size={16} />
//                   Previous
//                 </Button>
                
//                 <Button
//                   onClick={handleNextQuestion}
//                   disabled={currentQuestionIndex === mockQuestions.length - 1}
//                   className="flex items-center gap-2"
//                 >
//                   Next
//                   <ChevronRight size={16} />
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestExam;


import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock, ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const TestExam = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  // ✅ Student-only access guard
  if (!user || user.role !== "Student") {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">Access Denied. Students only.</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const { test,isAdmin } = location.state || {}; // ✅ Passed via navigate state
  console.log("Loaded test:", test, "isAdmin:", isAdmin);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Load test + initialize answers
  useEffect(() => {
    if (test && test.questions) {
      setQuestions(test.questions);
      const init = new Array(test.questions.length).fill(null);
      setSelectedAnswers(init);
      setTimeLeft(test.questions.length * 60); // ⏱ 1 min per question
      localStorage.setItem("selectedAnswers", JSON.stringify(init));
    }
  }, [test]);

  // Countdown timer
  useEffect(() => {
    if (!questions.length) return;
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

  // Handle option selection
  const handleOptionSelect = (optionIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentIndex] = optionIndex; // store INDEX
    setSelectedAnswers(updated);
    localStorage.setItem("selectedAnswers", JSON.stringify(updated));
  };

  // Submit exam
  // const handleSubmit = async () => {
  //   const timeTakenInSeconds = test.questions.length * 60 - timeLeft;
  //   const minutes = Math.floor(timeTakenInSeconds / 60);
  //   const seconds = timeTakenInSeconds % 60;
  //   const formattedTime = `${minutes}m ${seconds}s`;

  //   const norm = (v: any) => String(v ?? "").trim().toLowerCase();
  //   let correct = 0,
  //     wrong = 0;

  //   test.questions.forEach((q: any, i: number) => {
  //     const correctText = norm(q.correctAnswer);
  //     const selRaw = selectedAnswers[i];
  //     const selectedText =
  //       typeof selRaw === "number" ? norm(q.options?.[selRaw]) : norm(selRaw);

  //     if (selectedText && selectedText === correctText) correct++;
  //     else if (selectedText) wrong++;
  //   });

  //   const payload = {
  //     studentId: user.id,
  //     testId: test._id,
  //     examDate: new Date(),
  //     timeTaken: formattedTime,
  //     correct,
  //     wrong,
  //     percentage: ((correct / test.questions.length) * 100).toFixed(2),
  //   };

  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_BASE_URL}/api/tests/add-result`,
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(payload),
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Failed to submit result");
  //     }

  //     navigate("/test-result", {
  //       state: { test, selectedAnswers, timeTaken: formattedTime },
  //     });
  //   } catch (error: any) {
  //     console.error(error);
  //     alert("Error submitting result: " + error.message);
  //   }
  // };

  // Submit exam
const handleSubmit = async () => {
  const timeTakenInSeconds = test.questions.length * 60 - timeLeft;
  const minutes = Math.floor(timeTakenInSeconds / 60);
  const seconds = timeTakenInSeconds % 60;
  const formattedTime = `${minutes}m ${seconds}s`;

  const norm = (v: any) => String(v ?? "").trim().toLowerCase();
  let correct = 0,
    wrong = 0;

  test.questions.forEach((q: any, i: number) => {
    const correctText =
      typeof q.correctAnswer === "number"
        ? norm(q.options?.[q.correctAnswer]) // for admin test numeric index
        : norm(q.correctAnswer); // for mentor test stored as string
    const selRaw = selectedAnswers[i];
    const selectedText =
      typeof selRaw === "number" ? norm(q.options?.[selRaw]) : norm(selRaw);

    if (selectedText && selectedText === correctText) correct++;
    else if (selectedText) wrong++;
  });

  try {
    if (isAdmin) {
      // ✅ AdminTest flow
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admintest/${test._id}/take`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId: user.id }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to mark admin test as taken");
      }
    } else {
      // ✅ Normal MentorTest flow
      const payload = {
        studentId: user.id,
        testId: test._id,
        examDate: new Date(),
        timeTaken: formattedTime,
        correct,
        wrong,
        percentage: ((correct / test.questions.length) * 100).toFixed(2),
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/tests/add-result`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit result");
      }
    }

    navigate("/test-result", {
      state: { test, selectedAnswers, timeTaken: formattedTime },
    });
  } catch (error: any) {
    console.error(error);
    alert("Error submitting result: " + error.message);
  }
};


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!test || !questions.length) {
    return <p className="p-6 text-center">Loading test...</p>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{test.title || "Test Exam"}</CardTitle>
                <p className="text-muted-foreground mt-1">
                  Question {currentIndex + 1} of {questions.length}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-red-600">
                  <Clock size={20} />
                  <span className="font-mono text-lg font-bold">
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <Button
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Submit
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation panel */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 lg:grid-cols-1 gap-2">
                {questions.map((_, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentIndex(index)}
                    className={`h-10 ${
                      selectedAnswers[index] !== null
                        ? "bg-green-100 text-green-800 border-green-300"
                        : index === currentIndex
                        ? "bg-blue-100 text-blue-800 border-blue-300"
                        : "bg-gray-100 text-gray-800 border-gray-300"
                    }`}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Question panel */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Question {currentIndex + 1}</Badge>
                {selectedAnswers[currentIndex] !== null && (
                  <Badge className="bg-green-100 text-green-800">
                    <Flag size={12} className="mr-1" />
                    Answered
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  {currentQuestion.question}
                </h3>
                <RadioGroup
                  value={
                    selectedAnswers[currentIndex] !== null
                      ? String(selectedAnswers[currentIndex])
                      : ""
                  }
                  onValueChange={(val) => handleOptionSelect(Number(val))}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <RadioGroupItem
                        value={String(idx)}
                        id={`option-${idx}`}
                      />
                      <Label
                        htmlFor={`option-${idx}`}
                        className="flex-1 cursor-pointer"
                      >
                        <span className="font-medium mr-2">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Nav buttons */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentIndex(currentIndex - 1)}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft size={16} />
                  Previous
                </Button>
                <Button
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                  disabled={currentIndex === questions.length - 1}
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TestExam;
