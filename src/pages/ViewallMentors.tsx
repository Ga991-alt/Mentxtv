import Navigation from "@/components/Navigation";
import { useUser } from "@/contexts/UserContext";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SessionFeedback {
  rating: number;
}

interface SessionData {
  feedbacks?: SessionFeedback[];
}

interface Mentor {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  bio: string;
  subjects: string[];
  education: string;
  expertise: string[];
  profilePic: string;
  domin: string;
  sessions: string[]; 
  reviews: number;
}

interface Subscription {
  _id: string;
  mentorId: Mentor;
  status: string;
}

const MentorCard: React.FC<{ mentor: Mentor; studentId: string }> = ({ mentor, studentId }) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const fetchSessionsAndCalcRating = async () => {
      try {
        if (!mentor.sessions || mentor.sessions.length === 0) {
          setRating(0);
          return;
        }

        let totalFeedback = 0;
        let feedbackCount = 0;

        const sessionPromises = mentor.sessions.map((sessionId) =>
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/sessions/${sessionId}`).then((res) =>
            res.json()
          )
        );

        const sessionData: SessionData[] = await Promise.all(sessionPromises);

        sessionData.forEach((session) => {
          if (session?.feedbacks?.length) {
            session.feedbacks.forEach((feedback) => {
              totalFeedback += feedback.rating;
              feedbackCount++;
            });
          }
        });

        setRating(feedbackCount > 0 ? totalFeedback / feedbackCount : 0);
      } catch (err) {
        console.error("Error calculating mentor rating:", err);
        setRating(0);
      }
    };

    fetchSessionsAndCalcRating();
  }, [mentor.sessions]);

  // 🔹 Check if the student has already subscribed to this mentor
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        console.log("Fetching subscriptions for studentId:", studentId);
        if (!studentId) return;

        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/subscriptions/student/${studentId}`
        );

        if (!res.ok) throw new Error("Failed to fetch subscriptions");

        const subs: Subscription[] = await res.json();
        console.log("Fetched subscriptions:", subs);
        const subscribed = subs.some((sub) => {
  const result = sub.mentorId._id === mentor._id && (sub.status === "active" || sub.status === "pending");
  console.log(
    "Checking subscription for mentor:",
    sub.mentorId._id,
    "Result:",
    result
  );
  return result;  // ✅ important
});

        setIsSubscribed(subscribed);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, [studentId, mentor._id]);

  return (
    <div className="w-72 rounded-2xl shadow-lg overflow-hidden bg-white">
      <div className="h-32">
        <div className="h-24 bg-[#03b1fc] w-full flex justify-center">
          <img
            src={mentor.profilePic || "/default-avatar.png"}
            alt={mentor.userId?.name}
            className="w-28 h-28 rounded-full border-8 border-white mt-8"
          />
        </div>
      </div>
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold text-gray-800">{mentor.userId?.name}</h2>
        <p className="text-gray-500 text-sm">{mentor.domin || "Mentor"}</p>

        <div className="flex justify-around my-4">
          <div>
            <p className="font-bold text-gray-800 text-lg">{mentor.sessions?.length || 0}</p>
            <span className="text-gray-500 text-sm">Sessions</span>
          </div>
          <div>
            <p className="font-bold text-gray-800 flex items-center text-lg">
              {rating.toFixed(1)} <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            </p>
            <span className="text-gray-500 text-sm">Rating</span>
          </div>
        </div>

        <div className="flex justify-around gap-4 mx-2">
          <button
            className={`px-4 py-1 w-1/2 rounded-2xl text-base transition ${
              isSubscribed
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#03b1fc] text-white hover:bg-[#038cfc]"
            }`}
            onClick={() => !isSubscribed && navigate(`/subscribe/${mentor._id}`)}
            disabled={isSubscribed}
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </button>

          <button
            className="px-4 py-1 w-1/2 border border-[#03b1fc] text-[#03b1fc] rounded-2xl hover:bg-blue-50 transition text-base"
            onClick={() => navigate(`/view-mentor/${mentor.userId.email}`)}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};


const MentorsPage: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const user=useUser();
  // console.log("user in mentors page",user);
  const studentId = user.user?.id || "";
  console.log("studentid: ",studentId) // 🔹 Replace with your auth logic

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/mentors`);
        if (!res.ok) throw new Error("Failed to fetch mentors");
        const data = await res.json();
        setMentors(data);
      } catch (error) {
        console.error("Failed to fetch mentors", error);
      }
    };
    fetchMentors();
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      <div className="min-h-screen bg-gray-100 flex flex-col items-start p-10 gap-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 w-screen text-center">Our Mentors</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {mentors.map((mentor) => (
            <MentorCard key={mentor._id} mentor={mentor} studentId={studentId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorsPage;