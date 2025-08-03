
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
  const [activeTab, setActiveTab] = useState('student');

  const studentTestimonials = [
    {
      name: "Nilkamal",
      role: "NEET Aspirant",
      testimonial: "Main Nilkamal Baidya, Student of MentxTv, mera mentor name Akansha, mera first class ka chuka hai. My mentor advises and guides me all the time. She gave me subject-wise tasks, and advised me how to memorize and which book should I follow.",
      avatar: null
    },
    {
      name: "Kushagra",
      role: "JEE Aspirant", 
      testimonial: "My mentor Sarthak was very helpful. Starting by asking a lot of questions about my day-to-day activities and then guiding me on how I can take out more time for self-study to revise my pending syllabus. The journey went smoothly.",
      avatar: null
    },
    {
      name: "AMU MALICK",
      role: "NEET Aspirant",
      testimonial: "I enrolled in the mentorship program and learned a lot from it. They provide focused and well-organized content. I am particularly very grateful to MentxTv ma'am and bhaiya also. Ma'am helped me a lot in terms of understanding any problem. Thank you.",
      avatar: null
    },
    {
      name: "Priya Sharma",
      role: "JEE Aspirant",
      testimonial: "The personalized study plan from my mentor helped me improve my weak areas systematically. The regular doubt sessions and mock tests were incredibly helpful for my JEE preparation.",
      avatar: null
    },
    {
      name: "Rohit Kumar",
      role: "NEET Aspirant",
      testimonial: "MentxTv's mentorship program transformed my study approach. My mentor's guidance on time management and effective study techniques helped me score better in practice tests.",
      avatar: null
    },
    {
      name: "Sneha Patel",
      role: "JEE Aspirant",
      testimonial: "The one-on-one sessions with my mentor were game-changing. They helped me understand complex concepts in Physics and Mathematics that I was struggling with for months.",
      avatar: null
    }
  ];

  const mentorTestimonials = [
    {
      name: "Dr. Akansha Verma",
      role: "NEET Mentor",
      testimonial: "Being a mentor at MentxTv has been incredibly rewarding. Helping students achieve their dreams and seeing their progress gives me immense satisfaction. The platform provides excellent support for mentors.",
      avatar: null
    },
    {
      name: "Sarthak Agarwal",
      role: "JEE Mentor",
      testimonial: "I love the structured approach MentxTv provides for mentoring. The tools and resources available make it easy to track student progress and customize learning paths for each individual.",
      avatar: null
    },
    {
      name: "Prof. Rajesh Singh",
      role: "Physics Mentor",
      testimonial: "The flexibility to work with passionate students while maintaining my other commitments is what drew me to MentxTv. The compensation is fair and the work environment is professional.",
      avatar: null
    },
    {
      name: "Dr. Meera Joshi",
      role: "Chemistry Mentor",
      testimonial: "MentxTv's mentor community is supportive and collaborative. We regularly share teaching strategies and help each other improve. It's more than just a job - it's a mission.",
      avatar: null
    },
    {
      name: "Amit Gupta",
      role: "Mathematics Mentor",
      testimonial: "The platform's technology makes remote mentoring seamless. I can easily conduct sessions, share resources, and monitor my students' progress. Highly recommend for experienced educators.",
      avatar: null
    },
    {
      name: "Dr. Kavya Reddy",
      role: "Biology Mentor",
      testimonial: "What I appreciate most is the focus on holistic development. We don't just teach subjects but also guide students on exam strategies, stress management, and career planning.",
      avatar: null
    }
  ];

  const currentTestimonials = activeTab === 'student' ? studentTestimonials : mentorTestimonials;

  return (
    <section id='student-testinomial' className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">See What People are Saying About Us!</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            We aim to provide guidance and success hacks to <span className="font-semibold text-gray-900">NEET | IIT-JEE</span> aspirants and exciting mentorship opportunities 
            to toppers of these exams... but just don't take our word for it.
          </p>

          {/* Tab Buttons */}
          <div className="flex justify-center space-x-4 mb-12">
            <Button
              onClick={() => setActiveTab('student')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'student' 
                  ? 'bg-blue-500 text-white shadow-lg hover:bg-blue-600' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Student
            </Button>
            <Button
              onClick={() => setActiveTab('mentor')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'mentor' 
                  ? 'bg-blue-500 text-white shadow-lg hover:bg-blue-600' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
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
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
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
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
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
