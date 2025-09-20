import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Video } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

interface Appointment {
  _id: string;
  mentorId: string;
  studentId: {
    profilePic?: string;
    userId: {
      name: string;
    };
  };
  date: string;
  timeSlot: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export default function OneToOneSessions() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<"requests" | "upcoming">("requests");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/appointments`, {
        params: { mentorId: user.id },
      });
      setAppointments(res.data || []);
    } catch (err) {
      console.error("❌ Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user?.id]);

  const handleAction = async (id: string, status: "accepted" | "rejected") => {
    try {
      await axios.put(`${API_BASE}/api/appointments/${id}`, { status });
      fetchAppointments();
    } catch (err) {
      console.error(`❌ Error updating appointment ${id}:`, err);
    }
  };

  const requests = appointments.filter((a) => a.status === "pending");
  const upcoming = appointments.filter((a) => a.status === "accepted");

  const renderAppointmentCard = (session: Appointment, isRequest: boolean, i: number) => (
    <motion.div
      key={session._id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md hover:scale-105 transition gap-3"
    >
      {/* Student Profile */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <Avatar className="w-12 h-12">
          <AvatarImage src={session.studentId?.profilePic} />
          <AvatarFallback>
            {session.studentId?.userId?.name?.charAt(0) ?? "?"}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-gray-800 text-lg">
            {session.studentId?.userId?.name ?? "Unknown"}
          </p>
          <div className="flex flex-col gap-1 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {session.date} | {session.timeSlot}
            </div>
            {isRequest && (
              <div className="flex items-center gap-2">
                Requested on{" "}
                {new Date(session.createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-3 md:mt-0">
        {isRequest ? (
          <>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full text-green-600 border-green-500"
              onClick={() => handleAction(session._id, "accepted")}
            >
              Accept
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full text-red-600 border-red-500"
              onClick={() => handleAction(session._id, "rejected")}
            >
              Reject
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              className="rounded-full flex gap-1 bg-blue-500 text-white hover:bg-blue-600"
            >
              <Video className="w-4 h-4" /> Join
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full text-red-600 border-red-500"
              onClick={() => handleAction(session._id, "rejected")}
            >
              Reject
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );

  return (
    <Card className="shadow-lg rounded-2xl border p-4 mt-8">
      <CardHeader className="text-xl font-semibold flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          <div>One-to-One Sessions</div>
        </div>

        <div className="flex gap-2 text-sm font-medium bg-gray-100 p-1 rounded-full mt-2 md:mt-0">
          <button
            className={`px-6 py-1 rounded-full transition ${
              activeTab === "requests"
                ? "bg-blue-500 text-white shadow"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("requests")}
          >
            Requests
          </button>
          <button
            className={`px-6 py-1 rounded-full transition ${
              activeTab === "upcoming"
                ? "bg-blue-500 text-white shadow"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Ongoing
          </button>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="space-y-4">
            {(activeTab === "upcoming" ? upcoming : requests).map((session, i) =>
              renderAppointmentCard(session, activeTab === "requests", i)
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
