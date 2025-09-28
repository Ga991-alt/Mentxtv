import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import axios from "axios";

const SubscribePlans = () => {
  const { mentorId } = useParams<{ mentorId: string }>();
  const { user } = useUser();
  const navigate = useNavigate();

  const [mentor, setMentor] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlansAndMentor = async () => {
      try {
        setLoading(true);

        // 1. Fetch mentor info
        const mentorRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/mentors`
        );
        const mentors = mentorRes.data.mentors || mentorRes.data;
        const found = mentors.find((m: any) => m._id === mentorId);
        setMentor(found || null);

        // 2. Fetch subscription plans for this mentor
        const plansRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/subscription-plans/mentor/${mentorId}`
        );

        const fetchedPlans = plansRes.data.data || [];
        // Mark last plan as premium
        if (fetchedPlans.length > 0) {
          fetchedPlans[fetchedPlans.length - 1].isPremium = true;
        }
        setPlans(fetchedPlans);
      } catch (err: any) {
        console.error("Failed to fetch data:", err);
        setError("Unable to load mentor or plans.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlansAndMentor();
  }, [mentorId]);

  useEffect(() => {
    document.title = mentor
      ? `${mentor.name} – Plans | MentxTv`
      : "Mentor Plans | MentxTv";
  }, [mentor]);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading mentor and plans...</p>;
  }

  if (error || !mentor) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-2xl font-bold">Mentor not found</h1>
        <p className="text-gray-600">
          {error || "Please go back and choose a mentor."}
        </p>
      </main>
    );
  }

  const colors = [
    { bar: "from-blue-500 to-blue-400", btn: "bg-blue-600 hover:bg-blue-700" },
    { bar: "from-green-500 to-green-400", btn: "bg-green-600 hover:bg-green-700" },
    { bar: "from-purple-500 to-purple-400", btn: "bg-purple-600 hover:bg-purple-700" },
    {
      bar: "from-orange-500 to-pink-500",
      btn: "bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700",
    },
  ];

  const handleSubscribe = (plan: any) => {
    if (!user?.id) {
      alert("Please login as a student to subscribe");
      return;
    }

    const today = new Date();
    const endDate = new Date();
    endDate.setMonth(today.getMonth() + plan.duration);

    const payload = {
      mentorId: mentor._id,
      studentId: user.id,
      plan: plan.planTitle,
      startDate: today.toISOString(),
      endDate: endDate.toISOString(),
      amount: plan.price,
      mentorName: mentor.userId?.name || "Unknown Mentor",
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
              Subscribe to {mentor.userId?.name}
            </h1>
            <p className="text-muted-foreground text-lg">
              Choose a plan that fits your goals and unlock your potential
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, idx) => (
            <Card
              key={plan._id}
              className={`relative overflow-hidden border-2 hover:shadow-lg transition-all duration-300 bg-card ${
                plan.isPremium
                  ? "border-orange-300 shadow-xl transform hover:scale-105"
                  : ""
              }`}
            >
              {/* Premium Badge */}
              {plan.isPremium && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={`absolute top-0 left-0 w-full h-1 ${
                  plan.isPremium
                    ? "bg-gradient-to-r from-orange-500 to-pink-500"
                    : `bg-gradient-to-r ${colors[idx % colors.length].bar}`
                }`}
              ></div>

              <CardHeader className={`pb-4 ${plan.isPremium ? "pt-8" : ""}`}>
                <CardTitle className="text-2xl font-bold text-foreground">
                  {plan.planTitle}
                  <span className="block text-lg font-normal text-muted-foreground">
                    {plan.duration} {plan.duration > 1 ? "months" : "month"}
                  </span>
                </CardTitle>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-3xl font-bold ${
                      plan.isPremium ? "text-orange-600" : "text-foreground"
                    }`}
                  >
                    ₹{plan.price}
                  </span>
                  <span className="text-muted-foreground">/ total</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 flex flex-col justify-between h-1/2">
                <ul className="space-y-3">
                  {plan.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          plan.isPremium ? "bg-orange-500" : "bg-primary"
                        }`}
                      ></div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full  text-white font-semibold py-3 text-base ${
                    plan.isPremium
                      ? "bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700"
                      : colors[idx % colors.length].btn
                  }`}
                  onClick={() => handleSubscribe(plan)}
                >
                  {plan.isPremium ? "Get Premium" : `Choose ${plan.planTitle}`}
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
