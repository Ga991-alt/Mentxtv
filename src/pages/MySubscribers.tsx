// src/pages/MySubscribers.tsx
import SubscriberCard from "@/components/mentor/SubscriberCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/contexts/UserContext"; // adjust path if needed

type Subscriber = {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: string;
  subscribed: string;
  expires: string;
  totalSessions: number;
  lastSession: string;
  image: string;
};

const MySubscribers = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useUser(); // { id, name, email, ... }

  useEffect(() => {
    const fetchSubscribers = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/subscriptions/mentor/${user.id}`
        );

        // Map backend response → Subscriber type
        const mapped = (res.data || []).map((sub: any): Subscriber => {
          const student = sub.studentId || {};
          const studentUser = student.userId || {};

          return {
            id: sub._id,
            name: studentUser.name || "Unknown",
            email: studentUser.email || "",
            phone: student.phone || "N/A", // if phone not in schema, set default
            plan: sub.plan || "",
            status: sub.status || "",
            subscribed: sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : "",
            expires: sub.endDate ? new Date(sub.endDate).toLocaleDateString() : "",
            totalSessions: student.enrolledSessions?.length || 0,
            lastSession:
              student.attendedSessions?.length > 0
                ? new Date().toLocaleDateString() // replace with actual session lookup if needed
                : "N/A",
            image:
              student.profilePic ||
              "https://ui-avatars.com/api/?name=" + encodeURIComponent(studentUser.name || "U"),
          };
        });

        setSubscribers(mapped);
      } catch (err: any) {
        console.error("Failed to fetch subscribers:", err);
        setError("Unable to fetch subscribers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-6">My Subscribers</h2>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && subscribers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscribers.map((subscriber) => (
            <SubscriberCard key={subscriber.id} subscriber={subscriber} />
          ))}
        </div>
      ) : (
        !loading &&
        !error && <p className="text-gray-500">No subscribers found.</p>
      )}
    </div>
  );
};

export default MySubscribers;
