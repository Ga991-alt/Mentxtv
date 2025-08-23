import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, Shield, Users, Video, CheckCircle, Users2, Award, TrendingUp } from "lucide-react";

const BecomeMentor = () => {
  // Google Form URL - replace with actual Google Form URL
  const GOOGLE_FORM_URL = "https://forms.google.com/your-mentor-registration-form";

  const handleRegisterClick = () => {
    window.open(GOOGLE_FORM_URL, '_blank');
  };

  const steps = [
    {
      icon: FileText,
      title: "Register & Submit Documents",
      description: "Fill the registration form to become a IIT-JEE | NEET mentor with all the correct information and submit the related documents with the registration form.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop",
      step: "1"
    },
    {
      icon: Shield,
      title: "Background Verification",
      description: "Our qualified team at MentxTv will then conduct your background check and verification of documents shared by you.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop",
      step: "2"
    },
    {
      icon: Users,
      title: "Personal Interview",
      description: "On confirming that all information and documents shared by you complies with our rules and regulations you will go through an interview process followed by hiring.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=200&fit=crop",
      step: "3"
    },
    {
      icon: Video,
      title: "Training & Demo Session",
      description: "For the first few days you will be trained by our expert team and after training sessions you will be ready to conduct your first demo session.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop",
      step: "4"
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Create an impact in the lives of IIT-JEE | NEET aspirants"
    },
    {
      icon: TrendingUp,
      title: "Start earning along with your regular studies"
    },
    {
      icon: Award,
      title: "Learn professional skills in a fast-growing startup"
    },
    {
      icon: Users2,
      title: "Connect with a Community of IIT- JEE | NEET Mentors"
    },
    {
      icon: FileText,
      title: "Letter of recommendation to best mentors"
    },
    {
      icon: Award,
      title: "Become a Brand Ambassador of a growth- oriented company"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-400 to-blue-600 py-20 px-4 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Become a Mentor
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Be a light house for the IIT-JEE | NEET aspirants.
              </p>
              <Button 
                size="lg"
                onClick={handleRegisterClick}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Register as a Mentor
              </Button>
            </div>
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop" 
                alt="Mentor teaching students"
                className="w-96 h-80 rounded-3xl object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-800 rounded-2xl aspect-video flex items-center justify-center">
              <div className="text-center text-white">
                <Video size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">How to become a MENTOR? | MentxTv</p>
                <p className="text-sm opacity-75 mt-2">Watch Later | Share</p>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Become a Mentor
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Mentoring is an act that brings change in the lives of many and you can drive this change by becoming a IIT-JEE | NEET mentor at MentxTv. Young enthusiasts who have cleared their IIT-JEE | NEET exam recently with good scores are eligible to become a mentor at MentxTv and reap the many benefits that MentxTv's Mentorship Program offers.
              </p>
              <Button 
                size="lg"
                onClick={handleRegisterClick}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mt-8"
              >
                Register as a Mentor
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How to Become a Mentor */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              How to Become a <span className="text-blue-600">Mentor?</span>
            </h2>
            <p className="text-xl text-gray-600">
              In just 4 simple steps you can register and join the esteemed community of IIT-JEE | NEET mentors at MentxTv!!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Benefits of Becoming a <span className="text-blue-600">Mentor at MentxTv</span>
            </h2>
            <p className="text-xl text-gray-600">
              Grow your network, learn life skills and find your passion with mentoring!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {benefit.title}
                </h3>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              onClick={handleRegisterClick}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Register as a Mentor
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BecomeMentor;
