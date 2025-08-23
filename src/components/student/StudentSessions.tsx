// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { RadioIcon, Video } from "lucide-react";
// import { useUser } from "@/contexts/UserContext";

// const StudentSessions = () => {
//   const { bookedSessions } = useUser();

//   // Filter sessions based on status
//   const pastSessions = bookedSessions.filter(
//     (session) => session.status === "completed"
//   );
//   const upcomingSessions = bookedSessions.filter(
//     (session) => session.status === "upcoming"
//   );
//   const liveSessions = bookedSessions.filter(
//     (session) => session.status === "live"
//   );

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//       {/* Live Sessions */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg flex items-center gap-2">
//             <RadioIcon className="h-5 w-5 text-red-600" />
//             Live Sessions
//           </CardTitle>
//           <p className="text-sm text-gray-600">Currently ongoing sessions</p>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {liveSessions.length > 0 ? (
//               liveSessions.map((session, index) => (
//                 <div
//                   key={index}
//                   className="p-4 border rounded-lg bg-red-50 border-red-200"
//                 >
//                   <div className="space-y-3">
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <p className="font-medium">{session.title}</p>
//                         <p className="text-sm text-gray-600">
//                           {session.mentor}
//                         </p>
//                       </div>
//                       <div className="text-gray-600 text-sm">
//                         <p>{session.date}</p>
//                         <p>{session.time}</p>
//                         <Badge
//                           variant="outline"
//                           className="text-red-600 border-red-600 mt-1"
//                         >
//                           LIVE
//                         </Badge>
//                       </div>
//                     </div>
//                     <Button
//                       className="w-full bg-red-600 hover:bg-red-700 flex items-center gap-2"
//                       onClick={() => window.open(`/live-session/123456`, "_blank")}
//                     >
//                       <Video size={16} />
//                       Join Live Session
//                     </Button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center py-4">No live sessions</p>
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Upcoming Sessions */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
//           <p className="text-sm text-gray-600">Your scheduled sessions</p>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {upcomingSessions.length > 0 ? (
//               upcomingSessions.map((session, index) => (
//                 <div key={index} className="p-4 border rounded-lg">
//                   <div className="space-y-3">
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <p className="font-medium">{session.title}</p>
//                         <p className="text-sm text-gray-600">
//                           {session.mentor}
//                         </p>
//                       </div>
//                       <div className="text-gray-600 text-sm">
//                         <p>{session.date}</p>
//                         <p>{session.time}</p>
//                       </div>
//                     </div>
//                     {session.paymentStatus === "paid" && (
//                       <Button
//                         className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2"
//                         onClick={() => window.open("/live-session", "_blank")}
//                       >
//                         <Video size={16} />
//                         Open Meeting
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center py-4">
//                 No upcoming sessions
//               </p>
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Past Sessions */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg">Past Sessions</CardTitle>
//           <p className="text-sm text-gray-600">Your completed sessions</p>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {pastSessions.length > 0 ? (
//               pastSessions.map((session, index) => (
//                 <div key={index} className="p-4 border rounded-lg">
//                   <div className="grid grid-cols-3 gap-4">
//                     <div>
//                       <p className="font-medium">{session.title}</p>
//                       <p className="text-sm text-gray-600">{session.mentor}</p>
//                     </div>
//                     <div className="text-gray-600 text-sm">{session.date}</div>
//                     <div>
//                       <Badge
//                         variant="outline"
//                         className="text-green-600 border-green-600"
//                       >
//                         Completed
//                       </Badge>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center py-4">
//                 No completed sessions yet
//               </p>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default StudentSessions;



import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioIcon, Video } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
// import { useRouter } from 'next/router';
import { useNavigate } from "react-router-dom";


const StudentSessions = () => {
  // const router = useRouter();
  const navigate = useNavigate();
  const { user } = useUser();
  const [sessions, setSessions] = useState([]);
  const [liveSessions, setLiveSessions] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [pastSessions, setPastSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/students/${user.email}`);
        const enrolled = res.data.enrolledSessions || [];

        const now = new Date();

        const live = [];
        const upcoming = [];
        const past = [];

        for (const session of enrolled) {
          const sessionDate = new Date(session.date);
          if (session.status === "LIVE") {
            live.push(session);
          } else if (session.status === "upcoming") {
            upcoming.push(session);
          } else {
            past.push({ ...session, status: "completed" });
          }
        }

        setSessions(enrolled);
        setLiveSessions(live);
        setUpcomingSessions(upcoming);
        setPastSessions(past);
      } catch (err) {
        console.error("Failed to fetch student sessions", err);
      }
    };

    if (user?.email) fetchSessions();
  }, [user]);

  const studentId = user?.id // Assuming studentId is the user's ID or email
//   const handleJoinLiveSession = async (sessionId: string) => {
//   try {
//     // Update student's attended session by sending the sessionId
//     await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/students/${studentId}`, {
//       attendedSessions: sessionId // or update your payload accordingly
//     });

//     // Open the live session page
//     window.open(`/live-session/${sessionId}`, "_blank");
//   } catch (error) {
//     console.error("Failed to update attendance or open session:", error);
//   }
// };

const handleJoinLiveSession = async (sessionId: string) => {
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    // 1. Fetch student data
    const studentRes = await axios.get(`${baseUrl}/api/students/${user.email}`);
    const student = studentRes.data;

    // 2. Append sessionId if it's not already in attendedSessions
    const currentSessions = student.attendedSessions || [];
    const updatedSessions = currentSessions.includes(sessionId)
      ? currentSessions
      : [...currentSessions, sessionId];

    // 3. Update student (entire object with updated sessions)
    await axios.put(`${baseUrl}/api/students/${studentId}`, {
      ...student,
      attendedSessions: updatedSessions
    });

    // 4. Fetch session data
    const sessionRes = await axios.get(`${baseUrl}/api/sessions/${sessionId}`);
    const session = sessionRes.data;

    // 5. Append studentId if not already in session.attendedStudents
    const currentAttendees = session.attendedStudents || [];
    const updatedAttendees = currentAttendees.includes(studentId)
      ? currentAttendees
      : [...currentAttendees, studentId];

    // 6. Update session
    await axios.put(`${baseUrl}/api/sessions/${sessionId}`, {
      ...session,
      attendedStudents: updatedAttendees
    });

    // 7. Redirect to Jitsi Meet
    // const jitsiRoomUrl = `https://meet.jit.si/${sessionId}`;
    // window.open(jitsiRoomUrl, '_blank');
    navigate(`/live-session/${sessionId}`);
    
  } catch (error) {
    console.error('Failed to update student/session or join:', error);
  }
};




  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      {/* Live Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <RadioIcon className="h-5 w-5 text-red-600" />
            Live Sessions
          </CardTitle>
          <p className="text-sm text-gray-600">Currently ongoing sessions</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {liveSessions.length > 0 ? (
              liveSessions.map((session, index) => (
                <div key={index} className="p-4 border rounded-lg bg-red-50 border-red-200">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">{session.title}</p>
                        <p className="text-sm text-gray-600">{session.mentor}</p>
                      </div>
                      <div className="text-gray-600 text-sm">
                        <p>{new Date(session.date).toDateString()}</p>
                        <p>{session.time}</p>
                        <Badge variant="outline" className="text-red-600 border-red-600 mt-1">
                          LIVE
                        </Badge>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 flex items-center gap-2"
                      onClick={() => handleJoinLiveSession(session._id)}
                    >
                      <Video size={16} />
                      Join Live Session
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No live sessions</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
          <p className="text-sm text-gray-600">Your scheduled sessions</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map((session, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">{session.title}</p>
                        <p className="text-sm text-gray-600">{session.mentor}</p>
                      </div>
                      <div className="text-gray-600 text-sm">
                        <p>{new Date(session.date).toDateString()}</p>
                        <p>{session.time}</p>
                      </div>
                    </div>
                    {session.paymentStatus === "paid" && (
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2"
                        onClick={() => window.open(`/live-session/${session._id}`, "_blank")}
                      >
                        <Video size={16} />
                        Open Meeting
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming sessions</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Past Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Past Sessions</CardTitle>
          <p className="text-sm text-gray-600">Your completed sessions</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pastSessions.length > 0 ? (
              pastSessions.map((session, index) => (
                <div key={index} className="p-4 border rounded-lg" onClick={() => window.open(`/feedback/${session._id}`, "_blank")}>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="font-medium">{session.title}</p>
                      <p className="text-sm text-gray-600">{session.mentor}</p>
                    </div>
                    <div className="text-gray-600 text-sm">{new Date(session.date).toDateString()}</div>
                    <div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Completed
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No completed sessions yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentSessions;
