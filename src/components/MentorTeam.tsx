import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const MentorTeam = () => {
  const [mentors, setMentors] = useState([]);
  const fallbackImage = "https://openclipart.org/image/800px/346569";

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/mentors`);
        const data = await response.json();

        // Ensure data is in expected structure
        const parsedMentors = data.map((mentor) => ({
          name: mentor.userId?.name || "Unknown",
          description: mentor.bio || "No description provided.",
          image: mentor.profilePic?.trim()
            ? mentor.profilePic
            : fallbackImage,
        }));

        setMentors(parsedMentors);
      } catch (error) {
        console.error("Failed to fetch mentors:", error);
      }
    };

    fetchMentors();
  }, []);

  return (
    <section id='r-mentors' className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Team of <span className="text-blue-600">Mentors</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            To guide you through each step with their expertise and skills we connect you with expert mentors having proven 
            success records in <span className="font-semibold text-gray-900">NEET | IIT-JEE</span> exams.
          </p>
        </div>

        {/* Mentors Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {mentors.map((mentor, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group h-full">
                    {/* Profile Image */}
                    <div className="mb-6 flex justify-center">
                      <img 
                        src={mentor.image} 
                        alt={mentor.name}
                        className="w-32 h-32 rounded-2xl object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {mentor.name}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-2">
                      {mentor.description}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
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

export default MentorTeam;
