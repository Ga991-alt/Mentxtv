 //charan i changed this file 


// // export default BookingSessions;
// import Navigation from "@/components/Navigation";
// import Footer from "@/components/Footer";
// import SessionCard from "@/components/SessionCard";
// import { useNavigate } from "react-router-dom"; // Import this
// import { useUser } from "@/contexts/UserContext"; // Import this
// import { Tabs, TabsContent } from "@/components/ui/tabs";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const mentorshipCategories = {
//   "School & Academic": [
//     "Primary & Secondary (Class 1–10)",
//     "Higher Secondary (Class 11–12)",
//     "Olympiads & NTSE",
//     "Board Exam Preparation",
//     "Subject-Specific Mentoring (Math, Science, English, etc.)",
//   ],
//   "Competitive Exams": [
//     "JEE Preparation",
//     "NEET Preparation",
//     "UPSC / Civil Services",
//     "SSC / Banking / Railways",
//     "CAT / MBA Entrance",
//     "GATE / GRE / GMAT",
//     "NDA / CDS (Defence)",
//   ],
//   "Engineering & Tech": [
//     "Mechanical Engineering",
//     "Electrical & Electronics",
//     "Civil Engineering",
//     "Computer Science & IT",
//     "Chemical Engineering",
//     "Robotics & Automation",
//     "Aerospace Engineering",
//   ],
//   "Medical & Healthcare": [
//     "MBBS Preparation",
//     "Nursing Careers",
//     "Pharmacy & Paramedical",
//     "Dentistry",
//     "Allied Health Sciences",
//     "Overseas Medical Licensing (USMLE, PLAB, etc.)",
//   ],
//   "Management & Finance": [
//     "Chartered Accountancy (CA)",
//     "Company Secretary (CS)",
//     "Cost & Management Accounting (CMA)",
//     "MBA Specializations",
//     "Stock Market & Investment",
//     "Financial Analysis & Consulting",
//   ],
//   "Study Abroad": [
//     "US / Canada Admissions",
//     "UK / Europe Admissions",
//     "Australia / NZ Admissions",
//     "Scholarships & Funding Guidance",
//     "Visa & Application Guidance",
//     "Language Tests (IELTS, TOEFL, PTE)",
//   ],
//   "Creative & Media": [
//     "Design (Graphic, Product, UI/UX)",
//     "Photography & Videography",
//     "Film & Acting",
//     "Writing & Journalism",
//     "Fine Arts & Animation",
//     "Music & Performing Arts",
//   ],
//   "Government & PSU Jobs": [
//     "UPSC Mentorship",
//     "SSC / Railway Exams",
//     "Banking (IBPS, SBI, RBI)",
//     "Defence & Paramilitary",
//     "Public Sector Undertakings (GAIL, ONGC, BHEL, etc.)",
//   ],
//   Entrepreneurship: [
//     "Startup Mentorship",
//     "Business Strategy",
//     "Funding & Pitching",
//     "Product Development",
//     "Marketing & Growth Hacking",
//     "Leadership & Team Building",
//   ],
//   "IT & Digital Skills": [
//     "Software Development",
//     "Data Science & AI",
//     "Cybersecurity",
//     "Cloud Computing & DevOps",
//     "Web & App Development",
//     "Blockchain & Web3",
//     "Digital Marketing",
//     "Computer Science"
//   ],
//   "Personality & Life Skills": [
//     "Public Speaking & Communication",
//     "Soft Skills & Confidence Building",
//     "Career Counselling",
//     "Time Management & Productivity",
//     "Mindfulness & Stress Management",
//     "Leadership & Teamwork",
//   ],
//   "Law & Misc Careers": [
//     "Law Entrance Exams (CLAT, LSAT)",
//     "Judiciary Preparation",
//     "Corporate Law Careers",
//     "NGO & Social Work",
//     "Education & Teaching",
//     "Other Niche Career Guidance",
//   ],
// };


// const BookingSessions = () => {

//    const { user } = useUser(); // Access user context
//   const navigate = useNavigate();//
//   const [sessions, setSessions] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedMainCategory, setSelectedMainCategory] = useState("All");
//   const [selectedSubCategory, setSelectedSubCategory] = useState("All");

//   useEffect(() => {
//     if (!user) {
//       navigate("/login"); // Redirect if not logged in
//     }
//   }, [user, navigate]);

//   useEffect(() => {
//     const fetchSessions = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/sessions`);
//         setSessions(res.data);
//       } catch (error) {
//         console.error("Failed to fetch sessions:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSessions();
//   }, []);

//   const groupSessions = sessions.filter((session) => session.type === "group");

//   const normalize = (str: string) => str?.toLowerCase().replace(/\s+/g, "");

//   const filterByCategory = (sessions: any[]) => {
//   // No main category selected
//   if (selectedMainCategory === "All") return sessions;

//   const subs = mentorshipCategories[selectedMainCategory].map(sub => normalize(sub));

//   if (selectedSubCategory && selectedSubCategory !== "All") {
//     // Filter sessions that contain the selected subcategory in their subjects
//     return sessions.filter((s) => {
//       const sessionSubjects = Array.isArray(s.subjects) ? s.subjects : [s.subject || "General"];
//       return sessionSubjects.some((subj: string) => normalize(subj) === normalize(selectedSubCategory));
//     });
//   }

//   // Only main category selected, show sessions that match any subcategory
//   return sessions.filter((s) => {
//     const sessionSubjects = Array.isArray(s.subjects) ? s.subjects : [s.subject || "General"];
//     return sessionSubjects.some((subj: string) => subs.includes(normalize(subj)));
//   });
// };


//   const filteredGroupSessions = filterByCategory(groupSessions);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navigation />

//       <main className="mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
//         {/* Main content */}
//         <section className="flex-1">
//           <div className="flex justify-between">
//           <div>

//           <h1 className="text-xl sm:text-2xl font-bold mb-4">Book Your Sessions</h1>
//           <p className="text-sm text-gray-600 mb-4">
//             Showing {filteredGroupSessions.length} of {groupSessions.length} group sessions
//             {selectedSubCategory !== "All" ? ` for ${selectedSubCategory}` : selectedMainCategory !== "All" ? ` in ${selectedMainCategory}` : ""}
//           </p>
//           </div>

//           <div className="flex flex-wrap gap-4 items-center mb-4">
//           <span className="font-semibold text-gray-700">Filter Options:</span>

//           {/* Main Category */}
//           <div className="w-64">
//             <Select value={selectedMainCategory} onValueChange={(val) => {
//               setSelectedMainCategory(val);
//               setSelectedSubCategory("All"); // reset subcategory
//             }}>
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Main Category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="All">All Categories</SelectItem>
//                 {Object.keys(mentorshipCategories).map((main) => (
//                   <SelectItem key={main} value={main}>{main}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Subcategory */}
//           <div className="w-64">
//             <Select value={selectedSubCategory} onValueChange={setSelectedSubCategory}>
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Subcategory" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="All">All</SelectItem>
//                 {selectedMainCategory !== "All" &&
//                   mentorshipCategories[selectedMainCategory].map((sub) => (
//                     <SelectItem key={sub} value={sub}>{sub}</SelectItem>
//                   ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </div></div>


//           <Tabs defaultValue="group" className="w-full">
//             <TabsContent value="group">
//               {loading ? (
//                 <p className="text-center text-gray-500">Loading...</p>
//               ) : filteredGroupSessions.length === 0 ? (
//                 <p className="text-center text-gray-500">No sessions available.</p>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
//                   {filteredGroupSessions.map((session) => (
//                     <SessionCard
//                       key={session._id || session.id}
//                       id={session._id || session.id}
//                       title={session.title}
//                       mentor={session.mentorName || session.mentor}
//                       date={session.date}
//                       time={session.time}
//                       duration={session.duration}
//                       availableSlots={session.seats - (session.bookedStudents?.length || 0)}
//                       totalSlots={session.seats}
//                       rating={session.rating || 0.0}
//                       subjects={Array.isArray(session.subjects) ? session.subjects : [session.subject || "General"]}
//                       price={session.price}
//                       students={session.bookedStudents || []}
//                     />
//                   ))}
//                 </div>
//               )}
//             </TabsContent>
//           </Tabs>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default BookingSessions;



import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SessionCard from "@/components/SessionCard";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "axios";

const mentorshipCategories = {
  "School & Academic": [
    "Primary & Secondary (Class 1–10)",
    "Higher Secondary (Class 11–12)",
    "Olympiads & NTSE",
    "Board Exam Preparation",
    "Subject-Specific Mentoring (Math, Science, English, etc.)",
  ],
  "Competitive Exams": [
    "JEE Preparation",
    "NEET Preparation",
    "UPSC / Civil Services",
    "SSC / Banking / Railways",
    "CAT / MBA Entrance",
    "GATE / GRE / GMAT",
    "NDA / CDS (Defence)",
  ],
  "Engineering & Tech": [
    "Mechanical Engineering",
    "Electrical & Electronics",
    "Civil Engineering",
    "Computer Science & IT",
    "Chemical Engineering",
    "Robotics & Automation",
    "Aerospace Engineering",
  ],
  "Medical & Healthcare": [
    "MBBS Preparation",
    "Nursing Careers",
    "Pharmacy & Paramedical",
    "Dentistry",
    "Allied Health Sciences",
    "Overseas Medical Licensing (USMLE, PLAB, etc.)",
  ],
  "Management & Finance": [
    "Chartered Accountancy (CA)",
    "Company Secretary (CS)",
    "Cost & Management Accounting (CMA)",
    "MBA Specializations",
    "Stock Market & Investment",
    "Financial Analysis & Consulting",
  ],
  "Study Abroad": [
    "US / Canada Admissions",
    "UK / Europe Admissions",
    "Australia / NZ Admissions",
    "Scholarships & Funding Guidance",
    "Visa & Application Guidance",
    "Language Tests (IELTS, TOEFL, PTE)",
  ],
  "Creative & Media": [
    "Design (Graphic, Product, UI/UX)",
    "Photography & Videography",
    "Film & Acting",
    "Writing & Journalism",
    "Fine Arts & Animation",
    "Music & Performing Arts",
  ],
  "Government & PSU Jobs": [
    "UPSC Mentorship",
    "SSC / Railway Exams",
    "Banking (IBPS, SBI, RBI)",
    "Defence & Paramilitary",
    "Public Sector Undertakings (GAIL, ONGC, BHEL, etc.)",
  ],
  Entrepreneurship: [
    "Startup Mentorship",
    "Business Strategy",
    "Funding & Pitching",
    "Product Development",
    "Marketing & Growth Hacking",
    "Leadership & Team Building",
  ],
  "IT & Digital Skills": [
    "Software Development",
    "Data Science & AI",
    "Cybersecurity",
    "Cloud Computing & DevOps",
    "Web & App Development",
    "Blockchain & Web3",
    "Digital Marketing",
    "Computer Science"
  ],
  "Personality & Life Skills": [
    "Public Speaking & Communication",
    "Soft Skills & Confidence Building",
    "Career Counselling",
    "Time Management & Productivity",
    "Mindfulness & Stress Management",
    "Leadership & Teamwork",
  ],
  "Law & Misc Careers": [
    "Law Entrance Exams (CLAT, LSAT)",
    "Judiciary Preparation",
    "Corporate Law Careers",
    "NGO & Social Work",
    "Education & Teaching",
    "Other Niche Career Guidance",
  ],
};

const BookingSessions = () => {
  const { user, loading } = useUser(); // Added loading state
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<any[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [selectedMainCategory, setSelectedMainCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login"); // Redirect only after loading is complete and user is absent
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/sessions`);
        setSessions(res.data);
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      } finally {
        setLoadingSessions(false);
      }
    };
    fetchSessions();
  }, []);

  const groupSessions = sessions.filter((session) => session.type === "group");

  const normalize = (str: string) => str?.toLowerCase().replace(/\s+/g, "");

  const filterByCategory = (sessions: any[]) => {
    if (selectedMainCategory === "All") return sessions;

    const subs = mentorshipCategories[selectedMainCategory].map(sub => normalize(sub));

    if (selectedSubCategory && selectedSubCategory !== "All") {
      return sessions.filter((s) => {
        const sessionSubjects = Array.isArray(s.subjects) ? s.subjects : [s.subject || "General"];
        return sessionSubjects.some((subj: string) => normalize(subj) === normalize(selectedSubCategory));
      });
    }

    return sessions.filter((s) => {
      const sessionSubjects = Array.isArray(s.subjects) ? s.subjects : [s.subject || "General"];
      return sessionSubjects.some((subj: string) => subs.includes(normalize(subj)));
    });
  };

  const filteredGroupSessions = filterByCategory(groupSessions);

  if (loading || !user) {
    // Wait until user state is known
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        <section className="flex-1">
          <div className="flex justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold mb-4">Book Your Sessions</h1>
              <p className="text-sm text-gray-600 mb-4">
                Showing {filteredGroupSessions.length} of {groupSessions.length} group sessions
                {selectedSubCategory !== "All" ? ` for ${selectedSubCategory}` : selectedMainCategory !== "All" ? ` in ${selectedMainCategory}` : ""}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 items-center mb-4">
              <span className="font-semibold text-gray-700">Filter Options:</span>
              <div className="w-64">
                <Select value={selectedMainCategory} onValueChange={(val) => {
                  setSelectedMainCategory(val);
                  setSelectedSubCategory("All");
                }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Main Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    {Object.keys(mentorshipCategories).map((main) => (
                      <SelectItem key={main} value={main}>{main}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-64">
                <Select value={selectedSubCategory} onValueChange={setSelectedSubCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    {selectedMainCategory !== "All" &&
                      mentorshipCategories[selectedMainCategory].map((sub) => (
                        <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Tabs defaultValue="group" className="w-full">
            <TabsContent value="group">
              {loadingSessions ? (
                <p className="text-center text-gray-500">Loading sessions...</p>
              ) : filteredGroupSessions.length === 0 ? (
                <p className="text-center text-gray-500">No sessions available.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredGroupSessions.map((session) => (
                    <SessionCard
                      key={session._id || session.id}
                      id={session._id || session.id}
                      title={session.title}
                      mentor={session.mentorName || session.mentor}
                      date={session.date}
                      time={session.time}
                      duration={session.duration}
                      availableSlots={session.seats - (session.bookedStudents?.length || 0)}
                      totalSlots={session.seats}
                      rating={session.rating || 0.0}
                      subjects={Array.isArray(session.subjects) ? session.subjects : [session.subject || "General"]}
                      price={session.price}
                      students={session.bookedStudents || []}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BookingSessions;
