// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Star } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

// interface Session {
//   _id: string;
//   title: string;
//   bookedStudents: string[];
//   feedbacks: string[];
// }

// interface MentorDetails {
//   userId: {
//     name: string;
//     email: string;
//   };
//   bio: string;
//   profilePic: string;
//   education: string;
//   subjects: string[];
//   sessions: Session[];
// }

// const ViewMentor = () => {
//   const { email } = useParams<{ email: string }>();
//   const [mentor, setMentor] = useState<MentorDetails | null>(null);

//   useEffect(() => {
//     const fetchMentor = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/mentors/${email}`);
//         setMentor(res.data);
//       } catch (error) {
//         console.error("Failed to fetch mentor data", error);
//       }
//     };

//     if (email) fetchMentor();
//   }, [email]);

//   const getInitials = (name: string) =>
//     name
//       .split(" ")
//       .map((part) => part[0])
//       .join("")
//       .toUpperCase();

//   const avgRating = 4.5; // Placeholder — you can calculate based on feedback later

//   return (
//     <div className="space-y-6 p-6">
//       {/* Profile Section */}
//       <Card>
//         <CardContent className="flex flex-col md:flex-row gap-8 items-center md:items-start p-6">
//             <div><div className="flex flex-col md:flex-row gap-8 items-center md:items-start p-6 ">
//           <div className="relative w-32 h-32  ">
//             <Avatar className="w-full h-full border-4 border-blue-600">
//               <AvatarImage src={mentor?.profilePic} alt={mentor?.userId.name} />
//               <AvatarFallback>{getInitials(mentor?.userId.name || "")}</AvatarFallback>
//             </Avatar>
//           </div>
//           <div className="flex-1 space-y-2">
//             <h2 className="text-2xl font-semibold">{mentor?.userId.name}</h2>
//             <p className="text-muted-foreground text-sm">{mentor?.userId.email}</p>
//             <p className="text-gray-700 text-sm">{mentor?.bio}</p>
//           </div></div>
//           <div className="flex gap-4 mt-4 flex-wrap">
//               <div className="bg-gray-100 px-4 py-2 rounded-md text-sm">
//                 <strong>Total Sessions:</strong> {mentor?.sessions.length}
//               </div>
//               <div className="bg-yellow-100 px-4 py-2 rounded-md text-sm flex items-center gap-2">
//                 <Star size={16} className="text-yellow-500 fill-yellow-400" />
//                 <span>{avgRating} / 5.0</span>
//               </div>
//               <div className="bg-blue-50 px-4 py-2 rounded-md text-sm">
//                 <strong>Education:</strong> {mentor?.education}
//               </div>
//             </div>

//             {mentor?.subjects?.length > 0 && (
//               <div className="mt-3 flex flex-wrap gap-2">
//                 {mentor.subjects.map((subj, idx) => (
//                   <Badge key={idx} variant="outline">
//                     {subj}
//                   </Badge>
//                 ))}
//               </div>
//             )}
//             </div>
//         </CardContent>
//       </Card>

//       {/* Sessions Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Sessions Conducted</CardTitle>
//         </CardHeader>
//         <CardContent className="p-0">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Session Name</TableHead>
//                 <TableHead>Session ID</TableHead>
//                 <TableHead>Booked Students</TableHead>
//                 <TableHead>Feedbacks</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {mentor?.sessions.map((session) => (
//                 <TableRow key={session._id}>
//                   <TableCell className="font-medium">{session.title}</TableCell>
//                   <TableCell>{session._id}</TableCell>
//                   <TableCell>{session.bookedStudents.length}</TableCell>
//                   <TableCell>{session.feedbacks.length}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ViewMentor;



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

// Function to calculate average rating
const calculateOverallRating = (sessions: any[]) => {
  if (!sessions || sessions.length === 0) return 0;

  let totalFeedback = 0;
  let feedbackCount = 0;

  sessions.forEach((session) => {
    if (session?.feedbacks && session.feedbacks.length > 0) {
      session.feedbacks.forEach((feedback: any) => {
        totalFeedback += feedback.rating;
        feedbackCount++;
      });
    }
  });

  if (feedbackCount === 0) return 0;
  return totalFeedback / feedbackCount;
};

interface Feedback {
  rating: number;        // rating given (1–5)
  feedback: string;      // written feedback
  studentId: string;     // student who submitted
  submittedAt: string;   // ISO timestamp
}

interface Session {
  _id: string;
  title: string;
  subject: string;
  date: string;
  time: string;
  description?: string;
  duration: string;
  type: string;
  price: number;
  mentorName: string;
  status: "completed" | "upcoming" | "cancelled";
  seats: number;
  bookedStudents: string[];
  feedbacks: Feedback[];
}



interface MentorDetails {
  userId: {
    name: string;
    email: string;
  };
  bio: string;
  profilePic: string;
  education: string;
  subjects: string[];
  sessions: Session[];
}

const ViewMentor = () => {
  const { email } = useParams<{ email: string }>();
  const [mentor, setMentor] = useState<MentorDetails | null>(null);
  const [overallRating, setOverallRating] = useState<number>(0);
  const [allFeedbacks, setAllFeedbacks] = useState<any[]>([]);
const navigate = useNavigate();
  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/mentors/${email}`);
        setMentor(res.data);

        const avg = calculateOverallRating(res.data.sessions);
        setOverallRating(avg);

        // Flatten all feedbacks into one array
        const feedbackList: any[] = [];
        res.data.sessions.forEach((session: Session) => {
          session.feedbacks.forEach((fb) => {
            feedbackList.push({ ...fb, sessionTitle: session.title });
          });
        });
        setAllFeedbacks(feedbackList);
      } catch (error) {
        console.error("Failed to fetch mentor data", error);
      }
    };

    if (email) fetchMentor();
  }, [email]);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  return (
    <div className="space-y-8 p-6 max-w-6xl mx-auto">
      {/* Profile Section */}
      <Card className="shadow-lg border">
        <CardContent className="flex flex-col md:flex-row gap-8 items-center md:items-start p-8">
          <div className="relative w-32 h-32">
            <Avatar className="w-full h-full border-4 border-blue-600">
              <AvatarImage src={mentor?.profilePic} alt={mentor?.userId.name} />
              <AvatarFallback>{getInitials(mentor?.userId.name || "")}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{mentor?.userId.name}</h2>
              <p className="text-muted-foreground">{mentor?.userId.email}</p>
              <p className="text-gray-600 mt-2">{mentor?.bio}</p>
            </div>
             {mentor?.subjects?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {mentor.subjects.map((subj, idx) => (
                  <Badge key={idx} variant="secondary" className="px-3 py-1 text-sm">
                    {subj}
                  </Badge>
                ))}
              </div>
            )}
          </div>

        </CardContent>
        <div className="px-8 pb-6">
          <div className="flex gap-4 flex-wrap">
              <div className="bg-gray-100 px-5 py-3 rounded-lg text-sm shadow-sm">
                <strong>Total Sessions:</strong> {mentor?.sessions.length}
              </div>
              <div className="bg-yellow-50 px-5 py-3 rounded-lg text-sm flex items-center gap-2 shadow-sm">
                <Star size={16} className="text-yellow-500 fill-yellow-400" />
                <span className="font-medium">{overallRating.toFixed(1)} / 5.0</span>
              </div>
              <div className="bg-blue-50 px-5 py-3 rounded-lg text-sm shadow-sm">
                <strong>Education:</strong> {mentor?.education}
              </div>
            </div>
            
        </div>
      </Card>

      {/* Sessions Table */}
      {/* <Card className="shadow-md border">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">Sessions Conducted</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-700">Session Name</TableHead>
                <TableHead className="font-semibold text-gray-700">Session ID</TableHead>
                <TableHead className="font-semibold text-gray-700">Booked Students</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mentor?.sessions.map((session, idx) => (
                <TableRow key={session._id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}>
                  <TableCell className="font-medium text-gray-800">{session.title}</TableCell>
                  <TableCell className="text-gray-600">{session._id}</TableCell>
                  <TableCell className="text-gray-600">{session.bookedStudents.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card> */}

      <Card className="shadow-md border">
  <CardHeader>
    <CardTitle className="text-xl font-semibold text-gray-800">
      Sessions Conducted
    </CardTitle>
  </CardHeader>
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-5">
    {mentor?.sessions.map((session) => (
      <Card
        key={session._id}
        className="shadow-sm border rounded-xl p-5 hover:shadow-md transition bg-white cursor-pointer"
        onClick={() => navigate(`/session-details/${session._id}`)}
      >
        <div className="flex justify-between items-start">
          {/* Left side - Main Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{session.title}</h3>
            <p className="text-sm text-gray-500">{session.subject}</p>

            {/* Date only */}
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Date:</span>{" "}
              {new Date(session.date).toLocaleDateString()}
            </p>

            {/* Duration */}
            <p className="text-sm text-gray-600">
              <span className="font-medium">Duration:</span> {session.duration}
            </p>
          </div>

          {/* Right side - Status & Enrolled */}
          <div className="text-right space-y-2">
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                session.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : session.status === "upcoming"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {session.status}
            </span>

            <p className="text-sm text-gray-700">
              <span className="font-medium">{session.bookedStudents.length}</span>{" "}
              enrolled
            </p>
          </div>
        </div>
      </Card>
    ))}
  </div>
</Card>



      {/* Reviews Section */}
      {/* Reviews Section */}
<Card className="shadow-md border">
  <CardHeader>
    <CardTitle className="text-xl font-semibold text-gray-800">
      Reviews & Ratings
    </CardTitle>
  </CardHeader>
  <CardContent className="space-y-8">
    {/* Average Rating */}
   <div className="flex flex-col md:flex-row items-start gap-8">
  {/* Left: Overall Rating */}
  <div className="text-center space-y-2 w-full md:w-1/3">
  <h2 className="text-4xl font-bold">{overallRating.toFixed(1)}</h2>

  {/* ⭐ Star Rating with Partial Fill */}
  <div className="flex justify-center">
    {Array.from({ length: 5 }).map((_, i) => {
      const filled = overallRating - i; // how much of this star should be filled
      const fillPercent = Math.max(0, Math.min(1, filled)) * 100; // clamp 0–100%

      return (
        <div key={i} className="relative w-6 h-6">
          {/* Gray background star */}
          <Star className="absolute inset-0 text-gray-300 w-6 h-6" />

          {/* Yellow filled star with mask */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${fillPercent}%` }}
          >
            <Star className="text-yellow-500 fill-yellow-400 w-6 h-6" />
          </div>
        </div>
      );
    })}
  </div>

  <p className="text-gray-500 text-sm">
    Based on {allFeedbacks.length} reviews
  </p>
</div>


  {/* Right: Horizontal Bars */}
  <div className="space-y-2 w-full md:w-2/3">
    {[5, 4, 3, 2, 1].map((star) => {
      const count = allFeedbacks.filter((fb) => fb.rating === star).length;
      const percentage =
        allFeedbacks.length > 0 ? (count / allFeedbacks.length) * 100 : 0;

      // pick color based on star
      const barColor =
        star === 5
          ? "bg-green-700"
          : star === 4
          ? "bg-green-400"
          : star === 3
          ? "bg-yellow-400"
          : star === 2
          ? "bg-orange-400"
          : "bg-red-500";

      return (
        <div key={star} className="flex items-center gap-3">
          {/* star label */}
          <span className="w-8 text-sm font-medium text-yellow-400">
            {star}★
          </span>

          {/* progress bar */}
          <div className="h-2 flex-1 bg-gray-200 rounded">
            <div
              className={`h-2 rounded ${barColor}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          {/* count */}
          <span className="w-10 text-sm text-gray-600">{count}</span>
        </div>
      );
    })}
  </div>
</div>


    {/* Reviews List */}
    <div className="space-y-4">
      {allFeedbacks.map((fb, idx) => (
        <div key={idx} className="flex gap-3 border-b pb-3">
          <Avatar>
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <p className="font-semibold">Student</p>
              <span className="text-xs text-gray-500">
                {new Date(fb.submittedAt).toDateString()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < fb.rating
                      ? "text-yellow-500 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600 text-sm mt-1">{fb.feedback}</p>
            <p className="text-xs text-blue-500 mt-1 italic">
              For session: {fb.sessionTitle}
            </p>
          </div>
        </div>
      ))}
      {allFeedbacks.length === 0 && (
        <p className="text-center text-gray-500">No reviews yet.</p>
      )}
    </div>
  </CardContent>
</Card>

    </div>
  );
};

export default ViewMentor;
