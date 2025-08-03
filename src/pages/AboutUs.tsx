
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import axios from "axios";

const AboutUs = () => {
  const [content, setContent] = useState("");
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/about-us`);
        const about = res.data;

        // If the response is an object with "content" field
        setContent(about?.content || "About Us content has not been set by the administrator yet.");
      } catch (error) {
        console.error("Failed to load About Us:", error);
        setContent("About Us content has not been set by the administrator yet.");
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              About Us
            </h1>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {content}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
