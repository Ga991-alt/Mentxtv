import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Quote, User } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Testimonial {
  name: string;
  role: string;
  testimonial: string;
  avatar?: string | null;
  type: "student" | "mentor"; // to filter tabs
}

const TestimonialsSection = () => {
  const [activeTab, setActiveTab] = useState<"student" | "mentor">("student");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Fetch feedbacks from backend
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/feedbacks`); // adjust endpoint
        // Example: backend returns array of feedback objects
        // { user: {name, role}, message, type }
        const formatted: Testimonial[] = res.data.map((fb: any) => ({
          name: fb.name || "Anonymous",
          role: fb.user?.role || (fb.type === "mentor" ? "Mentor" : "Student"),
          testimonial: fb.testimonial,
          avatar: fb.user?.profilePic || null,
          type: fb.type,
        }));
        setTestimonials(formatted);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      }
    };

    fetchFeedbacks();
  }, []);

  const currentTestimonials = testimonials.filter(
    (t) => t.type === activeTab
  );

  return (
    <section id="student-testinomial" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">
              Real Stories. Real Impact. Discover Their Experience.
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Our mission is to guide{" "}
            <span className="font-semibold text-gray-900">NEET & JEE</span>{" "}
            aspirants with expert strategies while connecting toppers with
            impactful mentorship roles. But the real stories come from our
            students and mentors themselves.
          </p>

          {/* Tab Buttons */}
          <div className="flex justify-center space-x-4 mb-12">
            <Button
              onClick={() => setActiveTab("student")}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === "student"
                  ? "bg-blue-500 text-white shadow-lg hover:bg-blue-600"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Student
            </Button>
            <Button
              onClick={() => setActiveTab("mentor")}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === "mentor"
                  ? "bg-blue-500 text-white shadow-lg hover:bg-blue-600"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Mentor
            </Button>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {currentTestimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative h-full">
                    {/* Quote Icon */}
                    <div className="absolute top-6 right-6">
                      <Quote size={32} className="text-blue-200" />
                    </div>

                    {/* Profile */}
                    <div className="flex items-center space-x-4 mb-6">
                      {testimonial.avatar ? (
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <User size={24} className="text-gray-500" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-700 leading-relaxed italic">
                      "{testimonial.testimonial}"
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Custom Navigation Buttons */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <CarouselPrevious className="relative translate-y-0 left-0 right-0 bg-blue-500 hover:bg-blue-600 text-white border-blue-500 hover:border-blue-600" />
              <CarouselNext className="relative translate-y-0 left-0 right-0 bg-blue-500 hover:bg-blue-600 text-white border-blue-500 hover:border-blue-600" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
