
// import Navigation from "@/components/Navigation";
// import HeroSection from "@/components/HeroSection";
// import MentorshipBenefits from "@/components/MentorshipBenefits";
// import MentorTeam from "@/components/MentorTeam";
// import GetStarted from "@/components/GetStarted";
// import StudentJourney from "@/components/StudentJourney";
// import TestimonialsSection from "@/components/TestimonialsSection";
// import Footer from "@/components/Footer";

// const Index = () => {
//   return (
//     <div className="min-h-screen bg-white">
//       <Navigation />
//       <HeroSection />
//       <MentorshipBenefits />
//       <MentorTeam />
//       <GetStarted />
//       <StudentJourney />
//       <TestimonialsSection />
//       <Footer />
//     </div>
//   );
// };

// export default Index;



import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import MentorshipBenefits from "@/components/MentorshipBenefits";
import MentorTeam from "@/components/MentorTeam";
import GetStarted from "@/components/GetStarted";
import StudentJourney from "@/components/StudentJourney";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <MentorshipBenefits />
      <section id="our-mentors">
        <MentorTeam />
      </section>
      <GetStarted />
      <StudentJourney />
      <section id="student-testimonials">
        <TestimonialsSection />
      </section>
      <Footer />
    </div>
  );
};

export default Index;
