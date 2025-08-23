import Navigation from "@/components/Navigation";
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
  sessions: string[]; // 🔹 now just sessionIds
  reviews: number;
}

const MentorCard: React.FC<{ mentor: Mentor }> = ({ mentor }) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchSessionsAndCalcRating = async () => {
      try {
        if (!mentor.sessions || mentor.sessions.length === 0) {
          setRating(0);
          return;
        }

        let totalFeedback = 0;
        let feedbackCount = 0;

        // Fetch all sessions in parallel
        const sessionPromises = mentor.sessions.map((sessionId) =>
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/sessions/${sessionId}`).then((res) =>
            res.json()
          )
        );

        const sessionData: SessionData[] = await Promise.all(sessionPromises);

        sessionData.forEach((session) => {
          if (session?.feedbacks && session.feedbacks.length > 0) {
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
            <p className="font-bold text-gray-800 flex items-center  text-lg">
              {rating.toFixed(1)}{" "}
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            </p>
            <span className="text-gray-500 text-sm">Rating</span>
          </div>
        </div>

        <div className="flex justify-around gap-4 mx-2">
          <button
            className="px-4 py-1 w-1/2 bg-[#03b1fc] text-white rounded-2xl hover:bg-[#038cfc] transition text-base"
            onClick={() => navigate(`/subscribe/${mentor._id}`)} // 🔹 pass mentorId
          >
            Subscribe
          </button>
          <button className="px-4 py-1 w-1/2 border border-[#03b1fc] text-[#03b1fc] rounded-2xl hover:bg-blue-50 transition text-base" onClick={()=> navigate(`/view-mentor/${mentor.userId.email}`)}>
            View
          </button>
        </div>
      </div>
    </div>
  );
};

const MentorsPage: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/mentors`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

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
        <h1 className="text-3xl font-bold text-gray-800 mb-8 w-screen text-center">
          Our Mentors
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {mentors.map((mentor) => (
            <MentorCard key={mentor._id} mentor={mentor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorsPage;
