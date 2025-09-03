// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { CheckCircle, XCircle, Clock, Target, Home } from "lucide-react";

// const TestResult = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { testId } = useParams();
  
//   const { 
//     answers = {}, 
//     questions = [], 
//     correctAnswers = 0, 
//     totalQuestions = 0, 
//     percentage = 0,
//     timeTaken = 0 
//   } = location.state || {};

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}m ${secs}s`;
//   };

//   const getPerformanceMessage = (percentage: number) => {
//     if (percentage >= 90) return { message: "Excellent! 🎉", color: "text-green-600" };
//     if (percentage >= 75) return { message: "Good Job! 😊", color: "text-blue-600" };
//     if (percentage >= 60) return { message: "Well Done! 👍", color: "text-yellow-600" };
//     return { message: "Keep Trying! 💪", color: "text-red-600" };
//   };

//   const performance = getPerformanceMessage(percentage);
//   const wrongAnswers = totalQuestions - correctAnswers;
//   const unanswered = totalQuestions - Object.keys(answers).length;

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-4xl mx-auto space-y-6">
//         {/* Header */}
//         <Card>
//           <CardHeader className="text-center pb-4">
//             <div className="mb-4">
//               <h1 className="text-3xl font-bold text-foreground mb-2">Exam Result</h1>
//               <p className={`text-2xl font-semibold ${performance.color}`}>{performance.message}</p>
//             </div>
//           </CardHeader>
//         </Card>

//         {/* Results Summary */}
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//           <Card className="bg-green-50 border-green-200">
//             <CardContent className="p-4 text-center">
//               <div className="text-3xl font-bold text-green-600 mb-1">{correctAnswers}</div>
//               <div className="text-sm text-green-700">Correct</div>
//             </CardContent>
//           </Card>

//           <Card className="bg-red-50 border-red-200">
//             <CardContent className="p-4 text-center">
//               <div className="text-3xl font-bold text-red-600 mb-1">{wrongAnswers}</div>
//               <div className="text-sm text-red-700">Wrong</div>
//             </CardContent>
//           </Card>

//           <Card className="bg-yellow-50 border-yellow-200">
//             <CardContent className="p-4 text-center">
//               <div className="text-3xl font-bold text-yellow-600 mb-1">{unanswered}</div>
//               <div className="text-sm text-yellow-700">Unanswered</div>
//             </CardContent>
//           </Card>

//           <Card className="bg-blue-50 border-blue-200">
//             <CardContent className="p-4 text-center">
//               <div className="text-3xl font-bold text-blue-600 mb-1">{totalQuestions}</div>
//               <div className="text-sm text-blue-700">Total</div>
//             </CardContent>
//           </Card>

//           <Card className="bg-purple-50 border-purple-200">
//             <CardContent className="p-4 text-center">
//               <div className="text-3xl font-bold text-purple-600 mb-1">{percentage.toFixed(1)}%</div>
//               <div className="text-sm text-purple-700">Percentage</div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Detailed Results */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Target size={20} />
//               Detailed Analysis
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {questions.map((question: any, index: number) => {
//               const userAnswer = answers[question.id];
//               const isCorrect = userAnswer === question.correctAnswer;
//               const isAnswered = !!userAnswer;

//               return (
//                 <div key={question.id} className="border border-border rounded-lg p-4">
//                   <div className="flex items-start gap-3 mb-3">
//                     <Badge variant="outline" className="text-xs">
//                       Q{index + 1}
//                     </Badge>
//                     {isAnswered ? (
//                       <Badge className={`text-xs ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                         {isCorrect ? (
//                           <>
//                             <CheckCircle size={12} className="mr-1" />
//                             Correct
//                           </>
//                         ) : (
//                           <>
//                             <XCircle size={12} className="mr-1" />
//                             Wrong
//                           </>
//                         )}
//                       </Badge>
//                     ) : (
//                       <Badge variant="secondary" className="text-xs">
//                         Unanswered
//                       </Badge>
//                     )}
//                   </div>

//                   <h3 className="font-medium mb-3">{question.question}</h3>

//                   <div className="space-y-2">
//                     {question.options.map((option: string, optIndex: number) => {
//                       const isUserAnswer = userAnswer === option;
//                       const isCorrectOption = option === question.correctAnswer;
                      
//                       let optionClass = "p-2 rounded border ";
//                       if (isCorrectOption) {
//                         optionClass += "bg-green-50 border-green-200 text-green-800";
//                       } else if (isUserAnswer && !isCorrect) {
//                         optionClass += "bg-red-50 border-red-200 text-red-800";
//                       } else {
//                         optionClass += "bg-gray-50 border-gray-200";
//                       }

//                       return (
//                         <div key={optIndex} className={optionClass}>
//                           <span className="font-medium mr-2">
//                             {String.fromCharCode(65 + optIndex)}.
//                           </span>
//                           {option}
//                           {isUserAnswer && (
//                             <span className="ml-2 text-sm">
//                               (Your Answer)
//                             </span>
//                           )}
//                           {isCorrectOption && (
//                             <span className="ml-2 text-sm font-medium">
//                               ✓ Correct Answer
//                             </span>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               );
//             })}
//           </CardContent>
//         </Card>

//         {/* Action Buttons */}
//         <div className="flex justify-center gap-4">
//           <Button 
//             onClick={() => navigate('/student-dashboard')}
//             className="flex items-center gap-2"
//           >
//             <Home size={16} />
//             Back to Dashboard
//           </Button>
//           <Button 
//             variant="outline"
//             onClick={() => navigate('/test-portal')}
//             className="flex items-center gap-2"
//           >
//             <Target size={16} />
//             Take Another Test
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestResult;


import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Target, Home } from "lucide-react";

const TestResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { test, selectedAnswers: passedAnswers, timeTaken } = location.state || {};

  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<any[]>([]);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [unanswered, setUnanswered] = useState(0);

  const norm = (v: any) =>
    String(v ?? "")
      .trim()
      .toLowerCase();

  useEffect(() => {
    if (!test || !test.questions) return;

    setQuestions(test.questions);
    const answers = passedAnswers || new Array(test.questions.length).fill(null);
    setSelectedAnswers(answers);

    let c = 0,
      w = 0,
      u = 0;

    test.questions.forEach((q: any, i: number) => {
      const correctText = norm(q.correctAnswer);
      const selRaw = answers[i];
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

    // ✅ Save result for mentor view (optional)
    const submission = {
      name: localStorage.getItem("studentName") || "Unknown Student",
      email: localStorage.getItem("studentEmail") || "unknown@example.com",
      examName: test.title || "Untitled Exam",
      examDate: new Date().toLocaleDateString(),
      examTime: new Date().toLocaleTimeString(),
      timeTaken: timeTaken || "N/A",
      correct: c,
      wrong: w,
    };

    const previousSubmissions =
      JSON.parse(localStorage.getItem("studentSubmissions") || "[]");
    previousSubmissions.push(submission);
    localStorage.setItem("studentSubmissions", JSON.stringify(previousSubmissions));
  }, [test, passedAnswers, timeTaken]);

  const percentage = questions.length > 0 ? (correct / questions.length) * 100 : 0;
  const percentageLabel = `${percentage.toFixed(2)}%`;

  const getEmoji = () => {
    if (percentage >= 80) return "🎉 Excellent!";
    if (percentage >= 50) return "😊 Good Job!";
    return "😢 Needs Improvement";
  };

  if (!test || questions.length === 0) {
    return (
      <p className="p-6 text-center">
        No questions found. Please attempt the test first.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader className="text-center pb-4">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-foreground mb-2">Exam Result</h1>
              <p className="text-2xl font-semibold">{getEmoji()}</p>
            </div>
          </CardHeader>
        </Card>

        {/* Results Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{correct}</div>
              <div className="text-sm text-green-700">Correct</div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">{wrong}</div>
              <div className="text-sm text-red-700">Wrong</div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-1">{unanswered}</div>
              <div className="text-sm text-yellow-700">Unanswered</div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{questions.length}</div>
              <div className="text-sm text-blue-700">Total</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">{percentageLabel}</div>
              <div className="text-sm text-purple-700">Percentage</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target size={20} />
              Detailed Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions.map((question, index) => {
              const selRaw = selectedAnswers[index];
              let userAnswer = "";
              if (typeof selRaw === "number") {
                userAnswer = question.options?.[selRaw];
              } else {
                userAnswer = selRaw;
              }
              const isCorrect = norm(userAnswer) === norm(question.correctAnswer);
              const isAnswered = !!userAnswer;

              return (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Badge variant="outline" className="text-xs">
                      Q{index + 1}
                    </Badge>
                    {isAnswered ? (
                      <Badge
                        className={`text-xs ${
                          isCorrect
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle size={12} className="mr-1" />
                            Correct
                          </>
                        ) : (
                          <>
                            <XCircle size={12} className="mr-1" />
                            Wrong
                          </>
                        )}
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs">
                        Unanswered
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-medium mb-3">{question.question}</h3>

                  <div className="space-y-2">
                    {question.options.map((option: string, optIndex: number) => {
                      const isUserAnswer = userAnswer === option;
                      const isCorrectOption = norm(option) === norm(question.correctAnswer);

                      let optionClass = "p-2 rounded border ";
                      if (isCorrectOption) {
                        optionClass += "bg-green-50 border-green-200 text-green-800";
                      } else if (isUserAnswer && !isCorrect) {
                        optionClass += "bg-red-50 border-red-200 text-red-800";
                      } else {
                        optionClass += "bg-gray-50 border-gray-200";
                      }

                      return (
                        <div key={optIndex} className={optionClass}>
                          <span className="font-medium mr-2">
                            {String.fromCharCode(65 + optIndex)}.
                          </span>
                          {option}
                          {isUserAnswer && <span className="ml-2 text-sm">(Your Answer)</span>}
                          {isCorrectOption && (
                            <span className="ml-2 text-sm font-medium">✓ Correct Answer</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button onClick={() => navigate("/student-dashboard")} className="flex items-center gap-2">
            <Home size={16} />
            Back to Dashboard
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/test-portal")}
            className="flex items-center gap-2"
          >
            <Target size={16} />
            Take Another Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
