import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

interface Mentor {
  _id: string;
  userId: {
    name: string;
    email: string;
  };
  domin: string;
  profilePic?: string;
}

interface Subscription {
  _id: string;
  mentorId: Mentor | string;
  status: string;
}

export default function StudentMentors() {
  const user = useUser();
  const navigate = useNavigate();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [studentId, setStudentId] = useState<string>(""); // 🔹 replace with real logged-in user id

  useEffect(() => {
  const fetchData = async () => {
    try {
      const id = user.user?.id;
      console.log("Fetching data for student ID:", id);

      if (!id) return;

      // fetch all mentors
      const mentorsRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/mentors`);
      const allMentors: Mentor[] = await mentorsRes.json();

      // fetch subscriptions for this student
      const subsRes = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/subscriptions/student/${id}`
      );
      const subscriptions: Subscription[] = await subsRes.json();

      console.log("Fetched subscriptions:", subscriptions);

      // filter mentors with active subscription
      const activeMentorIds = subscriptions
        .filter((sub) => sub.status === "active")
        .map((sub) => (typeof sub.mentorId === "string" ? sub.mentorId : sub.mentorId._id));

      const filteredMentors = allMentors.filter((mentor) =>
        activeMentorIds.includes(mentor._id)
      );

      setMentors(filteredMentors);
    } catch (err) {
      console.error("Error fetching mentors or subscriptions:", err);
    }
  };

  fetchData();
}, [user.user?.id]);  // 👈 depend only on user id


  return (
    <Card className="w-full mx-auto rounded-2xl shadow-md mb-8">
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">
          Subscribed Teachers
        </h2>
      </CardHeader>
      <CardContent>
        {mentors.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">
            You haven’t subscribed to any mentors yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {mentors.map((mentor) => (
              <div
                key={mentor._id}
                className="rounded-xl border shadow-sm overflow-hidden transform transition-transform duration-200 hover:scale-105"
              >
                {/* Top: Full photo */}
                <div className="w-full h-48 bg-gray-100">
                  {mentor.profilePic ? (
                    <img
                      src={mentor.profilePic}
                      alt={mentor.userId?.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg">
                      {mentor.userId?.name?.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 text-center">
                  <p className="font-semibold text-gray-800 text-sm">
                    {mentor.userId?.name}
                  </p>
                  <p className="text-xs text-gray-500">{mentor.domin}</p>

                  {/* Button */}
                  <Button
                    className="mt-4 w-full rounded-lg text-xs"
                    onClick={() => navigate(`/appointments/${mentor._id}`)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
