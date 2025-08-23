import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";

// Pages
import Index from "./pages/Index";
import ExamDetails from "./pages/ExamDetails";
import BecomeMentor from "./pages/BecomeMentor";
import TestPortal from "./pages/TestPortal";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BookingSessions from "./pages/BookingSessions";
import Payment from "./pages/Payment";
import SessionDetails from "./pages/SessionDetails";
import AboutUs from "./pages/AboutUs";
import FAQ from "./pages/FAQ";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PostSession from "./pages/PostSession";
import BlogPost from "./pages/BlogPost";
//import Mentors from "./pages/Mentors";
//import SubscribePlans from "./pages/SubscribePlans";
import ViewMentor from "./pages/ViewMentor";
import ViewStudent from "./pages/viewStudent";
import LiveSession from "./pages/LiveSession";
import MentorLiveSession from "./pages/MentorLiveSession";
import FeedbackForm from "./pages/feedback";
import ForgotPassword from "./pages/ForgotPage";
import ResetPassword from "./pages/ResetPassword";
import AdminLogin from "./pages/adminlogin";
import ExamPage from "./pages/ExamPage";
import ResultPage from "./pages/ResultPage";
import CreateTest from "./pages/CreateTest";
import ViewAllExam from "./pages/ViewExamDetails";
import StudentPerformance from "./pages/StudentExamPerformance";
import StudentDashboardResult from "./pages/StudentDashboardResult";
import NotFound from "./pages/NotFound";
import Appointments  from "./pages/Appointments";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import MentorsPage from "./pages/ViewallMentors";
import SubscribePage from "./pages/Subscribe";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/exam-details" element={<ExamDetails />} />
            <Route path="/become-mentor" element={<BecomeMentor />} />
            <Route path="/test-portal" element={<TestPortal />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            {/* <Route path="/mentors" element={<Mentors />} /> */}
            {/* <Route
              path="/mentors/:mentorId/subscribe"
              element={<SubscribePlans />}
            /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/appointments/:mentorId" element={<Appointments />} />

            {/* Dashboards */}
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route
              path="/student-dashboard-result"
              element={<StudentDashboardResult />}
            />
            <Route path="/mentor-dashboard" element={<MentorDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            {/* Booking & Payments */}
            <Route path="/booking-sessions" element={<BookingSessions />} />
            <Route path="/payment/:sessionId" element={<Payment />} />
            <Route
              path="/session-details/:sessionId"
              element={<SessionDetails />}
            />

            {/* Exams */}
            <Route path="/exam-page" element={<ExamPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/create-test" element={<CreateTest />} />
            <Route path="/view-allexam" element={<ViewAllExam />} />
            <Route
              path="/student-performance"
              element={<StudentPerformance />}
            />

            {/* Live Sessions */}
            <Route path="/live-session/:sessionId" element={<LiveSession />} />
            <Route
              path="/mentor-live-session/:sessionId"
              element={<MentorLiveSession />}
            />

            {/* Feedback */}
            <Route path="/feedback/:sessionid" element={<FeedbackForm />} />

            {/* Auth */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Protected */}
            <Route
              path="/post-session"
              element={
                <ProtectedRoute allowedRoles={["Mentor", "Admin"]}>
                  <PostSession />
                </ProtectedRoute>
              }
            />

            {/* View Details */}
            <Route path="/view-mentor/:email" element={<ViewMentor />} />
            <Route path="/view-student/:email" element={<ViewStudent />} />
            <Route path='viewallmentors' element={<MentorsPage/>}/>
            <Route path='/subscribe/:mentorid' element={<SubscribePage/>}/>
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
