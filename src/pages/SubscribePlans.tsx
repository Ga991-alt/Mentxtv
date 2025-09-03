import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";

const SubscribePlans = () => {
  const { mentorId } = useParams<{ mentorId: string }>();
  const { user } = useUser();
  const navigate = useNavigate();

  const [mentor, setMentor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/mentors`
        );
        const mentors = res.data.mentors || res.data; // depends on API shape
        console.log("Fetched mentors:", mentors);
        const found = mentors.find((m: any) => m._id === mentorId);
        console.log("Found mentor:", found);
        setMentor(found || null);
        console.log("Mentor set to state:", mentor);
      } catch (err: any) {
        console.error("Failed to fetch mentors:", err);
        setError("Unable to load mentor.");
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [mentorId]);

  useEffect(() => {
    document.title = mentor
      ? `${mentor.name} – Plans | MentxTv`
      : "Mentor Plans | MentxTv";
  }, [mentor]);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading mentor...</p>;
  }

  if (error || !mentor) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-2xl font-bold">Mentor not found</h1>
        <p className="text-gray-600">{error || "Please go back and choose a mentor."}</p>
      </main>
    );
  }

  const plans = [
    { title: "1 Month Plan", price: 500, duration: "per month", months: 1 },
    { title: "6 Months Plan", price: 2500, duration: "one-time", months: 6 },
    { title: "1 Year Plan", price: 4500, duration: "one-time", months: 12 },
  ];

  const features = [
    "One-to-one doubt-solving",
    "Subject-wise quizzes",
    "Performance analysis",
    "Live sessions",
    "Join mentor's WhatsApp community",
    "Full access to all study materials",
    "Unlimited mentor Q&A sessions via chat",
  ];

  const colors = [
    { bar: "from-blue-500 to-blue-400", btn: "bg-blue-600 hover:bg-blue-700" },
    { bar: "from-green-500 to-green-400", btn: "bg-green-600 hover:bg-green-700" },
    { bar: "from-purple-500 to-purple-400", btn: "bg-purple-600 hover:bg-purple-700" },
  ];

  const handleSubscribe = (plan: any) => {
    if (!user?.id) {
      alert("Please login as a student to subscribe");
      return;
    }

    const today = new Date();
    const endDate = new Date();
    endDate.setMonth(today.getMonth() + plan.months);

    const payload = {
      mentorId:mentor.userId.name,
      studentId: user.id,
      plan: plan.title,
      startDate: today.toISOString(),
      endDate: endDate.toISOString(),
      amount: plan.price,
    };

    console.log("Subscription Payload:", payload);

    navigate("/subscription-payment", { state: payload });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <header className="bg-card border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Subscribe to {mentor.userId.name}
            </h1>
            <p className="text-muted-foreground text-lg">
              Choose a plan that fits your goals and unlock your potential
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className="relative overflow-hidden border-2 hover:shadow-lg transition-all duration-300 bg-card"
            >
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colors[idx].bar}`}
              ></div>

              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-foreground">
                  {plan.title}
                </CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">
                    ₹{plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.duration}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${colors[idx].btn} text-white font-semibold py-3 text-base`}
                  onClick={() => handleSubscribe(plan)}
                >
                  Choose {plan.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SubscribePlans;
