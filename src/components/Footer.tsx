import axios from "axios";
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";

const Footer = () => {

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [socials, setSocials] = useState({
    facebook: "#",
    instagram: "#",
    twitter: "#",
    youtube: "#",
    linkedin: "#",
  });

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/social`);
        setSocials(res.data || {});
      } catch (error) {
        console.error("Failed to fetch social links", error);
      }
    };
    fetchSocials();
  }, [BASE_URL]);
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-bold mb-6">About Us</h3>
            <p className="text-gray-300 leading-relaxed">
              A Student driven Mentorship platform. Our vision is to make actionable guidance and mentorship accessible to every student in the world.
            </p>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Important Links</h3>
            <div className="space-y-3">
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Mentorship For JEE Main</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Mentorship For JEE Advance</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Mentorship For NEET UG</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Mentorship For NEET PG</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Mentorship for SAT | GRE | GMAT</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Mentorship For TOEFL | IELTS</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Mentorship For JEE | NEET Abroad</a>
            </div>
          </div>

          {/* Other Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Other Links</h3>
            <div className="space-y-3">
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Mentorship Plan</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Our Mentor</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">JEE Main Mentor</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">JEE Advance Mentor</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">NEET Mentor</a>
              <a href="/become-mentor" className="block text-gray-300 hover:text-blue-400 transition-colors">Become Mentor</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Take a Trial Session</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Toppers & Student Community</a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Company</h3>
            <div className="space-y-3">
              <a href="/about" className="block text-gray-300 hover:text-blue-400 transition-colors">About Us</a>
              <a href="/blogs" className="block text-gray-300 hover:text-blue-400 transition-colors">Blogs</a>
              {/* <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">FAQs</a> */}
              <a href="/Terms" className="block text-gray-300 hover:text-blue-400 transition-colors">Terms and Conditions</a>
              <a href="/privacy" className="block text-gray-300 hover:text-blue-400 transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Follow Us :</h4>
              {/* <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Youtube size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Linkedin size={20} />
                </a>
              </div> */}
              <div className="flex space-x-4">
                <a href={socials.facebook ||"#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href={socials.twitter || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href={socials.youtube || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Youtube size={20} />
                </a>
                <a href={socials.instagram || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href={ socials.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-400">
                © 2024-25 by MENTXTV TECHNOLOGIES PRIVATE LIMITED
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
