
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MentorshipBenefits from "@/components/MentorshipBenefits";
import MentorTeam from "@/components/MentorTeam";
import GetStarted from "@/components/GetStarted";
import StudentJourney from "@/components/StudentJourney";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <MentorshipBenefits />
      <MentorTeam />
      <GetStarted />
      <StudentJourney />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
