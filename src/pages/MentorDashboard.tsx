
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { LogOut, Calendar, Users, Star, Plus, List, Camera } from "lucide-react";
// import { Link } from "react-router-dom";
// // import { , useState } from "react";
// import axios from "axios";
// import { useUser } from "@/contexts/UserContext";

// const MentorDashboard = () => {
//   const [mentorImage, setMentorImage] = useState<string | null>(null);
//   // const mentorName = "Dr. Arjun Mehta";
//   const { user } = useUser(); // ensure email is available here
//   const [mentorData, setMentorData] = useState(null);

//   useEffect(() => {
//     const fetchMentor = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/mentors/${user.email}`);
//         console.log("Fetched mentor data:", res.data);
//         setMentorData(res.data);
//         if (mentorData?.profilePic) {
//           setMentorImage(mentorData.profilePic);
//         }
//       } catch (error) {
//         console.error("Failed to fetch mentor:", error);
//       }
//     };

//     if (user?.email) fetchMentor();
//   }, [user]);

//   const isWithinFiveMinutes = (isoDateStr: string, timeStr: string): boolean => {
//   const now = new Date();

//   // Combine ISO date and human-readable time into one Date object
//   const sessionDate = new Date(isoDateStr); // "2025-07-05T00:00:00.000Z"

//   // Extract YYYY-MM-DD part from ISO string
//   const datePart = sessionDate.toISOString().split("T")[0];

//   // Combine it with the provided time string
//   const dateTimeString = `${datePart} ${timeStr}`;

//   // Create a Date object for the session using local time interpretation
//   const sessionTime = new Date(dateTimeString);

//   const diffInMs = sessionTime.getTime() - now.getTime();

//   return diffInMs <= 5 * 60 * 1000 && diffInMs >= -60 * 60 * 1000; // within 5 min before and 60 min after
// };


//   const startMeeting = async (sessionId: string) => {
//   try {
//     await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/sessions/${sessionId}`, {
//       status: "LIVE",
//     });

//     const updatedSessions = postedSessions.map((s: any) =>
//       s._id === sessionId ? { ...s, status: "LIVE" } : s
//     );

//     setMentorData((prev: any) => ({
//       ...prev,
//       sessions: updatedSessions,
//     }));
//   } catch (err) {
//     console.error("Failed to start meeting", err);
//   }
// };


// const endMeeting = async (sessionId: string) => {
//   try {
//     await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/sessions/${sessionId}`, {
//       status: "completed",
//     });

//     const updatedSessions = postedSessions.map((s: any) =>
//       s._id === sessionId ? { ...s, status: "completed" } : s
//     );

//     setMentorData((prev: any) => ({
//       ...prev,
//       sessions: updatedSessions,
//     }));
//   } catch (err) {
//     console.error("Failed to end meeting", err);
//   }
// };


//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setMentorImage(e.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
// const mentorName = mentorData?.userId?.name || "Loading...";
// // const Image = mentorData?.profilePic;
// // if(Image){
// //   setMentorImage(Image);
// // }
// const postedSessions = mentorData?.sessions || [];
// console.log("Posted Sessions:", postedSessions);
//   // const postedSessions = [
//   //   {
//   //     title: "JEE Advanced Strategy",
//   //     date: "Jan 25, 2024",
//   //     time: "10:00 AM",
//   //     enrolled: "6/10 enrolled",
//   //     students: "6 students",
//   //     status: "LIVE"
//   //   },
//   //   {
//   //     title: "Physics Problem Solving",
//   //     date: "Jan 27, 2024",
//   //     time: "2:00 PM",
//   //     enrolled: "8/15 enrolled",
//   //     students: "8 students",
//   //     status: "SLOTS LEFT"
//   //   },
//   //   {
//   //     title: "Math Concepts Deep Dive",
//   //     date: "Jan 30, 2024",
//   //     time: "4:00 PM",
//   //     enrolled: "20/20 enrolled",
//   //     students: "20 students",
//   //     status: "FULL"
//   //   }
//   // ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center gap-4">
//               {/* Image Upload */}
//               <div className="relative">
//                 <Avatar className="h-12 w-12">
//                   <AvatarImage src={mentorImage || undefined} />
//                   <AvatarFallback className="bg-green-100 text-green-600">
//                     {mentorName.split(' ').slice(-2).map(n => n[0]).join('')}
//                   </AvatarFallback>
//                 </Avatar>
//                 <label className="absolute -bottom-1 -right-1 bg-green-600 text-white p-1 rounded-full cursor-pointer hover:bg-green-700">
//                   <Camera size={12} />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="hidden"
//                   />
//                 </label>
//               </div>
//               <h1 className="text-xl font-semibold text-gray-900">Mentor Dashboard</h1>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src={mentorImage || undefined} />
//                   <AvatarFallback className="bg-green-100 text-green-600 text-sm">
//                     {mentorName.split(' ').slice(-2).map(n => n[0]).join('')}
//                   </AvatarFallback>
//                 </Avatar>
//                 <span className="text-sm text-gray-700">{mentorName}</span>
//               </div>
//               <Link to="/">
//                 <Button variant="outline" size="sm" className="flex items-center gap-2">
//                   <LogOut size={16} />
//                   Logout
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Welcome Section */}
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back, {mentorName}</h2>
//           <p className="text-gray-600">Manage your sessions and connect with students.</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-gray-600">Total Sessions</CardTitle>
//               <Calendar className="h-4 w-4 text-blue-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold">{mentorData?.sessions.length}</div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-gray-600">Active Students</CardTitle>
//               <Users className="h-4 w-4 text-green-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold">156</div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-gray-600">Rating</CardTitle>
//               <Star className="h-4 w-4 text-yellow-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold flex items-center gap-1 pl-2">
//                 {mentorData?.ratings||0}
//                 <Star className="h-6 w-6 text-yellow-400 fill-current" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Quick Actions */}
//           <div className="lg:col-span-1">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Quick Actions</CardTitle>
//                 <p className="text-sm text-gray-600">Manage your mentoring activities</p>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <Link to="/post-session">
//                   <Button className="w-full bg-gray-900 hover:bg-gray-800 flex items-center gap-2">
//                     <Plus size={16} />
//                     Post New Session
//                   </Button>
//                 </Link>
//                 <Button variant="outline" className="w-full flex items-center gap-2">
//                   <List size={16} />
//                   View All Sessions
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>

//           {/* All Posted Sessions */}
//           <div className="lg:col-span-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle>All Posted Sessions</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {postedSessions.map((session, index) => (
//                   <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-2">
//                         <h4 className="font-medium">{session.title|| "unknown"}</h4>
//                         <Badge 
//                           variant="outline" 
//                           className={`text-xs ${
//                             session.status === 'LIVE' ? 'text-red-600 border-red-600' :
//                             session.status === 'SLOTS LEFT' ? 'text-green-600 border-green-600' :
//                             'text-gray-600 border-gray-600'
//                           }`}
//                         >
//                           {session.status}
//                         </Badge>
//                       </div>
//                       <div className="flex items-center gap-4 text-sm text-gray-600">
//                         <div className="flex items-center gap-1">
//                           <Calendar size={14} />
//                           {session.date} • {session.time}
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Users size={14} />
//                           {session.bookedStudents.length|| 0} enrolled
//                         </div>
//                         {/* <div className="flex items-center gap-1">
//                           <Users size={14} />
//                           {session.students}
//                         </div> */}
//                       </div>
//                     </div>
//                     <Link to={`/session-details/${session._id}`}>
//                       <Button variant="outline" size="sm">
//                         View Details
//                       </Button>
//                     </Link>
//                     {/* <Link to={`/live-session/${session._id}`}> */}
//                     <div>
//                       {session.status === "LIVE" ? (
//   <>
//     <Button
//       className="bg-red-600 hover:bg-red-700 text-white mr-2"
//       onClick={() => window.open(`/mentor-live-session/${session._id}`, "_blank")}
//       size="sm"
//     >
//       Return to Meeting
//     </Button>
//     <Button
//       variant="outline"
//       className="text-red-600 border-red-600 hover:bg-red-50"
//       onClick={() => endMeeting(session._id)}
//       size="sm"
//     >
//       End Meeting
//     </Button>
//   </>
// ) : session.status !== "completed" ?(
//   <Button
//     variant="outline"
//     className={`w-full bg-green-600 hover:bg-green-700 flex items-center gap-2 text-white`}
//     onClick={() => startMeeting(session._id)}
//     disabled={!isWithinFiveMinutes(session.date, session.time)}
//     size="sm"
//   >
//     Start Meeting
//   </Button>):(<></>
// )}

//                       </div>
//                     {/* </Link> */}
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default MentorDashboard;





import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  LogOut,
  Calendar,
  Users,
  Star,
  Plus,
  List,
  Camera,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "@/contexts/UserContext";

const MentorDashboard = () => {
  const [mentorImage, setMentorImage] = useState<string | null>(null);
  const { user } = useUser();
  const [mentorData, setMentorData] = useState<any>(null);

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/mentors/${user.email}`);
        setMentorData(res.data);
        setMentorImage(res.data?.profilePic || null);
      } catch (error) {
        console.error("Failed to fetch mentor:", error);
      }
    };

    if (user?.email) fetchMentor();
  }, [user]);

  const postedSessions = mentorData?.sessions || [];

  const mentorName = mentorData?.userId?.name || "Loading...";

  // const isWithinFiveMinutes = (
  //   isoDateStr: string,
  //   timeStr: string
  // ): boolean => {
  //   const now = new Date();
  //   const sessionDate = new Date(isoDateStr);
  //   const datePart = sessionDate.toISOString().split("T")[0];
  //   const dateTimeString = ${datePart} ${timeStr};
  //   const sessionTime = new Date(dateTimeString);
  //   const diffInMs = sessionTime.getTime() - now.getTime();
  //   return diffInMs <= 5 * 60 * 1000 && diffInMs >= -60 * 60 * 1000;
  // };

  const isWithinFiveMinutes = (isoDateStr: string, timeStr: string): boolean => {
  const now = new Date();

  // Combine ISO date and human-readable time into one Date object
  const sessionDate = new Date(isoDateStr); // "2025-07-05T00:00:00.000Z"

  // Extract YYYY-MM-DD part from ISO string
  const datePart = sessionDate.toISOString().split("T")[0];

  // Combine it with the provided time string
  const dateTimeString = `${datePart} ${timeStr}`;

  // Create a Date object for the session using local time interpretation
  const sessionTime = new Date(dateTimeString);

  const diffInMs = sessionTime.getTime() - now.getTime();

  return diffInMs <= 5 * 60 * 1000 && diffInMs >= -60 * 60 * 1000; // within 5 min before and 60 min after 
  };



  const startMeeting = async (sessionId: string) => {
    try {
      await axios.put(`
        ${import.meta.env.VITE_API_BASE_URL}/api/sessions/${sessionId}`,
        {
          status: "LIVE",
        }
      );
      const updatedSessions = postedSessions.map((s: any) =>
        s._id === sessionId ? { ...s, status: "LIVE" } : s
      );
      setMentorData((prev: any) => ({ ...prev, sessions: updatedSessions }));
    } catch (err) {
      console.error("Failed to start meeting", err);
    }
  };

  const endMeeting = async (sessionId: string) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/sessions/${sessionId}`,
        {
          status: "completed",
        }
      );
      const updatedSessions = postedSessions.map((s: any) =>
        s._id === sessionId ? { ...s, status: "completed" } : s
      );
      setMentorData((prev: any) => ({ ...prev, sessions: updatedSessions }));
    } catch (err) {
      console.error("Failed to end meeting", err);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMentorImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={mentorImage || undefined} />
                  <AvatarFallback className="bg-green-100 text-green-600">
                    {mentorName
                      .split(" ")
                      .slice(-2)
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <label className="absolute -bottom-1 -right-1 bg-green-600 text-white p-1 rounded-full cursor-pointer hover:bg-green-700">
                  <Camera size={12} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Mentor Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={mentorImage || undefined} />
                  <AvatarFallback className="bg-green-100 text-green-600 text-sm">
                    {mentorName
                      .split(" ")
                      .slice(-2)
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-700">{mentorName}</span>
              </div>
              <Link to="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back, {mentorName}
          </h2>
          <p className="text-gray-600">
            Manage your sessions and connect with students.
          </p>
        </div>

        {/* Mentor Profile Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700">Full Name</h3>
                <p className="text-gray-900">
                  {mentorData?.userId?.name || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Email</h3>
                <p className="text-gray-900">
                  {mentorData?.userId?.email || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Education</h3>
                <p className="text-gray-900">
                  {mentorData?.educationalBackground || "Not provided"}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Subjects</h3>
                <p className="text-gray-900">
                  {(mentorData?.subjects || []).join(", ") || "Not provided"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Sessions
              </CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mentorData?.sessions.length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Students
              </CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">156</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Rating
              </CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center gap-1 pl-2">
                {mentorData?.ratings || 0}
                <Star className="h-6 w-6 text-yellow-400 fill-current" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <p className="text-sm text-gray-600">
                  Manage your mentoring activities
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/post-session">
                  <Button className="w-full bg-gray-900 hover:bg-gray-800 flex items-center gap-2">
                    <Plus size={16} />
                    Post New Session
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <List size={16} />
                  View All Sessions
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Posted Sessions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>All Posted Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {postedSessions.map((session: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">
                          {session.title || "unknown"}
                        </h4>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            session.status === "LIVE"
                              ? "text-red-600 border-red-600"
                              : session.status === "SLOTS LEFT"
                              ? "text-green-600 border-green-600"
                              : "text-gray-600 border-gray-600"
                          }`}
                        >
                          {session.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {session.date} • {session.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          {session.bookedStudents?.length || 0} enrolled
                        </div>
                      </div>
                    </div>
                    <Link to={`/session-details/${session._id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    <div>
                      {session.status === "LIVE" ? (
                        <>
                          <Button
                            className="bg-red-600 hover:bg-red-700 text-white mr-2"
                            onClick={() =>
                              window.open(
                               `/mentor-live-session/${session._id}`,
                                "_blank"
                              )
                            }
                            size="sm"
                          >
                            Return to Meeting
                          </Button>
                          <Button
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => endMeeting(session._id)}
                            size="sm"
                          >
                            End Meeting
                          </Button>
                        </>
                      ) : session.status !== "completed" ? (
                        <Button
                          variant="outline"
                          className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2 text-white"
                          onClick={() => startMeeting(session._id)}
                          disabled={
                            !isWithinFiveMinutes(session.date, session.time)
                          }
                          size="sm"
                        >
                          Start Meeting
                        </Button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorDashboard;
