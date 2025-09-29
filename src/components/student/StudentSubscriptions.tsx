// import { Link } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Calendar, Star, Clock } from "lucide-react";

// // Mock data - replace with real data from backend
// const mockSubscriptions = [
//   {
//     id: "sub1",
//     mentorId: "M001",
//     mentorName: "Dr. Sarah Johnson",
//     mentorImage: "/placeholder-mentor.jpg",
//     mentorDomain: "JEE",
//     mentorRating: 4.8,
//     plan: "1 month",
//     startDate: "2024-01-15",
//     duration: "1 month",
//     expiryDate: "2024-02-15",
//     status: "Active",
//     price: "₹500"
//   },
//   {
//     id: "sub2",
//     mentorId: "M002",
//     mentorName: "Prof. Raj Kumar",
//     mentorImage: "/placeholder-mentor.jpg",
//     mentorDomain: "NEET",
//     mentorRating: 4.9,
//     plan: "6 months",
//     startDate: "2024-01-10",
//     duration: "1 month",
//     expiryDate: "2024-02-10",
//     status: "Expiring Soon",
//     price: "₹15,000"
//   }
// ];

// const StudentSubscriptions = () => {
//   const renderStars = (rating: number) =>
//     Array.from({ length: 5 }, (_, i) => (
//       <Star
//         key={i}
//         size={12}
//         className={i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
//       />
//     ));

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h3 className="text-lg font-semibold text-foreground">My Subscriptions</h3>
//         <Badge variant="outline" className="text-xs">
//           {mockSubscriptions.length} Active
//         </Badge>
//       </div>

//       {mockSubscriptions.length === 0 ? (
//         <Card>
//           <CardContent className="flex flex-col items-center justify-center py-8">
//             <div className="text-muted-foreground text-center">
//               <h4 className="text-base font-medium mb-1">No subscriptions yet</h4>
//               <p className="text-xs">Subscribe to mentors to start your learning journey</p>
//             </div>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {mockSubscriptions.map((subscription) => (
//             <Card key={subscription.id} className="hover:shadow-md transition-shadow text-sm">
//               <CardHeader className="pb-2">
//                 <div className="flex items-center gap-2">
//                   <Avatar className="h-10 w-10">
//                     <AvatarImage src={subscription.mentorImage} />
//                     <AvatarFallback className="bg-primary/10 text-primary text-xs">
//                       {subscription.mentorName.split(' ').map(n => n[0]).join('')}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1">
//                     <CardTitle className="text-sm">{subscription.mentorName}</CardTitle>
//                     <div className="flex items-center gap-1 mt-1">
//                       <div className="flex">{renderStars(subscription.mentorRating)}</div>
//                       <span className="text-[10px] text-muted-foreground">({subscription.mentorRating})</span>
//                       <Badge variant="secondary" className="text-[10px]">{subscription.mentorDomain}</Badge>
//                     </div>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <span className="text-xs font-medium text-foreground">{subscription.plan} Plan</span>
//                   <Badge
//                     variant={subscription.status === "Active" ? "default" : "destructive"}
//                     className="text-[10px]"
//                   >
//                     {subscription.status}
//                   </Badge>
//                 </div>

//                 <div className="space-y-1 text-xs text-muted-foreground">
//                   <div className="flex items-center gap-1">
//                     <Calendar size={12} />
//                     <span>Started: {new Date(subscription.startDate).toLocaleDateString()}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Clock size={12} />
//                     <span>Expires: {new Date(subscription.expiryDate).toLocaleDateString()}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span>Duration: {subscription.duration}</span>
//                     <span className="font-medium text-foreground">{subscription.price}</span>
//                   </div>
//                 </div>

//                 <div className="flex gap-2 pt-1">
//                   <Button variant="outline" size="sm" className="flex-1 text-xs">
//                     View Details
//                   </Button>
//                   <Button variant="outline" size="sm" className="flex-1 text-xs">
//                     Manage Plan
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentSubscriptions;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Star, Clock, Video } from "lucide-react";

interface Subscription {
  _id: string;
  mentorId: {
    _id: string;
    domain?: string;
    ratings?: number;
    profilePic?: string;
    userId: {
      _id: string;
      name: string;
      email: string;
    };
  };
  plan: string;
  endDate: string;
  status: string; // active, expired, etc.
  amount: number;
  createdAt: string;
}

interface Appointment {
  _id: string;
  mentorId: {
    _id: string;
  };
  studentId: string;
  status: "pending" | "accepted" | "rejected";
}

const StudentSubscriptions = ({ userId }: { userId: string }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch subscriptions
        const subRes = await axios.get(`${baseURL}/api/subscriptions/student/${userId}`);
        setSubscriptions(subRes.data || []);

        // Fetch student appointments
        const appRes = await axios.get(`${baseURL}/api/appointments/students/${userId}`);
        setAppointments(appRes.data || []);
      } catch (err) {
        console.error("Failed to fetch data", err);
        setError("Unable to load subscriptions or appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, baseURL]);

  const renderStars = (rating: number = 0) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));

  const handleDeleteSession = async (appointmentId: string) => {
  try {
    await axios.delete(`${baseURL}/api/appointments/${appointmentId}`);
    // Remove from local appointments state
    setAppointments(appointments.filter((app) => app._id !== appointmentId));
  } catch (err) {
    console.error("Failed to delete session", err);
  }
};


  const getSessionStatus = (mentorId: string) => {
    console.log("Checking session status for mentorId:", mentorId, appointments);
    const app = appointments.find((a) => a.mentorId._id === mentorId);
    if (!app) return "none";
    console.log("Found appointment:", app);
    return app.status;
  };
  const getSessionId = (mentorId: string) => {
    console.log("Checking session status for mentorId:", mentorId, appointments);
    const app = appointments.find((a) => a.mentorId._id === mentorId);
    if (!app) return "none";
    console.log("Found appointment:", app);
    return app._id;
  };



  if (loading) return <p>Loading subscriptions...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">My Subscriptions</h3>
        <Badge variant="outline" className="text-xs">
          {subscriptions.filter((sub) => sub.status === "active").length} Active
        </Badge>
      </div>

      {subscriptions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="text-muted-foreground text-center">
              <h4 className="text-base font-medium mb-1">No subscriptions yet</h4>
              <p className="text-xs">Subscribe to mentors to start your learning journey</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {subscriptions.map((subscription) => {
            const mentor = subscription.mentorId;
            const sessionStatus = getSessionStatus(mentor._id);
            const sessionId = getSessionId(mentor._id);
            const renderSessionButton = () => {
              switch (sessionStatus) {
                case "pending":
                  return (
                    <Button variant="outline" size="sm" className="flex-1 text-xs cursor-not-allowed">
                      Request Pending
                    </Button>
                  );
                case "accepted":
                  return (
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1 text-xs flex items-center justify-center gap-1"
                      onClick={() =>
                              window.open(
                                `/live-session/${sessionId}`,
                                "_blank"
                              )
                            }
                    >
                      <Video size={14} /> Join
                    </Button>
                  );
                case "rejected":
                  return (
                    <Button
  variant="destructive"
  size="sm"
  className="flex-1 text-xs"
  onClick={() => {
    console.log("Deleting rejected session for mentorId:", mentor._id);
    const app = appointments.find((a) => a.mentorId._id === mentor._id && a.status === "rejected");
    if (app) handleDeleteSession(app._id);
    navigate(`/appointments/${mentor.userId?.email}`);
  }}
>
  Book Another Session
</Button>
                  );
                default:
                  return (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => navigate(`/appointments/${mentor.userId?.email}`)}
                    >
                      Request Mentor
                    </Button>
                  );
              }
            };

            return (
              <Card key={subscription._id} className="hover:shadow-md transition-shadow text-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={mentor.profilePic} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {mentor.userId?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-sm">{mentor.userId?.name}</CardTitle>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex">{renderStars(mentor.ratings)}</div>
                        <span className="text-[10px] text-muted-foreground">
                          ({mentor.ratings || 0})
                        </span>
                        {mentor.domain && (
                          <Badge variant="secondary" className="text-[10px]">
                            {mentor.domain}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">{subscription.plan} Plan</span>
                    <Badge
                      variant={subscription.status === "active" ? "default" : "destructive"}
                      className="text-[10px]"
                    >
                      {subscription.status}
                    </Badge>
                  </div>

                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>Started: {new Date(subscription.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>Expires: {new Date(subscription.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Duration: {subscription.plan}</span>
                      <span className="font-medium text-foreground">₹{subscription.amount}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">{renderSessionButton()}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentSubscriptions;
