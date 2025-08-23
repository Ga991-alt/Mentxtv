import { Button } from "@/components/ui/button";
import { GraduationCap, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Join India’s Biggest Network of Toppers & Mentors – Crack NEET &
                JEE with Expert Guidance.{" "}
                <span className="text-blue-600">Mentors & Toppers</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Ace your NEET & JEE preparation with expert guidance. MentxTv
                connects you to India’s top mentors and rankers.{" "}
                <span className="font-semibold text-gray-900">
                  NEET | IIT-JEE
                </span>{" "}
                toppers!
              </p>
            </div>

            <Link to="/booking-sessions">
              <Button
                size="lg"
                className="bg-gray-900 mt-5 hover:bg-gray-800 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Grab The Guidance
              </Button>
            </Link>
          </div>

          {/* Right Content - Stats and Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full opacity-20 -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400 rounded-full opacity-20 translate-y-12 -translate-x-12"></div>

              {/* Student Image */}
              <div className="relative z-10 flex justify-center mb-8">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                  alt="Student"
                  className="w-48 h-48 rounded-2xl object-cover"
                />
              </div>

              {/* Stats Cards */}
              <div className="space-y-4 relative z-10">
                <div className="bg-white rounded-xl p-4 flex items-center space-x-3 shadow-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <BookOpen className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">3000+</p>
                    <p className="text-sm text-gray-600">Sessions Daily</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 flex items-center space-x-3 shadow-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">35000+</p>
                    <p className="text-sm text-gray-600">Students Impacted</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 flex items-center space-x-3 shadow-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">1100+</p>
                    <p className="text-sm text-gray-600">Mentors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
