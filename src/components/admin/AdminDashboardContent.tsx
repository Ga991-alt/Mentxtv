import { useSearchParams } from "react-router-dom";
import DashboardStats from "@/components/admin/DashboardStats";
import MentorManagement from "@/components/admin/MentorManagement";
import StudentManagement from "@/components/admin/StudentManagement";
import SessionManagement from "@/components/admin/SessionManagement";
import PaymentManagement from "@/components/admin/PaymentManagement";
import SocialMediaSettings from "@/components/admin/SocialMediaSettings";
import ContentManagement from "@/components/admin/ContentManagement";
import { dashboardStats, mentors, students, sessionData, payments } from "@/data/adminMockData";
import { useEffect, useState } from "react";
import axios from "axios";

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
        name: s.userId.name,
        email: s.userId.email,
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
        </>
      )}

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
    </main>
  );
};

export default AdminDashboardContent;