
import { Button } from "@/components/ui/button";
import { UserCheck, Calendar, CreditCard, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const GetStarted = () => {
  const steps = [
    {
      icon: UserCheck,
      title: "1. Register/Login",
      description: "Fill in your details and select a Ranker of your choice.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Calendar,
      title: "2. Schedule a call",
      description: "Select a time slot and book a call with your chosen Ranker.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: CreditCard,
      title: "3. Make a payment",
      description: "Choose a payment method & click Pay Now",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Phone,
      title: "4. Connect to your mentor",
      description: "You will receive a call back from the ranker at the selected date.",
      color: "bg-blue-100 text-blue-600"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              How to get started?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              In just 4 simple steps you can become an elite member of our MentxTv family.
            </p>
            
            <Link to="/booking-sessions">
              <Button 
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Take a Trial Session
              </Button>
            </Link>
          </div>

          {/* Right Content - Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="flex items-start space-x-6 group"
              >
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
