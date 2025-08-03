import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
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
import ViewMentor from "./pages/ViewMentor";
import ViewStudent from "./pages/viewStudent";
import BookingSessions from "./pages/BookingSessions";
import Payment from "./pages/Payment";
import SessionDetails from "./pages/SessionDetails";
import AboutUs from "./pages/AboutUs";
import FAQ from "./pages/FAQ";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PostSession from "./pages/PostSession";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import LiveSession from "./pages/LiveSession.tsx";
import MentorLiveSession from "./pages/MentorLiveSession";
import FeedbackForm from "./pages/feedback.tsx";
import ForgotPassword from "./pages/ForgotPage.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
// import MentorLiveSession from "./pages/MentorLiveSession.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/exam-details" element={<ExamDetails />} />
            <Route path="/become-mentor" element={<BecomeMentor />} />
            <Route path="/test-portal" element={<TestPortal />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/mentor-dashboard" element={<MentorDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/booking-sessions" element={<BookingSessions />} />
            <Route path="/payment/:sessionId" element={<Payment />} />
            <Route
              path="/session-details/:sessionId"
              element={<SessionDetails />}
            />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/live-session/:sessionId" element={<LiveSession />} />
            <Route path="/mentor-live-session/:sessionId" element={<MentorLiveSession />} />
            <Route path="/view-mentor/:email" element={<ViewMentor />} />
            <Route path="/view-student/:email" element={<ViewStudent />} />
            <Route path="/feedback/:sessionid" element={<FeedbackForm />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route
              path="/post-session"
              element={
                <ProtectedRoute allowedRoles={["Mentor", "Admin"]}>
                  <PostSession />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
