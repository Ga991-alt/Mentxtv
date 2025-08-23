
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Calendar, Users, DollarSign, RadioIcon } from "lucide-react";
// import { useUser } from "@/contexts/UserContext";

// const StudentStats = () => {
//   const { bookedSessions } = useUser();

//   // Filter sessions based on status
//   const pastSessions = bookedSessions.filter(session => session.status === 'completed');
//   const upcomingSessions = bookedSessions.filter(session => session.status === 'upcoming');
//   const liveSessions = bookedSessions.filter(session => session.status === 'live');

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium text-gray-600">Sessions Enrolled</CardTitle>
//           <Calendar className="h-4 w-4 text-blue-600" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">{pastSessions.length}</div>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium text-gray-600">Upcoming Attended</CardTitle>
//           <Users className="h-4 w-4 text-green-600" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">{upcomingSessions.length}</div>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium text-gray-600">Live Sessions</CardTitle>
//           <RadioIcon className="h-4 w-4 text-red-600" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">{liveSessions.length}</div>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium text-gray-600">Total Spent</CardTitle>
//           <DollarSign className="h-4 w-4 text-purple-600" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-3xl font-bold">₹{bookedSessions.reduce((total, session) => total + session.price, 0)}</div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default StudentStats;


import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, DollarSign, RadioIcon } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import axios from "axios";

const StudentStats = () => {
  const { user: Userdata } = useUser();
  const [studentData, setStudentData] = useState<any>(null);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/students/${Userdata.email}`)
        const data = await res.data;
        setStudentData(data);
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch student data:", err);
      }
    };

    if (Userdata) fetchStudentInfo();
  }, [Userdata]);

  const enrolledCount = studentData?.enrolledSessions?.length || 0;
  const attendedCount = studentData?.attendedSessions?.length || 0;
  const liveCount = studentData?.enrolledSessions?.filter((s: any) => s.status === "LIVE")?.length || 0;
  const totalSpent = studentData?.totalSpent || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Sessions Enrolled</CardTitle>
          <Calendar className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{enrolledCount}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Sessions Attended</CardTitle>
          <Users className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{attendedCount}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Live Sessions</CardTitle>
          <RadioIcon className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{liveCount}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Spent</CardTitle>
          <DollarSign className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">₹{totalSpent}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentStats;

