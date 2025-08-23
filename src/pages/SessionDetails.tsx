
// import { useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { ArrowLeft, Calendar, Clock, Users, Star, User } from "lucide-react";

// const SessionDetails = () => {
//   const { sessionId } = useParams();

//   // Sample data - replace with actual data based on sessionId
//   const sessionData = {
//     'L001': {
//       id: 'L001',
//       title: 'JEE Advanced Strategy',
//       mentorName: 'Dr. Arjun Mehta',
//       subject: 'JEE',
//       date: 'Jan 25, 2024',
//       time: '10:00 AM - 12:00 PM',
//       duration: '2 hours',
//       status: 'LIVE',
//       studentsAttending: 8,
//       attendedStudents: [
//         {
//           id: 'S001',
//           name: 'Ankit Sharma',
//           email: 'ankit@example.com',
//           avatar: null,
//           feedback: {
//             rating: 5,
//             comment: 'Excellent session! The strategies shared were very helpful for JEE Advanced preparation.'
//           }
//         },
//         {
//           id: 'S002',
//           name: 'Priya Singh',
//           email: 'priya@example.com',
//           avatar: null,
//           feedback: {
//             rating: 4,
//             comment: 'Good session with practical tips. Would like more practice problems next time.'
//           }
//         },
//         {
//           id: 'S003',
//           name: 'Raj Patel',
//           email: 'raj@example.com',
//           avatar: null,
//           feedback: {
//             rating: 5,
//             comment: 'Amazing insights into problem-solving techniques. Thank you!'
//           }
//         },
//         {
//           id: 'S004',
//           name: 'Sneha Gupta',
//           email: 'sneha@example.com',
//           avatar: null,
//           feedback: {
//             rating: 4,
//             comment: 'Very informative session. The mentor explained concepts clearly.'
//           }
//         },
//         {
//           id: 'S005',
//           name: 'Rohit Kumar',
//           email: 'rohit@example.com',
//           avatar: null,
//           feedback: {
//             rating: 5,
//             comment: 'Best session so far! Looking forward to more such sessions.'
//           }
//         },
//         {
//           id: 'S006',
//           name: 'Kavya Reddy',
//           email: 'kavya@example.com',
//           avatar: null,
//           feedback: {
//             rating: 4,
//             comment: 'Good content delivery. Would appreciate more interactive elements.'
//           }
//         }
//       ]
//     }
//   };

//   const session = sessionData[sessionId as keyof typeof sessionData];

//   if (!session) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <Card>
//           <CardContent className="p-6">
//             <p className="text-gray-600">Session not found</p>
//             <Link to="/mentor-dashboard">
//               <Button className="mt-4">Back to Dashboard</Button>
//             </Link>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   const averageRating = session.attendedStudents.reduce((sum, student) => sum + student.feedback.rating, 0) / session.attendedStudents.length;

//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <Star
//         key={i}
//         size={16}
//         className={i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
//       />
//     ));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center gap-4">
//               <Link to="/mentor-dashboard">
//                 <Button variant="outline" size="sm" className="flex items-center gap-2">
//                   <ArrowLeft size={16} />
//                   Back to Dashboard
//                 </Button>
//               </Link>
//               <h1 className="text-xl font-semibold text-gray-900">Session Details</h1>
//             </div>
//             <Badge 
//               className={`${
//                 session.status === 'LIVE' ? 'bg-red-100 text-red-800' :
//                 session.status === 'UPCOMING' ? 'bg-blue-100 text-blue-800' :
//                 'bg-gray-100 text-gray-800'
//               }`}
//             >
//               {session.status}
//             </Badge>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Session Info */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//           <div className="lg:col-span-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-2xl">{session.title}</CardTitle>
//                 <p className="text-gray-600">by {session.mentorName}</p>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <Calendar size={16} />
//                     <span>{session.date}</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <Clock size={16} />
//                     <span>{session.time}</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <Users size={16} />
//                     <span>{session.studentsAttending} students attended</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <Star size={16} />
//                     <span>Subject: {session.subject}</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Session Stats */}
//           <div className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Session Statistics</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-blue-600">{session.studentsAttending}</div>
//                   <p className="text-sm text-gray-600">Students Attended</p>
//                 </div>
//                 <div className="text-center">
//                   <div className="flex items-center justify-center gap-1 mb-1">
//                     {renderStars(averageRating)}
//                   </div>
//                   <div className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}</div>
//                   <p className="text-sm text-gray-600">Average Rating</p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Students and Feedback */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Students & Feedback</CardTitle>
//             <p className="text-gray-600">Students who attended this session and their feedback</p>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-6">
//               {session.attendedStudents.map((student) => (
//                 <div key={student.id} className="border rounded-lg p-6">
//                   <div className="flex items-start gap-4">
//                     <Avatar className="h-12 w-12">
//                       <AvatarImage src={student.avatar || undefined} />
//                       <AvatarFallback className="bg-blue-100 text-blue-600">
//                         <User size={20} />
//                       </AvatarFallback>
//                     </Avatar>
                    
//                     <div className="flex-1">
//                       <div className="flex items-center justify-between mb-2">
//                         <div>
//                           <h4 className="font-semibold text-lg">{student.name}</h4>
//                           <p className="text-gray-600 text-sm">{student.email}</p>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           {renderStars(student.feedback.rating)}
//                           <span className="ml-2 font-medium">{student.feedback.rating}/5</span>
//                         </div>
//                       </div>
                      
//                       <div className="bg-gray-50 rounded-lg p-4">
//                         <p className="text-gray-700 italic">"{student.feedback.comment}"</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// };

// export default SessionDetails;


import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Calendar, Clock, Users, Star, User } from "lucide-react";

const SessionDetails = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch session data from API
  useEffect(() => {
    const fetchSession = async () => {
      try {
        console.log(`Fetching session data for ID: ${sessionId}`);
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/sessions/${sessionId}`);
        console.log("Session data fetched:", res.data);
        setSession(res.data);
      } catch (error) {
        console.error("Failed to fetch session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading session details...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600">Session not found</p>
            <Link to="/mentor-dashboard">
              <Button className="mt-4">Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const averageRating = session.feedbacks?.length
    ? session.feedbacks.reduce((sum: number, f: any) => sum + f.rating, 0) / session.feedbacks.length
    : 0;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/mentor-dashboard">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Session Details</h1>
            </div>
            <Badge
              className={`${
                session.status === 'LIVE' ? 'bg-red-100 text-red-800' :
                session.status === 'UPCOMING' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}
            >
              {session.status}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Session Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{session.title}</CardTitle>
                <p className="text-gray-600">by {session.mentorName}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} />
                    <span>{new Date(session.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    <span>{session.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users size={16} />
                    <span>{session.feedbacks?.length ?? 0} students gave feedback</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star size={16} />
                    <span>Subject: {session.subject}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Session Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Session Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{session.feedbacks?.length ?? 0}</div>
                  <p className="text-sm text-gray-600">Feedbacks Received</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {renderStars(averageRating)}
                  </div>
                  <div className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}</div>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Students and Feedback */}
        <Card>
          <CardHeader>
            <CardTitle>Students & Feedback</CardTitle>
            <p className="text-gray-600">Students who attended this session and their feedback</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {session.feedbacks?.map((fb: any) => (
  <div key={fb._id} className="border rounded-lg p-6">
    <div className="flex items-start gap-4">
      <Avatar className="h-12 w-12">
        <AvatarImage src={fb.studentId?.profilePic || undefined} />
        <AvatarFallback className="bg-blue-100 text-blue-600">
          <User size={20} />
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="font-semibold text-lg">{fb.studentId?.userId?.name || "Anonymous"}</h4>
            <p className="text-gray-600 text-sm">{fb.studentId?.userId?.email}</p>
          </div>
          <div className="flex items-center gap-1">
            {renderStars(fb.rating)}
            <span className="ml-2 font-medium">{fb.rating}/5</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700 italic">"{fb.feedback}"</p>
        </div>
      </div>
    </div>
  </div>
))}

            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SessionDetails;
