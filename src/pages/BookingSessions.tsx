// import Navigation from "@/components/Navigation";
// import Footer from "@/components/Footer";
// import SessionCard from "@/components/SessionCard";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const BookingSessions = () => {
//   // Group sessions
//   // const groupSessions = [
//   //   {
//   //     id: "1",
//   //     title: "JEE Advanced Strategy",
//   //     mentor: "Dr. Arjun Mehta",
//   //     date: "Jan 25, 2024",
//   //     time: "10:00 AM",
//   //     duration: "1 hour",
//   //     availableSlots: 6,
//   //     totalSlots: 10,
//   //     rating: 4.9,
//   //     subjects: ["Physics", "Mathematics"],
//   //     price: 500,
//   //     type: "group"
//   //   },
//   //   {
//   //     id: "2",
//   //     title: "NEET Biology Mastery",
//   //     mentor: "Dr. Priya Sharma",
//   //     date: "Jan 26, 2024",
//   //     time: "2:00 PM",
//   //     duration: "1.5 hours",
//   //     availableSlots: 8,
//   //     totalSlots: 15,
//   //     rating: 4.8,
//   //     subjects: ["Biology", "Chemistry"],
//   //     price: 750,
//   //     type: "group"
//   //   },
//   //   {
//   //     id: "3",
//   //     title: "UPSC Current Affairs",
//   //     mentor: "Rahul Kumar",
//   //     date: "Jan 27, 2024",
//   //     time: "4:00 PM",
//   //     duration: "2 hours",
//   //     availableSlots: 0,
//   //     totalSlots: 20,
//   //     rating: 4.7,
//   //     subjects: ["History", "Geography"],
//   //     price: 600,
//   //     type: "group"
//   //   },
//   //   {
//   //     id: "4",
//   //     title: "Physics Problem Solving",
//   //     mentor: "Dr. Arjun Mehta",
//   //     date: "Jan 28, 2024",
//   //     time: "11:00 AM",
//   //     duration: "1 hour",
//   //     availableSlots: 5,
//   //     totalSlots: 12,
//   //     rating: 4.9,
//   //     subjects: ["Physics"],
//   //     price: 450,
//   //     type: "group"
//   //   },
//   //   {
//   //     id: "5",
//   //     title: "Mathematics Fundamentals",
//   //     mentor: "Prof. Vikram Singh",
//   //     date: "Jan 29, 2024",
//   //     time: "9:00 AM",
//   //     duration: "2 hours",
//   //     availableSlots: 12,
//   //     totalSlots: 18,
//   //     rating: 4.6,
//   //     subjects: ["Mathematics"],
//   //     price: 550,
//   //     type: "group"
//   //   },
//   //   {
//   //     id: "6",
//   //     title: "Chemistry Organic Concepts",
//   //     mentor: "Dr. Sneha Patel",
//   //     date: "Jan 30, 2024",
//   //     time: "3:00 PM",
//   //     duration: "1.5 hours",
//   //     availableSlots: 7,
//   //     totalSlots: 12,
//   //     rating: 4.8,
//   //     subjects: ["Chemistry"],
//   //     price: 650,
//   //     type: "group"
//   //   },
//   //   {
//   //     id: "7",
//   //     title: "English Grammar & Writing",
//   //     mentor: "Ms. Riya Gupta",
//   //     date: "Feb 1, 2024",
//   //     time: "1:00 PM",
//   //     duration: "1 hour",
//   //     availableSlots: 10,
//   //     totalSlots: 15,
//   //     rating: 4.5,
//   //     subjects: ["English"],
//   //     price: 400,
//   //     type: "group"
//   //   },
//   //   {
//   //     id: "8",
//   //     title: "Computer Science Coding",
//   //     mentor: "Mr. Amit Sharma",
//   //     date: "Feb 2, 2024",
//   //     time: "5:00 PM",
//   //     duration: "2 hours",
//   //     availableSlots: 3,
//   //     totalSlots: 8,
//   //     rating: 4.9,
//   //     subjects: ["Computer Science"],
//   //     price: 800,
//   //     type: "group"
//   //   },
//   //   {
//   //     id: "9",
//   //     title: "Economics Micro & Macro",
//   //     mentor: "Dr. Rajesh Khanna",
//   //     date: "Feb 3, 2024",
//   //     time: "11:00 AM",
//   //     duration: "1.5 hours",
//   //     availableSlots: 9,
//   //     totalSlots: 14,
//   //     rating: 4.7,
//   //     subjects: ["Economics"],
//   //     price: 600,
//   //     type: "group"
//   //   },
//   //   {
//   //     id: "10",
//   //     title: "Biology Cell Structure",
//   //     mentor: "Dr. Priya Sharma",
//   //     date: "Feb 4, 2024",
//   //     time: "2:30 PM",
//   //     duration: "1 hour",
//   //     availableSlots: 6,
//   //     totalSlots: 10,
//   //     rating: 4.8,
//   //     subjects: ["Biology"],
//   //     price: 500,
//   //     type: "group"
//   //   },
//   //   {
//   //     id: "11",
//   //     title: "History World Wars",
//   //     mentor: "Prof. Suresh Kumar",
//   //     date: "Feb 5, 2024",
//   //     time: "10:30 AM",
//   //     duration: "2 hours",
//   //     availableSlots: 4,
//   //     totalSlots: 12,
//   //     rating: 4.6,
//   //     subjects: ["History"],
//   //     price: 550,
//   //     type: "group"
//   //   },
//   //   {
//   //     id: "12",
//   //     title: "Geography Climate Change",
//   //     mentor: "Dr. Meera Joshi",
//   //     date: "Feb 6, 2024",
//   //     time: "4:30 PM",
//   //     duration: "1.5 hours",
//   //     availableSlots: 8,
//   //     totalSlots: 16,
//   //     rating: 4.7,
//   //     subjects: ["Geography"],
//   //     price: 600,
//   //     type: "group"
//   //   }
//   // ];

//   // // One-to-one sessions
//   // const oneToOneSessions = [
//   //   {
//   //     id: "o1",
//   //     title: "Personal JEE Coaching",
//   //     mentor: "Dr. Arjun Mehta",
//   //     date: "Available",
//   //     time: "Flexible",
//   //     duration: "1 hour",
//   //     availableSlots: 1,
//   //     totalSlots: 1,
//   //     rating: 4.9,
//   //     subjects: ["Physics", "Mathematics"],
//   //     price: 2000,
//   //     type: "onetoone"
//   //   },
//   //   {
//   //     id: "o2",
//   //     title: "NEET Biology Personal Session",
//   //     mentor: "Dr. Priya Sharma",
//   //     date: "Available",
//   //     time: "Flexible",
//   //     duration: "1.5 hours",
//   //     availableSlots: 1,
//   //     totalSlots: 1,
//   //     rating: 4.8,
//   //     subjects: ["Biology"],
//   //     price: 2500,
//   //     type: "onetoone"
//   //   },
//   //   {
//   //     id: "o3",
//   //     title: "UPSC Personal Guidance",
//   //     mentor: "Rahul Kumar",
//   //     date: "Available",
//   //     time: "Flexible",
//   //     duration: "2 hours",
//   //     availableSlots: 1,
//   //     totalSlots: 1,
//   //     rating: 4.7,
//   //     subjects: ["History", "Geography"],
//   //     price: 3000,
//   //     type: "onetoone"
//   //   },
//   //   {
//   //     id: "o4",
//   //     title: "Physics Doubt Clearing",
//   //     mentor: "Dr. Arjun Mehta",
//   //     date: "Available",
//   //     time: "Flexible",
//   //     duration: "1 hour",
//   //     availableSlots: 1,
//   //     totalSlots: 1,
//   //     rating: 4.9,
//   //     subjects: ["Physics"],
//   //     price: 1800,
//   //     type: "onetoone"
//   //   },
//   //   {
//   //     id: "o5",
//   //     title: "Mathematics Personal Tutor",
//   //     mentor: "Prof. Vikram Singh",
//   //     date: "Available",
//   //     time: "Flexible",
//   //     duration: "1.5 hours",
//   //     availableSlots: 1,
//   //     totalSlots: 1,
//   //     rating: 4.6,
//   //     subjects: ["Mathematics"],
//   //     price: 2200,
//   //     type: "onetoone"
//   //   },
//   //   {
//   //     id: "o6",
//   //     title: "Chemistry One-on-One",
//   //     mentor: "Dr. Sneha Patel",
//   //     date: "Available",
//   //     time: "Flexible",
//   //     duration: "1 hour",
//   //     availableSlots: 1,
//   //     totalSlots: 1,
//   //     rating: 4.8,
//   //     subjects: ["Chemistry"],
//   //     price: 2000,
//   //     type: "onetoone"
//   //   }
//   // ];

//   const [sessions, setSessions] = useState([]);
//   const [loading, setLoading] = useState(true);

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

//   const groupSessions = sessions.filter(session => session.type === "group")|| [];
//   const oneToOneSessions = sessions.filter(session => session.type === "onetoone") || [];
//   console.log("Group Sessions:", groupSessions);
//   console.log("One-to-One Sessions:", oneToOneSessions);
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navigation />

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Your Sessions</h1>
//           <p className="text-gray-600">Choose from our available mentorship sessions and book your slot.</p>
//         </div>

//         <Tabs defaultValue="group" className="w-full">
//           <TabsList className="grid w-full grid-cols-2 mb-8">
//             <TabsTrigger value="group">Group Sessions</TabsTrigger>
//             <TabsTrigger value="onetoone">One-to-One Mentorship</TabsTrigger>
//           </TabsList>

//           {/* <TabsContent value="group">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {groupSessions.map((session) => (
//                 <SessionCard
//                   key={session.id}
//                   {...session}
//                   isBooked={session.availableSlots === 0}
//                 />
//               ))}
//             </div>
//           </TabsContent> */}

//           <TabsContent value="group">
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//     {groupSessions.map((session) => (
//       <SessionCard
//         key={session._id || session.id}
//         id={session._id || session.id}
//         title={session.title}
//         mentor={session.mentorName || session.mentor} // depending on source
//         date={session.date}
//         time={session.time}
//         duration={session.duration}
//         availableSlots={session.seats - (session.bookedStudents?.length || 0) } // adjust if needed
//         totalSlots={session.seats } // adjust if needed
//         rating={session.rating || 0.0} // fallback if not available
//         subjects={Array.isArray(session.subjects) ? session.subjects : [session.subject || "General"]}
//         price={session.price}
//         students={session.bookedStudents||[]}
//         // isBooked={false} // adjust if needed
//         // isBooked={(session.seats - (session.bookedSeats || 0)) === 0}
//       />
//     ))}
//   </div>
// </TabsContent>

//           {/* <TabsContent value="onetoone">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {oneToOneSessions.map((session) => (
//                 <SessionCard
//                   key={session.id}
//                   {...session}
//                   isBooked={false}
//                 />
//               ))}
//             </div>
//           </TabsContent> */}
//           <TabsContent value="onetoone">
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//     {oneToOneSessions.map((session) => (
//       <SessionCard
//         key={session._id || session.id}
//         id={session._id || session.id}
//         title={session.title}
//         mentor={session.mentorName || session.mentor}
//         date={session.date}
//         time={session.time}
//         duration={session.duration}
//         availableSlots={session.seats-(session.bookedStudents?.length || 0)}
//         totalSlots={session.seats || 1}
//         rating={session.rating || 0.0}
//         subjects={Array.isArray(session.subjects) ? session.subjects : [session.subject || "General"]}
//         price={session.price}
//         isBooked={(session.availableSlots || 1) === 0}
//         students={session.bookedStudents||[]}
//       />
//     ))}
//   </div>
// </TabsContent>

//         </Tabs>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default BookingSessions;
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SessionCard from "@/components/SessionCard";
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
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMainCategory, setSelectedMainCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/sessions`);
        setSessions(res.data);
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const groupSessions = sessions.filter((session) => session.type === "group");

  const normalize = (str: string) => str?.toLowerCase().replace(/\s+/g, "");

  const filterByCategory = (sessions: any[]) => {
  // No main category selected
  if (selectedMainCategory === "All") return sessions;

  const subs = mentorshipCategories[selectedMainCategory].map(sub => normalize(sub));

  if (selectedSubCategory && selectedSubCategory !== "All") {
    // Filter sessions that contain the selected subcategory in their subjects
    return sessions.filter((s) => {
      const sessionSubjects = Array.isArray(s.subjects) ? s.subjects : [s.subject || "General"];
      return sessionSubjects.some((subj: string) => normalize(subj) === normalize(selectedSubCategory));
    });
  }

  // Only main category selected, show sessions that match any subcategory
  return sessions.filter((s) => {
    const sessionSubjects = Array.isArray(s.subjects) ? s.subjects : [s.subject || "General"];
    return sessionSubjects.some((subj: string) => subs.includes(normalize(subj)));
  });
};


  const filteredGroupSessions = filterByCategory(groupSessions);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* Main content */}
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

          {/* Main Category */}
          <div className="w-64">
            <Select value={selectedMainCategory} onValueChange={(val) => {
              setSelectedMainCategory(val);
              setSelectedSubCategory("All"); // reset subcategory
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

          {/* Subcategory */}
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
        </div></div>


          <Tabs defaultValue="group" className="w-full">
            <TabsContent value="group">
              {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
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