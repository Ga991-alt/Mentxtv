// import { useSearchParams } from "react-router-dom";
// import DashboardStats from "@/components/admin/DashboardStats";
// import MentorManagement from "@/components/admin/MentorManagement";
// import StudentManagement from "@/components/admin/StudentManagement";
// import SessionManagement from "@/components/admin/SessionManagement";
// import PaymentManagement from "@/components/admin/PaymentManagement";
// import SocialMediaSettings from "@/components/admin/SocialMediaSettings";
// import ContentManagement from "@/components/admin/ContentManagement";
// import { dashboardStats, mentors, students, sessionData, payments } from "@/data/adminMockData";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import SubscriptionManagement from "./SubscriptionManagement";
// import TestManagement from "./TestManagement";
// import FeedbackManagement from "@/components/admin/FeedbackManagement";
// interface Payment {
//   id: string;
//   studentName: string;
//   email: string;
//   domain: string;
//   sessionId: string;
//   amount: number;
//   status: string;
//   paymentDate: string;
//   title:string;
// }

// interface Mentor {
//   id: string;
//   email: string;
//   name: string;
//   domain: string;
//   rating: number;
//   sessions: number;
// }

// interface Student {
//   id: string;
//   name: string;
//   email: string;
//   domain: string;
//   sessionsAttended: number;
//   performance: number;
// }

// interface LiveSession {
//   id: string;
//   mentorName: string;
//   mentorId: string;
//   subject: string;
//   domain: string;
//   studentsAttending: number;
//   feedbackGiven: boolean;
// }

// interface UpcomingSession {
//   id: string;
//   mentorName: string;
//   mentorId: string;
//   subject: string;
//   domain: string;
//   studentsRegistered: number;
//   canDelete: boolean;
// }

// interface EndedSession {
//   id: string;
//   mentorName: string;
//   mentorId: string;
//   subject: string;
//   domain: string;
//   studentsAttended: number;
//   feedbackCollected: boolean;
// }

// interface SessionManagementProps {
//   liveSessions: LiveSession[];
//   upcomingSessions: UpcomingSession[];
//   endedSessions: EndedSession[];
// }


// interface AdminDashboardContentProps {
//   socialLinks: {
//     instagram: string;
//     twitter: string;
//     youtube: string;
//   };
//   onSocialLinksChange: (platform: string, value: string) => void;
//   onSocialLinksSave: () => void;
// }

// const AdminDashboardContent = ({ 
//   socialLinks, 
//   onSocialLinksChange, 
//   onSocialLinksSave 
// }: AdminDashboardContentProps) => {
//   const [searchParams] = useSearchParams();
//   const activeTab = searchParams.get('tab');
//   const [mentors, setMentors] = useState([]);
//   const [students, setStudents] = useState<Student[]>([]);
//   const [payments, setPayments] = useState<Payment[]>([]);
// const [liveSessions, setLiveSessions] = useState<LiveSession[]>([]);
// const [upcomingSessions, setUpcomingSessions] = useState<UpcomingSession[]>([]);
// const [endedSessions, setEndedSessions] = useState<EndedSession[]>([]);

//   const [dashboardStats, setDashboardStats] = useState({
//     mentorCount: 0,
//     studentCount: 0,
//     liveSessionCount: 0,
//     upcomingSessionCount: 0,
//   });

// //   useEffect(() => {
// //   const fetchStats = async () => {
// //     try {
// //       const [studentsRes, mentorsRes, sessionsRes] = await Promise.all([
// //         axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/students`),
// //         axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/mentors`),
// //         axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/sessions`)
// //       ]);

// //       const students = studentsRes.data || [];
// //       const mentorsRaw = mentorsRes.data || [];
// //       const sessions = sessionsRes.data || [];

// //       // Process mentors to match Mentor interface
// //       const processedMentors: Mentor[] = mentorsRaw.map((mentor: any) => ({
// //         id: mentor._id,
// //         name: mentor.userId?.name || "Unknown",
// //         domain: mentor.domain || "General",
// //         rating: mentor.rating || 0,
// //         sessions: mentor.sessions?.length || 0,
// //       }));

// //       // Count sessions
// //       const liveSessions = sessions.filter(s => s.status?.toLowerCase() === "live");
// //       const upcomingSessions = sessions.filter(s => s.status?.toLowerCase() === "upcoming");

// //       setMentors(processedMentors);

// //       setDashboardStats({
// //         mentorCount: processedMentors.length,
// //         studentCount: students.length,
// //         liveSessionCount: liveSessions.length,
// //         upcomingSessionCount: upcomingSessions.length
// //       });
// //     } catch (err) {
// //       console.error("Failed to fetch dashboard stats:", err);
// //     }
// //   };

// //   fetchStats();
// // }, []);

// useEffect(() => {
//   const fetchStats = async () => {
//     try {
//       const [studentsRes, mentorsRes, sessionsRes,paymentsRes] = await Promise.all([
//         axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/students`),
//         axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/mentors`),
//         axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/sessions`),
//         axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/payments`)
//       ]);

//       const studentsRaw = studentsRes.data || [];
//       const mentorsRaw = mentorsRes.data || [];
//       const sessionsRaw = sessionsRes.data || [];
//       const paymentsRaw = paymentsRes.data || [];

//       // Process Students
//       const processedStudents: Student[] = studentsRaw.map((s: any) => ({
//         id: s._id,
//         name: s.userId?.name,
//         email: s.userId?.email,
//         domain: s.domain || "General",
//         sessionsAttended: s.attendedSessions?.length || 0,
//         performance: s.performance || 0,
//       }));
//       setStudents(processedStudents);
//       console.log("Processed Students:", processedStudents);

//       // Process Mentors
//       const processedMentors: Mentor[] = mentorsRaw.map((m: any) => ({
//         id: m._id,
//         email: m.userId?.email || "Unknown",
//         name: m.userId?.name || "Unknown",
//         domain: m.domain || "General",
//         rating: m.rating || 0,
//         sessions: m.sessions?.length || 0,
//       }));
//       setMentors(processedMentors);

//       // Process Sessions
//       const live: LiveSession[] = [];
//       const upcoming: UpcomingSession[] = [];
//       const ended: EndedSession[] = [];

//       sessionsRaw.forEach((s: any) => {
//         const base = {
//           id: s._id,
//           mentorName: s.mentorName || "Unknown",
//           mentorId: s.mentorId || "",
//           subject: s.subject || "General",
//           domain: s.domain || "General"
//         };

//         if (s.status?.toLowerCase() === "live") {
//           live.push({
//             ...base,
//             studentsAttending: s.AttendStudents?.length || 0,
//             feedbackGiven: false // or derive from s.feedbacks?.length
//           });
//         } else if (s.status?.toLowerCase() === "upcoming") {
//           upcoming.push({
//             ...base,
//             studentsRegistered: s.bookedStudents?.length || 0,
//             canDelete: true // set conditionally if needed
//           });
//         } else if (s.status?.toLowerCase() === "completed") {
//           ended.push({
//             ...base,
//             studentsAttended: s.AttendStudents?.length || 0,
//             feedbackCollected: s.feedbacks?.length > 0
//           });
//         }
//       });

//       setLiveSessions(live);
//       setUpcomingSessions(upcoming);
//       setEndedSessions(ended);

//       const processedPayments: Payment[] = paymentsRaw.map((p: any) => ({
//         id: p._id|| "N/A",
//         studentName: p.studentId?.userId.name || "Unknown",
//         email: p.studentId?.userId.email||"unknown",
//         domain: p.domain || "General",
//         sessionId: p.sessionId?._id || "Deleted",
//         amount: p.amount || 0,
//         status: p.status || "pending",
//         title: p.sessionId?.title || "Unknown",
//         paymentDate: new Date(p.timestamp).toLocaleString("en-IN", {
//                   dateStyle: "medium",
//                   timeStyle: "short",
//                 })
//       }));
//       setPayments(processedPayments);

//       setDashboardStats({
//         mentorCount: processedMentors.length,
//         studentCount: processedStudents.length,
//         liveSessionCount: live.length,
//         upcomingSessionCount: upcoming.length
//       });

//     } catch (err) {
//       console.error("Failed to fetch dashboard stats:", err);
//     }
//   };

//   fetchStats();
// }, []);

//   return (
//     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {!activeTab && (
//         <>
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
//             <p className="text-gray-600">Manage all aspects of the MentxTv platform.</p>
//           </div>

//           <DashboardStats 
//       mentorCount={dashboardStats.mentorCount}
//       studentCount={dashboardStats.studentCount}
//       liveSessionCount={dashboardStats.liveSessionCount}
//       upcomingSessionCount={dashboardStats.upcomingSessionCount}
//     />
//         </>
//       )}

//       {activeTab === 'mentors' && (
//         <>
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Mentor Details</h2>
//             <p className="text-gray-600">Manage and monitor mentor performance.</p>
//           </div>
//           <MentorManagement mentors={mentors} />
//         </>
//       )}


//       {activeTab === 'feedback' && (
//         <>
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Feedback Management</h2>
//             <p className="text-gray-600">Manage testimonials and feedback from students and mentors.</p>
//           </div>
//           <FeedbackManagement />
//       </>
//   )}

//       {activeTab === 'students' && (
//         <>
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Student Details</h2>
//             <p className="text-gray-600">Manage student accounts and track performance.</p>
//           </div>
//           <StudentManagement students={students} />
//         </>
//       )}

//       {activeTab === 'sessions' && (
//         <>
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Session Details</h2>
//             <p className="text-gray-600">Monitor live, upcoming, and ended sessions.</p>
//           </div>
//           <SessionManagement 
//             liveSessions={liveSessions}
//             upcomingSessions={upcomingSessions}
//             endedSessions={endedSessions}
//           />
//         </>
//       )}

//       {activeTab === 'content' && (
//         <>
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Content Management</h2>
//             <p className="text-gray-600">Manage website content and pages.</p>
//           </div>
//           <ContentManagement />
//         </>
//       )}

//       {activeTab === 'payments' && (
//         <>
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Details</h2>
//             <p className="text-gray-600">Monitor student payments and transaction history.</p>
//           </div>
//           <PaymentManagement payments={payments} />
//         </>
//       )}

//       {activeTab === 'social' && (
//         <>
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Social Media</h2>
//             <p className="text-gray-600">Manage social media links and settings.</p>
//           </div>
//           <SocialMediaSettings 
//             // links={socialLinks}
//             // onInputChange={onSocialLinksChange}
//             // onSave={onSocialLinksSave}
//           />
//         </>
//       )}


//       {activeTab === 'subscribe' && (
//         <>
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Social Media</h2>
//             <p className="text-gray-600">Manage social media links and settings.</p>
//           </div>
//           <SubscriptionManagement 
//             // links={socialLinks}
//             // onInputChange={onSocialLinksChange}
//             // onSave={onSocialLinksSave}
//           />
//         </>
//       )}

//       {activeTab === 'tests' && (
//         <>
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Test Management</h2>
//             <p className="text-gray-600">Create and manage test questions and portal content.</p>
//           </div>
//           <TestManagement />
//         </>
//       )}
//     </main>
//   );
// };

// export default AdminDashboardContent;



import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardStats from "@/components/admin/DashboardStats";
import MentorManagement from "@/components/admin/MentorManagement";
import StudentManagement from "@/components/admin/StudentManagement";
import SessionManagement from "@/components/admin/SessionManagement";
import PaymentManagement from "@/components/admin/PaymentManagement";
import SocialMediaSettings from "@/components/admin/SocialMediaSettings";
import ContentManagement from "@/components/admin/ContentManagement";
import BlogManagement from "@/components/admin/BlogManagement";
import TestManagement from "@/components/admin/TestManagement";

import { dashboardStats, mentors, students, sessionData, payments } from "@/data/adminMockData";
import { useEffect, useState } from "react";
import axios from "axios";
import SubscriptionManagement from "./SubscriptionManagement";
import FeedbackManagement from "./FeedbackManagement";
import { useUser } from "@/contexts/UserContext";

interface Payment {
  id: string;
  studentName: string;
  email: string;
  domain: string;
  sessionId: string;
  amount: number;
  status: string;
  paymentDate: string;
  title:string;
}

interface Mentor {
  id: string;
  email: string;
  name: string;
  domain: string;
  rating: number;
  sessions: number;
}

interface Student {
  id: string;
  name: string;
  email: string;
  domain: string;
  sessionsAttended: number;
  performance: number;
}

interface LiveSession {
  id: string;
  mentorName: string;
  mentorId: string;
  subject: string;
  domain: string;
  studentsAttending: number;
  feedbackGiven: boolean;
}

interface UpcomingSession {
  id: string;
  mentorName: string;
  mentorId: string;
  subject: string;
  domain: string;
  studentsRegistered: number;
  canDelete: boolean;
}

interface EndedSession {
  id: string;
  mentorName: string;
  mentorId: string;
  subject: string;
  domain: string;
  studentsAttended: number;
  feedbackCollected: boolean;
}

interface SessionManagementProps {
  liveSessions: LiveSession[];
  upcomingSessions: UpcomingSession[];
  endedSessions: EndedSession[];
}


interface AdminDashboardContentProps {
  socialLinks: {
    instagram: string;
    twitter: string;
    youtube: string;
  };
  onSocialLinksChange: (platform: string, value: string) => void;
  onSocialLinksSave: () => void;
}
interface EducationNews {
  id: string;
  title: string;
  source: string;
  excerpt: string;
  date: string;
  url: string;
}
// interface AnalyticsData {
//   date: string;
//   students: number;
//   views: number;
//   subscriptions: number;
// }

// interface ChartProps {
//   data: AnalyticsData[];
// }


const AdminDashboardContent = ({ 
  socialLinks, 
  onSocialLinksChange, 
  onSocialLinksSave 
}: AdminDashboardContentProps) => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab');
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
const [liveSessions, setLiveSessions] = useState<LiveSession[]>([]);
const [upcomingSessions, setUpcomingSessions] = useState<UpcomingSession[]>([]);
const [endedSessions, setEndedSessions] = useState<EndedSession[]>([]);
const [educationNews, setEducationNews] = useState<EducationNews[]>([]);


  const [dashboardStats, setDashboardStats] = useState({
    mentorCount: 0,
    studentCount: 0,
    liveSessionCount: 0,
    upcomingSessionCount: 0,
  });

//   useEffect(() => {
//   const fetchStats = async () => {
//     try {
//       const [studentsRes, mentorsRes, sessionsRes] = await Promise.all([
//         axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/students`),
//         axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/mentors`),
//         axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/sessions`)
//       ]);

//       const students = studentsRes.data || [];
//       const mentorsRaw = mentorsRes.data || [];
//       const sessions = sessionsRes.data || [];

//       // Process mentors to match Mentor interface
//       const processedMentors: Mentor[] = mentorsRaw.map((mentor: any) => ({
//         id: mentor._id,
//         name: mentor.userId?.name || "Unknown",
//         domain: mentor.domain || "General",
//         rating: mentor.rating || 0,
//         sessions: mentor.sessions?.length || 0,
//       }));

//       // Count sessions
//       const liveSessions = sessions.filter(s => s.status?.toLowerCase() === "live");
//       const upcomingSessions = sessions.filter(s => s.status?.toLowerCase() === "upcoming");

//       setMentors(processedMentors);

//       setDashboardStats({
//         mentorCount: processedMentors.length,
//         studentCount: students.length,
//         liveSessionCount: liveSessions.length,
//         upcomingSessionCount: upcomingSessions.length
//       });
//     } catch (err) {
//       console.error("Failed to fetch dashboard stats:", err);
//     }
//   };

//   fetchStats();
// }, []);


 

const fetchEducationNews = async () => {
  try {
    const API_KEY = import.meta.env.VITE_NEWSAPI_KEY;
    const res = await axios.get(
      `https://newsapi.org/v2/top-headlines?category=education&language=en&pageSize=12&apiKey=${API_KEY}`
    );

    const articles = res.data.articles || [];
    const newsData: EducationNews[] = articles.map((article: any, index: number) => ({
      id: `${index + 1}`,
      title: article.title || "No Title",
      source: article.source.name || "Unknown Source",
      excerpt: article.description || "No Description Available",
      date: new Date(article.publishedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      url: article.url,
    }));

    setEducationNews(newsData);
  } catch (err) {
    console.error("Failed to fetch education news:", err);
  }
};


useEffect(() => {
  fetchEducationNews();
}, []);


//  useEffect(() => {
//     // For now, using mock data - replace with API call when backend is ready
//     const mockNews: EducationNews[] = [
//       {
//         id: "1",
//         title: "AI in Education Set to Transform Learning Experiences",
//         source: "EdTech Magazine",
//         excerpt: "New AI-powered tools are helping educators personalize learning at scale, with early adopters seeing significant improvements in student engagement.",
//         date: "November 15, 2023",
//         url: "https://example.com/ai-education-transform"
//       },
//       {
//         id: "2",
//         title: "Global Online Learning Market Projected to Reach $350 Billion by 2025",
//         source: "Education Times",
//         excerpt: "The rapid growth of online education platforms continues as more students seek flexible learning options post-pandemic.",
//         date: "November 12, 2023",
//         url: "https://example.com/online-learning-growth"
//       },
//       {
//         id: "3",
//         title: "New Government Policy Expands Funding for STEM Education Initiatives",
//         source: "Education Policy Review",
//         excerpt: "The recently passed bill allocates $2 billion to improve STEM education access in underserved communities nationwide.",
//         date: "November 10, 2023",
//         url: "https://example.com/stem-funding-expansion"
//       },
//       {
//         id: "2",
//         title: "Global Online Learning Market Projected to Reach $350 Billion by 2025",
//         source: "Education Times",
//         excerpt: "The rapid growth of online education platforms continues as more students seek flexible learning options post-pandemic.",
//         date: "November 12, 2023",
//         url: "https://example.com/online-learning-growth"
//       },{
//         id: "2",
//         title: "Global Online Learning Market Projected to Reach $350 Billion by 2025",
//         source: "Education Times",
//         excerpt: "The rapid growth of online education platforms continues as more students seek flexible learning options post-pandemic.",
//         date: "November 12, 2023",
//         url: "https://example.com/online-learning-growth"
//       },{
//         id: "2",
//         title: "Global Online Learning Market Projected to Reach $350 Billion by 2025",
//         source: "Education Times",
//         excerpt: "The rapid growth of online education platforms continues as more students seek flexible learning options post-pandemic.",
//         date: "November 12, 2023",
//         url: "https://example.com/online-learning-growth"
//       },{
//         id: "2",
//         title: "Global Online Learning Market Projected to Reach $350 Billion by 2025",
//         source: "Education Times",
//         excerpt: "The rapid growth of online education platforms continues as more students seek flexible learning options post-pandemic.",
//         date: "November 12, 2023",
//         url: "https://example.com/online-learning-growth"
//       },{
//         id: "2",
//         title: "Global Online Learning Market Projected to Reach $350 Billion by 2025",
//         source: "Education Times",
//         excerpt: "The rapid growth of online education platforms continues as more students seek flexible learning options post-pandemic.",
//         date: "November 12, 2023",
//         url: "https://example.com/online-learning-growth"
//       },


//     ];
    
//     setEducationNews(mockNews);
//   }, []);
 
const { user, loading } = useUser(); 
const navigate = useNavigate();

useEffect(() => {
  console.log("user is ", user);

  if (!loading && (!user || user.role !== "Admin")) {
    navigate("/admin-login");
  }
}, [user, loading, navigate]); 


useEffect(() => {
  const fetchStats = async () => {
    try {
      const [studentsRes, mentorsRes, sessionsRes,paymentsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/students`),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/mentors`),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/sessions`),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/payments`)
      ]);

      const studentsRaw = studentsRes.data || [];
      const mentorsRaw = mentorsRes.data || [];
      const sessionsRaw = sessionsRes.data || [];
      const paymentsRaw = paymentsRes.data || [];

      // Process Students
      const processedStudents: Student[] = studentsRaw.map((s: any) => ({
        id: s._id,
        name: s.userId?.name,
        email: s.userId?.email,
        domain: s.domain || "General",
        sessionsAttended: s.attendedSessions?.length || 0,
        performance: s.performance || 0,
      }));
      setStudents(processedStudents);
      console.log("Processed Students:", processedStudents);

      // Process Mentors
      const processedMentors: Mentor[] = mentorsRaw.map((m: any) => ({
        id: m._id,
        email: m.userId?.email || "Unknown",
        name: m.userId?.name || "Unknown",
        domain: m.domain || "General",
        rating: m.rating || 0,
        sessions: m.sessions?.length || 0,
      }));
      setMentors(processedMentors);

      // Process Sessions
      const live: LiveSession[] = [];
      const upcoming: UpcomingSession[] = [];
      const ended: EndedSession[] = [];

      sessionsRaw.forEach((s: any) => {
        const base = {
          id: s._id,
          mentorName: s.mentorName || "Unknown",
          mentorId: s.mentorId || "",
          subject: s.subject || "General",
          domain: s.domain || "General"
        };

        if (s.status?.toLowerCase() === "live") {
          live.push({
            ...base,
            studentsAttending: s.AttendStudents?.length || 0,
            feedbackGiven: false // or derive from s.feedbacks?.length
          });
        } else if (s.status?.toLowerCase() === "upcoming") {
          upcoming.push({
            ...base,
            studentsRegistered: s.bookedStudents?.length || 0,
            canDelete: true // set conditionally if needed
          });
        } else if (s.status?.toLowerCase() === "completed") {
          ended.push({
            ...base,
            studentsAttended: s.AttendStudents?.length || 0,
            feedbackCollected: s.feedbacks?.length > 0
          });
        }
      });

      setLiveSessions(live);
      setUpcomingSessions(upcoming);
      setEndedSessions(ended);

      const processedPayments: Payment[] = paymentsRaw.map((p: any) => ({
        id: p._id|| "N/A",
        studentName: p.studentId?.userId.name || "Unknown",
        email: p.studentId?.userId.email||"unknown",
        domain: p.domain || "General",
        sessionId: p.sessionId?._id || "Deleted",
        amount: p.amount || 0,
        status: p.status || "pending",
        title: p.sessionId?.title || "Unknown",
        paymentDate: new Date(p.timestamp).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
      }));
      setPayments(processedPayments);

      setDashboardStats({
        mentorCount: processedMentors.length,
        studentCount: processedStudents.length,
        liveSessionCount: live.length,
        upcomingSessionCount: upcoming.length
      });

    } catch (err) {
      console.error("Failed to fetch dashboard stats:", err);
    }
  };

  fetchStats();
}, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {!activeTab && (
        <>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
            <p className="text-gray-600">Manage all aspects of the MentxTv platform.</p>
          </div>

          <DashboardStats 
            mentorCount={dashboardStats.mentorCount}
            studentCount={dashboardStats.studentCount}
            liveSessionCount={dashboardStats.liveSessionCount}
            upcomingSessionCount={dashboardStats.upcomingSessionCount}
          />
          
         
          {/* Educational News Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Education News & Updates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {educationNews.map((news) => (
                <EducationNewsCard
                  key={news.id}
                  title={news.title}
                  source={news.source}
                  excerpt={news.excerpt}
                  date={news.date}
                  url={news.url}
                />
              ))}
            </div>
          </div>
        </>
      )}
      
      
      
      {/* {!activeTab && (
        <>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
            <p className="text-gray-600">Manage all aspects of the MentxTv platform.</p>
          </div>

          <DashboardStats 
      mentorCount={dashboardStats.mentorCount}
      studentCount={dashboardStats.studentCount}
      liveSessionCount={dashboardStats.liveSessionCount}
      upcomingSessionCount={dashboardStats.upcomingSessionCount}
    />
        </>
      )} */}

      {activeTab === 'mentors' && (
        <>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Mentor Details</h2>
            <p className="text-gray-600">Manage and monitor mentor performance.</p>
          </div>
          <MentorManagement mentors={mentors} />
        </>
      )}

      {activeTab === 'students' && (
        <>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Student Details</h2>
            <p className="text-gray-600">Manage student accounts and track performance.</p>
          </div>
          <StudentManagement students={students} />
        </>
      )}

      {activeTab === 'sessions' && (
        <>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Session Details</h2>
            <p className="text-gray-600">Monitor live, upcoming, and ended sessions.</p>
          </div>
          <SessionManagement 
            liveSessions={liveSessions}
            upcomingSessions={upcomingSessions}
            endedSessions={endedSessions}
          />
        </>
      )}

      {activeTab === 'content' && (
        <>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Content Management</h2>
            <p className="text-gray-600">Manage website content and pages.</p>
          </div>
          <ContentManagement />
        </>
      )}

      {activeTab === 'payments' && (
        <>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Details</h2>
            <p className="text-gray-600">Monitor student payments and transaction history.</p>
          </div>
          <PaymentManagement payments={payments} />
        </>
      )}

      {activeTab === 'social' && (
        <>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Social Media</h2>
            <p className="text-gray-600">Manage social media links and settings.</p>
          </div>
          <SocialMediaSettings 
            // links={socialLinks}
            // onInputChange={onSocialLinksChange}
            // onSave={onSocialLinksSave}
          />
        </>
      )}
      {activeTab === 'blog' && (
  <>
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Blog Management</h2>
      <p className="text-gray-600">Create, edit, and manage blog posts.</p>
    </div>
    <BlogManagement />
  </>
)}
  
  {activeTab === 'tests' && (
  <>
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Test Management</h2>
      <p className="text-gray-600">Create and manage test questions and portal content.</p>
    </div>
    <TestManagement />
  </>
)}

{
  activeTab === 'subscribe' && (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Subscription Management</h2>
        <p className="text-gray-600">Manage subscription plans and user subscriptions.</p>
      </div>
      <SubscriptionManagement/>
    </>
  )
}

{
  activeTab === 'feedback' && (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Feedback Management</h2>
        <p className="text-gray-600">Manage testimonials and feedback from students and mentors.</p>
      </div>
      <FeedbackManagement/>
      </>)
}


    </main>
  );
};
interface EducationNewsCardProps {
  title: string;
  source: string;
  excerpt: string;
  date: string;
  url: string;
}

const EducationNewsCard = ({ title, source, excerpt, date, url }: EducationNewsCardProps) => {
  const handleReadMore = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h4>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>{source}</span>
          <span>{date}</span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
        <button
          onClick={handleReadMore}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
        >
          Read More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default AdminDashboardContent;
 