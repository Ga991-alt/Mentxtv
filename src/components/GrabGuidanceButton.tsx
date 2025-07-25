
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const GrabGuidanceButton = () => {
  return (
    <div className="flex justify-center py-8">
      <Link to="/booking-sessions">
        <Button 
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          Grab the Guidance
          <ArrowRight size={20} className="animate-pulse" />
        </Button>
      </Link>
    </div>
  );
};

export default GrabGuidanceButton;
