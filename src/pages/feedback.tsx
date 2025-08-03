import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";           // <-- import axios
import { Star } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const FeedbackForm = () => {
  const { sessionid } = useParams();
  console.log("Session ID from params:", sessionid);
  const baseURL = import.meta.env.VITE_API_BASE_URL

  const [sessionName, setSessionName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    async function fetchSessionDetails() {
      if (!sessionid) {
        console.error("Session ID is not provided");
        return
    };

      try {console.log(`${baseURL}/api/sessions/${sessionid}`)
        const res = await axios.get(
          `${baseURL}/api/sessions/${sessionid}`
        );
        console.log("Session details fetched:", res);

        const data = res.data;
        console.log(data)
        setSessionName(data.title || "Session");
        setDateTime(new Date(data.dateTime || data.date).toLocaleString());
      } catch (err) {
        console.error("Axios fetch error:", err);
        setSessionName("Unknown Session");
        setDateTime("Unknown Date");
      } finally {
        setLoading(false);
      }
    }

    fetchSessionDetails();
  }, [sessionid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert("User not logged in");
      return;
    }

    try {
  const res = await axios.post(
    `${baseURL}/api/sessions/feedback/${sessionid}`,
    { rating, feedback, studentId: user.id },
    { headers: { 'Content-Type': 'application/json' } }
  );
  console.log("Feedback submitted:", res.data);
} catch (err) {
  if (err.response) {
    console.error("Server responded with:", err.response.status, err.response.data);
  } else if (err.request) {
    console.error("No response received:", err.request);
  } else {
    console.error("Axios error:", err.message);
  }
}

  };

  if (loading) {
    return (
      <div className="text-center py-20 font-[Poppins] text-xl text-gray-600">
        Loading session details...
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="text-center py-20 font-[Poppins] text-xl text-green-600">
        Thank you! Your feedback has been submitted.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 font-[Poppins]">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-lg p-6">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Feedback for: <span className="text-blue-600">{sessionName}</span>
          </h2>
          <p className="text-gray-600">Date: {dateTime}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Your Rating
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(star)}
                  size={28}
                  className={`cursor-pointer transition-colors ${
                    (hovered || rating) >= star
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill={(hovered || rating) >= star ? "#facc15" : "none"}
                />
              ))}
            </div>
          </div>
          <div>
            <label
              htmlFor="feedback"
              className="block text-gray-700 font-medium mb-2"
            >
              Your Feedback
            </label>
            <textarea
              id="feedback"
              name="feedback"
              rows={5}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your thoughts about the session..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500 resize-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
