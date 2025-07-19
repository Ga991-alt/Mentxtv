
import { Clock, Users, Lightbulb, Video, MessageCircle, Calendar, CheckCircle, TrendingUp } from "lucide-react";

const MentorshipBenefits = () => {
  const benefits = [
    {
      icon: MessageCircle,
      title: "Motivational Tips From the Toppers",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Clock,
      title: "Guidance in Creating Daily Routine",
      color: "bg-teal-100 text-teal-600"
    },
    {
      icon: Users,
      title: "Interactive Group Sessions Daily",
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      icon: Video,
      title: "Individual Guidance to Students",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Lightbulb,
      title: "Weekly Discussion Sessions",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Calendar,
      title: "Structured Study Planning",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: CheckCircle,
      title: "Regular Progress Tracking",
      color: "bg-pink-100 text-pink-600"
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      color: "bg-yellow-100 text-yellow-600"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How <span className="text-blue-600">Mentorship</span> from MentxTv helps you?
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Preparing for <span className="font-semibold text-gray-900">NEET | IIT-JEE</span> can be tough and we know students require guidance at every step.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
            >
              <div className="mb-6">
                <div className={`w-16 h-16 ${benefit.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon size={32} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MentorshipBenefits;
