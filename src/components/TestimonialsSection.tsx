import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Quote, User, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const TestimonialsSection = () => {
  const [activeTab, setActiveTab] = useState("student");

  const studentTestimonials = [
    {
      name: "Nilkamal",
      role: "NEET Aspirant",
      testimonial:
        "I’m Nilkamal Baidya, a NEET aspirant at MentxTv. My mentor, Akansha ma’am, has been incredibly supportive. She assigns subject-wise tasks, suggests the best books, and consistently helps me stay focused and motivated.",
      avatar: null,
    },
    {
      name: "Kushagra",
      role: "JEE Aspirant",
      testimonial:
        "My mentor Sarthak sir was very helpful. He started by understanding my daily routine and then helped me restructure my schedule to maximize self-study and cover my pending syllabus. The experience has been smooth and effective.",
      avatar: null,
    },
    {
      name: "AMU MALICK",
      role: "NEET Aspirant",
      testimonial:
        "Enrolling in MentxTv’s mentorship program was one of the best decisions for my NEET prep. The mentors provide focused, structured support. I’m grateful to ma’am and bhaiya for helping me overcome my doubts and stay motivated.",
      avatar: null,
    },
    {
      name: "Priya Sharma",
      role: "JEE Aspirant",
      testimonial:
        "The personalized study plan created by my mentor helped me strengthen my weak areas. Weekly doubt-clearing sessions and mock tests played a vital role in boosting my confidence for the JEE exam.",
      avatar: null,
    },
    {
      name: "Rohit Kumar",
      role: "NEET Aspirant",
      testimonial:
        "MentxTv transformed my approach to studying. With my mentor’s help, I learned how to manage time better and use more effective study techniques. I’ve seen real improvement in my mock test scores.",
      avatar: null,
    },
    {
      name: "Sneha Patel",
      role: "JEE Aspirant",
      testimonial:
        "One-on-one mentorship sessions helped me finally understand tough concepts in Physics and Math. The mentor broke everything down in a way that made it simple and clear. Highly recommend MentxTv!",
      avatar: null,
    },
  ];

  const mentorTestimonials = [
    {
      name: "Dr. Akansha Verma",
      role: "NEET Mentor",
      testimonial:
        "Being a mentor at MentxTv is a fulfilling experience. Watching students progress and succeed brings immense satisfaction. The platform provides excellent support and structure for mentors.",
      avatar: null,
    },
    {
      name: "Sarthak Agarwal",
      role: "JEE Mentor",
      testimonial:
        "MentxTv’s structured mentorship model makes guiding students easy and effective. With clear tools and resources, I can personalize learning paths and track progress seamlessly.",
      avatar: null,
    },
    {
      name: "Prof. Rajesh Singh",
      role: "Physics Mentor",
      testimonial:
        "MentxTv offers great flexibility, allowing me to mentor passionate students while balancing my academic commitments. The platform is professional, and the experience has been rewarding.",
      avatar: null,
    },
    {
      name: "Dr. Meera Joshi",
      role: "Chemistry Mentor",
      testimonial:
        "What sets MentxTv apart is its strong mentor community. We constantly collaborate, share strategies, and grow together. It’s more than teaching—it’s a mission to shape futures.",
      avatar: null,
    },
    {
      name: "Amit Gupta",
      role: "Mathematics Mentor",
      testimonial:
        "The technology behind MentxTv makes remote mentoring smooth and efficient. I can share resources, conduct interactive sessions, and monitor performance—all in one place.",
      avatar: null,
    },
    {
      name: "Dr. Kavya Reddy",
      role: "Biology Mentor",
      testimonial:
        "I love MentxTv’s focus on holistic student development. Beyond academics, we guide students on exam strategies, mental health, and career planning. It’s truly impactful.",
      avatar: null,
    },
  ];

  const currentTestimonials =
    activeTab === "student" ? studentTestimonials : mentorTestimonials;

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
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User size={24} className="text-gray-500" />
                      </div>
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
