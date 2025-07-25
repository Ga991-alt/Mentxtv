import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

const MentorLiveSession = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();
  const { user } = useUser();

  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentRoom, setCurrentRoom] = useState("");

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sessionId) {
      setCurrentRoom(sessionId);
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [sessionId]);

  // Join room via new tab
  const handleJoin = () => {
    if (!sessionId) return;
    const meetUrl = `https://meet.jit.si/${sessionId}`;
    window.open(meetUrl, "_blank");
  };

  const handleLeave = () => {
    navigate("/mentor-dashboard");
  };

  const formatTime = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="p-6 font-[Poppins]">
      <h2 className="text-2xl font-bold mb-4">🎙 Mentor Control Panel</h2>

      <div className="mb-3 text-gray-800 font-semibold">
        👨‍🏫 Mentor: <strong>{user?.name}</strong> <br />
        🧩 Room ID: <strong>{currentRoom}</strong> <br />
        ⏱ Live Time: <span>{formatTime(elapsedTime)}</span>
      </div>

      <div className="text-center my-6">
        <button
          onClick={handleJoin}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
        >
          🚀 Launch Live Session
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={handleLeave}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full"
        >
          🚪 End Session
        </button>
      </div>
    </div>
  );
};

export default MentorLiveSession;
