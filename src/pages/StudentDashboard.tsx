import { useUser } from "@/contexts/UserContext";
import StudentHeader from "@/components/student/StudentHeader";
import StudentStats from "@/components/student/StudentStats";
import StudentSessions from "@/components/student/StudentSessions";
import StudentQuickActions from "@/components/student/StudentQuickActions";
import StudentMentors from "@/components/student/StudentMentors";

const StudentDashboard = () => {
  const { user } = useUser();
  const studentName = user?.name || "Student";

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back, {studentName.split(" ")[0]}!
          </h2>
          <p className="text-gray-600">
            Track your learning progress and manage your booked sessions.
          </p>
        </div>

        {/* Stats Cards */}
        <StudentStats />

        {/* Sessions */}
        <StudentSessions />
        
        <StudentMentors/>

        {/* Quick Actions */}
        <div className="mt-8">
          <StudentQuickActions />
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
