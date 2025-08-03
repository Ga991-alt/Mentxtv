
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LogOut, Calendar, Users, Star, Plus, List, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "@/contexts/UserContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig"; // make sure your firebase.js exports storage
// import axios from "axios";
const MentorDashboard = () => {
  const [mentorImage, setMentorImage] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const { user } = useUser();
  const [mentorData, setMentorData] = useState<any>(null);

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/mentors/${user.email}`
        );
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

  const isWithinFiveMinutes = (isoDateStr: string, timeStr: string): boolean => {
    const now = new Date();
    const sessionDate = new Date(isoDateStr);
    const datePart = sessionDate.toISOString().split("T")[0];
    const dateTimeString = `${datePart} ${timeStr}`;
    const sessionTime = new Date(dateTimeString);
    const diffInMs = sessionTime.getTime() - now.getTime();
    return diffInMs <= 5 * 60 * 1000 && diffInMs >= -60 * 60 * 1000;
  };

  const startMeeting = async (sessionId: string) => {
    try {
      await axios.put(
       `${import.meta.env.VITE_API_BASE_URL}/api/sessions/${sessionId}`,
        { status: "LIVE" }
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
        { status: "completed" }
      );
      const updatedSessions = postedSessions.map((s: any) =>
        s._id === sessionId ? { ...s, status: "completed" } : s
      );
      setMentorData((prev: any) => ({ ...prev, sessions: updatedSessions }));
    } catch (err) {
      console.error("Failed to end meeting", err);
    }
  };

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => setMentorImage(e.target?.result as string);
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageClick = () => {
    setIsZoomed(true);
  };

  const handleCloseZoom = () => {
    setIsZoomed(false);
  };


  
  const [image, setImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file || !mentorData) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "mentor_profile"); // your Cloudinary preset
  formData.append("cloud_name", "dp4ubhr1q");   // your cloud name (optional)

  try {
    // Upload to Cloudinary
    const response = await fetch("https://api.cloudinary.com/v1_1/dp4ubhr1q/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!data.secure_url) throw new Error("Upload failed");

    const imageUrl = data.secure_url;
    setMentorImage(imageUrl);

    // Update profilePic in DB
    await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/mentors/${mentorData._id}`, {
      profilePic: imageUrl,
    });

    setMentorData({ ...mentorData, profilePic: imageUrl });
  } catch (err) {
    console.error("Failed to upload image to Cloudinary", err);
  }
};



const calculateOverallRating = (sessions) => {
  // Function to calculate the average feedback rating for each session
  const calculateSessionAverageRating = (session) => {
    if (!session?.feedbacks || session.feedbacks.length === 0) return 0; // No feedback, return 0

    const totalFeedback = session.feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
    return totalFeedback / session.feedbacks.length;
  };

  // If there are no sessions, return 0
  if (sessions.length === 0) return 0;

  // Calculate the total ratings of all sessions
  const totalRatings = sessions.reduce((acc, session) => {
    const sessionRating = calculateSessionAverageRating(session);
    return acc + sessionRating;
  }, 0);

  // Return the overall average rating
  return totalRatings / sessions.length;
};




  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">
                Mentor Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Go to dashboard
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
                {calculateOverallRating(postedSessions) || 0}
                <Star className="h-6 w-6 text-yellow-400 fill-current" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column: Quick Actions + Profile */}
          <div className="flex flex-col space-y-8 flex-1 lg:max-w-sm">
            {/* Mentor Profile */}
            <Card className="flex flex-col h-full">
              <CardHeader className="text-center">
                <Avatar className="h-32 w-32 mx-auto mb-4 cursor-pointer" onClick={handleImageClick}>
                  <AvatarImage src={mentorImage || undefined} />
                  <AvatarFallback className="bg-green-100 text-green-600 text-3xl">
                    {mentorName
                      .split(" ")
                      .slice(-2)
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <label className="bg-green-600 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-green-700 text-sm mx-auto block text-center">
                  <Camera size={16} className="inline-block mr-1" />
                  Upload
                  <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

                </label>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-y-4 gap-x-2">
                {/* Full Name */}
                <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                <p className="text-sm font-bold text-gray-800 col-span-2">
                  : {mentorData?.userId?.name || "N/A"}
                </p>

                {/* Subjects */}
                <h3 className="text-sm font-medium text-gray-500">Subjects</h3>
                <p className="text-sm font-bold text-gray-800 col-span-2">
                  : {(mentorData?.subjects || []).join(", ") || "Not provided"}
                </p>

                {/* Email */}
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-sm font-bold text-gray-800 col-span-2">
                  : {mentorData?.userId?.email || "N/A"}
                </p>

                {/* Education */}
                <h3 className="text-sm font-medium text-gray-500">Education</h3>
                <p className="text-sm font-bold text-gray-800 col-span-2">
                  : {mentorData?.educationalBackground || "Not provided"}
                </p>
              </CardContent>

            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <p className="text-sm text-gray-600">Manage your mentoring activities</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/post-session">
                  <Button className="w-full bg-gray-900 hover:bg-gray-800 flex items-center gap-2">
                    <Plus size={16} />
                    Post New Session
                  </Button>
                </Link>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <List size={16} />
                  View All Sessions
                </Button>
              </CardContent>
            </Card>

            
          </div>

          {/* Right column: Posted Sessions */}
          <div className="flex-1 flex flex-col">
            <Card className="flex flex-col flex-grow">
              <CardHeader>
                <CardTitle>All Posted Sessions</CardTitle>
              </CardHeader>
              {/* <CardContent className="space-y-4 flex-grow">
                {postedSessions.length > 0 ? (
                  postedSessions.map((session: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{session.title}</h4>
                        <p className="text-sm text-gray-600">{session.date}</p>
                      </div>
                      <Link to={`/session-details/${session._id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">You haven't posted any sessions yet.</p>
                )}
              </CardContent> */}
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

      {/* Zoomed Image Overlay */}
      {isZoomed && mentorImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={handleCloseZoom}>
          <img src={mentorImage} alt="Zoomed Profile" className="max-h-[90vh] max-w-[90vw] object-contain" />
        </div>
      )}
    </div>
  );
};

export default MentorDashboard;
