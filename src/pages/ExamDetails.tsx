
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

const ExamDetails = () => {
  const [selectedExam, setSelectedExam] = useState("IIT (JEE)");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const exams = [
    "IIT (JEE)",
    "NEET", 
    "UPSC",
    "BITSAT",
    "GATE",
    "CLAT",
    "CA",
    "NIFT",
    "CAT"
  ];

  const examDetails = {
    "IIT (JEE)": {
      title: "IIT JEE Exam Details",
      highlights: "JEE 2026 Highlights",
      description: "The Joint Entrance Examination (JEE) is India's largest engineering entrance examination for undergraduate B.Tech and B.Arch courses in top institutes like IITs, NITs, IIITs, and CFTIs. JEE is conducted in two phases: JEE Main (by NTA) and JEE Advanced (by a designated IIT on rotation each year).",
      overview: {
        title: "JEE Main 2026 Overview",
        content: "JEE Main 2026 serves as the qualifying exam for NITs, IIITs, CFTIs, as well as eligibility for JEE Advanced. It is expected to remain a two-session exam in January and April, with a familiar format (MCQ and numerical value questions). For latest notifications, always refer to the official NTA JEE Main portal.",
        papers: [
          "JEE Main 2026 Paper 1: B.Tech/BE aspirants. 75 questions, 300 marks.",
          "JEE Main 2026 Paper 2A: B.Arch aspirants, 77 questions, 400 marks (drawing section offline).",
          "JEE Main 2026 Paper 2B: B.Plan aspirants, 100 MCQs, 400 marks."
        ]
      },
      examDates: [
        { event: "JEE Main 2026 Registration Start Date", date: "November 2025" },
        { event: "Last Date To Apply Online", date: "December 2025" },
        { event: "JEE Main 2026 Admit Card Release Date", date: "3 Days Before The Exam" },
        { event: "JEE Main 2026 Session 1 Exam Date", date: "January 2026" },
        { event: "JEE Main 2026 Session 2 Exam Date", date: "April 2026" },
        { event: "JEE Main 2026 Result Announcement", date: "A Week After Each Session" }
      ],
      eligibility: [
        { criteria: "Qualifying Exam", details: "Completed Class 12 or Equivalent From A Recognized Board/University Or A 3-Year Diploma Recognized By AICTE." },
        { criteria: "Nationality", details: "Indian Citizens, NRIs, PIOs, And OCIs Are Eligible." },
        { criteria: "Subject Requirements", details: "B.Tech (Paper 1): Physics, Mathematics, And One Additional Subject (Chemistry/Biology/Technical Vocational Subject). B.Arch (Paper 2A): Physics, Chemistry, And Mathematics. B.Plan (Paper 2B): Mathematics." }
      ],
      syllabus: {
        mathematics: ["Sets, Relations, and Functions", "Complex Numbers and Quadratic Equations", "Matrices and Determinants", "Permutation and Combination", "Binomial Theorem and Its Applications", "Sequence and Series", "Limit, Continuity, and Differentiability"],
        physics: ["Physics and Measurement", "Kinematics", "Laws of Motion", "Work, Energy and Power", "Rotational Motion", "Gravitation", "Properties of Solids and Liquids"],
        chemistry: ["Some Basic Concepts in Chemistry", "Atomic Structure", "Chemical Bonding and Molecular Structure", "Chemical Thermodynamics", "Solutions", "Equilibrium", "Redox Reactions and Electrochemistry"]
      },
      examPattern: [
        { particular: "Mode of Exam", paper1: "Computer-based (Online)", paper2A: "Online (Aptitude/Math) & Offline (Drawing)", paper2B: "Online" },
        { particular: "Duration", paper1: "3 hours", paper2A: "3 hours", paper2B: "3 hours" },
        { particular: "Number of Sections", paper1: "3 (Physics, Chemistry, Mathematics)", paper2A: "3 (Mathematics, Aptitude, Drawing)", paper2B: "3 (Mathematics, Aptitude, Planning)" },
        { particular: "Total Number of Questions", paper1: "75", paper2A: "77", paper2B: "100" },
        { particular: "Total Marks", paper1: "300", paper2A: "400", paper2B: "400" },
        { particular: "Type of Questions", paper1: "MCQs, Numerical values", paper2A: "Mathematics: MCQs + Numerical, Aptitude: MCQs, Drawing (Offline)", paper2B: "Mathematics: MCQs + Numerical, Aptitude: MCQs, Planning: MCQs" },
        { particular: "Marking Scheme", paper1: "+4 for correct, -1 for incorrect, 0 for unattempted", paper2A: "+4 for correct, -1 for incorrect (50 marks for Drawing)", paper2B: "+4 for correct, -1 for incorrect" },
        { particular: "Languages", paper1: "13 languages available (English, Hindi, regional)", paper2A: "13 languages available", paper2B: "13 languages available" }
      ],
      advanced: {
        title: "JEE Advanced 2025 Overview",
        description: "JEE Advanced is for students qualifying JEE Main and aiming for IIT admission. Structure and eligibility change slightly each year based on IIT organizing the exam (2025: IIT Kanpur).",
        examDates: [
          { activity: "Online Registration for JEE (Advanced) 2025", date: "April 23, 2025" },
          { activity: "Admit Card available for downloading", date: "May 02, 2025" },
          { activity: "JEE Advanced 2025 Exam Date", date: "May 18, 2025" },
          { activity: "Copy of candidate responses available on the JEE (Advanced) 2025 website", date: "May 22, 2025" },
          { activity: "Release of provisional answer keys", date: "May 26, 2025" },
          { activity: "Challenge window of provisional answer keys", date: "May 26 to 27, 2025" },
          { activity: "Online Announcement of JEE Advanced 2025 Final Answer Key and Results", date: "June 2, 2025" }
        ]
      }
    },
    "NEET": {
      title: "NEET Exam Details",
      highlights: "NEET 2026 Highlights",
      description: "The National Eligibility cum Entrance Test (NEET) is the single entrance examination for admission to MBBS, BDS, AYUSH and other medical courses in India. It is conducted by the National Testing Agency (NTA).",
      overview: {
        title: "NEET 2026 Overview",
        content: "NEET 2026 is expected to be conducted in May 2026. The exam will be conducted in offline mode (pen and paper based) in multiple languages including English, Hindi, and regional languages.",
        papers: [
          "Single paper consisting of 180 questions from Physics, Chemistry, and Biology (Botany & Zoology)",
          "Duration: 3 hours 20 minutes",
          "Total marks: 720"
        ]
      },
      examDates: [
        { event: "NEET 2026 Registration Start Date", date: "March 2026" },
        { event: "Last Date To Apply Online", date: "April 2026" },
        { event: "NEET 2026 Admit Card Release", date: "1 week before exam" },
        { event: "NEET 2026 Exam Date", date: "May 2026" },
        { event: "NEET 2026 Result Declaration", date: "June 2026" }
      ],
      eligibility: [
        { criteria: "Qualifying Exam", details: "Must have passed Class 12th with Physics, Chemistry, Biology/Biotechnology and English" },
        { criteria: "Age Limit", details: "Minimum 17 years, maximum 25 years (30 for reserved categories)" },
        { criteria: "Minimum Marks", details: "50% in PCB for General/OBC, 40% for SC/ST/OPH" }
      ]
    },
    "UPSC": {
      title: "UPSC Civil Services Exam Details",
      highlights: "UPSC CSE 2026 Highlights",
      description: "The Union Public Service Commission conducts the Civil Services Examination to recruit candidates for various Group A and Group B central services like IAS, IFS, IPS, and other allied services.",
      overview: {
        title: "UPSC CSE 2026 Overview",
        content: "The UPSC Civil Services Exam consists of three stages: Preliminary Examination (objective type), Main Examination (written), and Personality Test (Interview). The entire process takes about one year to complete.",
        papers: [
          "Prelims: 2 papers (General Studies + CSAT)",
          "Mains: 9 papers (Essay, 4 GS papers, 2 Optional papers, 2 Language papers)",
          "Interview: Personality Test"
        ]
      },
      examDates: [
        { event: "UPSC CSE 2026 Notification", date: "February 2026" },
        { event: "Application Deadline", date: "March 2026" },
        { event: "Prelims Exam Date", date: "June 2026" },
        { event: "Mains Exam Date", date: "September-October 2026" },
        { event: "Interview/Personality Test", date: "February-April 2027" }
      ],
      eligibility: [
        { criteria: "Educational Qualification", details: "Bachelor's degree from recognized university" },
        { criteria: "Age Limit", details: "21-32 years (relaxation for reserved categories)" },
        { criteria: "Attempt Limit", details: "6 attempts for General, 9 for OBC, unlimited for SC/ST" }
      ]
    },
    "BITSAT": {
      title: "BITSAT Exam Details",
      highlights: "BITSAT 2026 Highlights",
      description: "Birla Institute of Technology and Science Admission Test (BITSAT) is conducted by BITS Pilani for admission to its campuses in Pilani, Goa, and Hyderabad for various undergraduate engineering programs.",
      overview: {
        title: "BITSAT 2026 Overview",
        content: "BITSAT is a computer-based online test. The exam tests proficiency in Physics, Chemistry, Mathematics, English Proficiency & Logical Reasoning.",
        papers: [
          "Single paper with 150 questions",
          "Duration: 3 hours",
          "Subjects: Physics, Chemistry, Mathematics, English & Logical Reasoning"
        ]
      },
      examDates: [
        { event: "BITSAT 2026 Application Start", date: "January 2026" },
        { event: "Application Deadline", date: "March 2026" },
        { event: "BITSAT 2026 Exam Dates", date: "May-June 2026" },
        { event: "Result Declaration", date: "July 2026" }
      ],
      eligibility: [
        { criteria: "Educational Qualification", details: "12th pass with PCM and English, minimum 75% marks" },
        { criteria: "Age Limit", details: "No age limit" },
        { criteria: "JEE Main", details: "Should appear for JEE Main 2026" }
      ]
    },
    "GATE": {
      title: "GATE Exam Details",
      highlights: "GATE 2026 Highlights",
      description: "Graduate Aptitude Test in Engineering (GATE) is conducted for admission to postgraduate programs in engineering, technology, and architecture, and for recruitment in PSUs.",
      overview: {
        title: "GATE 2026 Overview",
        content: "GATE is conducted jointly by IISc and seven IITs. The exam is conducted in 27 subjects/papers. It's a computer-based test.",
        papers: [
          "27 different papers across various engineering disciplines",
          "Duration: 3 hours",
          "Total marks: 100"
        ]
      },
      examDates: [
        { event: "GATE 2026 Registration Start", date: "August 2025" },
        { event: "Application Deadline", date: "September 2025" },
        { event: "GATE 2026 Exam Dates", date: "February 2026" },
        { event: "Result Declaration", date: "March 2026" }
      ],
      eligibility: [
        { criteria: "Educational Qualification", details: "BE/B.Tech or currently in final year" },
        { criteria: "Age Limit", details: "No age limit" },
        { criteria: "Subjects", details: "Choose from 27 available papers" }
      ]
    },
    "CLAT": {
      title: "CLAT Exam Details",
      highlights: "CLAT 2026 Highlights",
      description: "Common Law Admission Test (CLAT) is conducted for admission to undergraduate and postgraduate law programs in National Law Universities across India.",
      overview: {
        title: "CLAT 2026 Overview",
        content: "CLAT is conducted in offline mode. The UG exam tests English, Current Affairs, Legal Reasoning, Logical Reasoning, and Quantitative Techniques.",
        papers: [
          "UG CLAT: 120 questions in 2 hours",
          "PG CLAT: 100 questions in 2 hours",
          "Subjects vary for UG and PG"
        ]
      },
      examDates: [
        { event: "CLAT 2026 Registration", date: "January 2026" },
        { event: "Application Deadline", date: "April 2026" },
        { event: "CLAT 2026 Exam Date", date: "May 2026" },
        { event: "Result Declaration", date: "June 2026" }
      ],
      eligibility: [
        { criteria: "UG CLAT", details: "12th pass with 45% marks (40% for SC/ST)" },
        { criteria: "PG CLAT", details: "LLB degree with 50% marks (45% for SC/ST)" },
        { criteria: "Age Limit", details: "No upper age limit" }
      ]
    },
    "CA": {
      title: "CA Exam Details",
      highlights: "CA 2026 Highlights",
      description: "Chartered Accountancy is conducted by the Institute of Chartered Accountants of India (ICAI). It consists of three levels: Foundation, Intermediate, and Final.",
      overview: {
        title: "CA 2026 Overview",
        content: "CA course has three levels. Students can enter at Foundation level after 12th or Intermediate level after graduation. Each level has specific subjects and requirements.",
        papers: [
          "Foundation: 4 papers",
          "Intermediate: 8 papers (2 groups)",
          "Final: 8 papers (2 groups)"
        ]
      },
      examDates: [
        { event: "CA Foundation May 2026", date: "May 2026" },
        { event: "CA Intermediate May 2026", date: "May 2026" },
        { event: "CA Final May 2026", date: "May 2026" },
        { event: "CA Foundation Nov 2026", date: "November 2026" }
      ],
      eligibility: [
        { criteria: "Foundation", details: "12th pass from recognized board" },
        { criteria: "Intermediate", details: "Graduation or Foundation pass" },
        { criteria: "Final", details: "Intermediate pass + 3 years articleship" }
      ]
    },
    "NIFT": {
      title: "NIFT Exam Details",
      highlights: "NIFT 2026 Highlights",
      description: "National Institute of Fashion Technology conducts entrance examination for admission to undergraduate and postgraduate programs in fashion and design.",
      overview: {
        title: "NIFT 2026 Overview",
        content: "NIFT entrance exam consists of written test and situation test/group discussion/interview depending on the program.",
        papers: [
          "Written Test: GAT (General Ability Test) + CAT (Creative Ability Test)",
          "Situation Test for some programs",
          "GD/PI for postgraduate programs"
        ]
      },
      examDates: [
        { event: "NIFT 2026 Registration", date: "December 2025" },
        { event: "Application Deadline", date: "January 2026" },
        { event: "NIFT 2026 Exam Date", date: "February 2026" },
        { event: "Result Declaration", date: "April 2026" }
      ],
      eligibility: [
        { criteria: "UG Programs", details: "12th pass from recognized board" },
        { criteria: "PG Programs", details: "Graduation in relevant field" },
        { criteria: "Age Limit", details: "23 years for UG, 30 years for PG" }
      ]
    },
    "CAT": {
      title: "CAT Exam Details",
      highlights: "CAT 2026 Highlights",
      description: "Common Admission Test (CAT) is conducted for admission to MBA programs in IIMs and other top B-schools in India.",
      overview: {
        title: "CAT 2026 Overview",
        content: "CAT is a computer-based test conducted annually. The exam tests Verbal Ability, Data Interpretation & Logical Reasoning, and Quantitative Ability.",
        papers: [
          "Single test with 3 sections",
          "Duration: 2 hours (40 minutes per section)",
          "Total questions: around 66"
        ]
      },
      examDates: [
        { event: "CAT 2026 Registration", date: "August 2026" },
        { event: "Application Deadline", date: "September 2026" },
        { event: "CAT 2026 Exam Date", date: "November 2026" },
        { event: "Result Declaration", date: "January 2027" }
      ],
      eligibility: [
        { criteria: "Educational Qualification", details: "Bachelor's degree with 50% marks (45% for SC/ST/PwD)" },
        { criteria: "Age Limit", details: "No age limit" },
        { criteria: "Final Year", details: "Final year students can also apply" }
      ]
    }
  };

  const currentExam = examDetails[selectedExam];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Dropdown Navigation */}
          <div className="mb-8">
            <div className="relative inline-block">
              <Button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                variant="outline"
                className="w-64 justify-between border-blue-500 text-blue-600 hover:bg-blue-50 py-3 px-4"
              >
                {selectedExam}
                <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-64 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  {exams.map((exam) => (
                    <button
                      key={exam}
                      onClick={() => {
                        setSelectedExam(exam);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      {exam}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Exam Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{currentExam.title}</h1>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">{currentExam.highlights}</h2>
                <p className="text-gray-700 leading-relaxed">{currentExam.description}</p>
              </div>
            </div>

            {/* Overview Section */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{currentExam.overview.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{currentExam.overview.content}</p>
              <ul className="space-y-2">
                {currentExam.overview.papers.map((paper, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">{paper}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exam Dates */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{selectedExam} Exam Dates</h2>
              <div className="bg-cyan-100 rounded-lg p-4 mb-4">
                <h3 className="text-xl font-semibold text-center text-gray-700">{selectedExam} Exam Dates</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Event</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Tentative Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentExam.examDates.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-4 px-4 text-gray-900">{item.event}</td>
                        <td className="py-4 px-4 text-gray-700">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{selectedExam} Eligibility Criteria</h2>
              <div className="bg-cyan-100 rounded-lg p-4 mb-4">
                <h3 className="text-xl font-semibold text-center text-gray-700">{selectedExam} Eligibility Criteria</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Eligibility Criteria</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentExam.eligibility.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-4 px-4 text-gray-900">{item.criteria}</td>
                        <td className="py-4 px-4 text-gray-700">{item.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Additional JEE-specific content */}
            {selectedExam === "IIT (JEE)" && (
              <>
                {/* Syllabus */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">JEE Main 2026 Syllabus</h2>
                  <p className="text-gray-700 mb-6">Syllabus is based on Physics, Chemistry, and Mathematics (Class 11/12 NCERT). Confirm updates on the NTA exam portal each year.</p>
                  
                  <div className="bg-cyan-100 rounded-lg p-4 mb-4">
                    <h3 className="text-xl font-semibold text-center text-gray-700">Breakdown of JEE Main 2026 Syllabus</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold text-blue-900 mb-4">Mathematics</h4>
                      <ul className="space-y-2">
                        {currentExam.syllabus.mathematics.map((topic, index) => (
                          <li key={index} className="text-gray-700">{topic}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-blue-900 mb-4">Physics</h4>
                      <ul className="space-y-2">
                        {currentExam.syllabus.physics.map((topic, index) => (
                          <li key={index} className="text-gray-700">{topic}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-blue-900 mb-4">Chemistry</h4>
                      <ul className="space-y-2">
                        {currentExam.syllabus.chemistry.map((topic, index) => (
                          <li key={index} className="text-gray-700">{topic}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Exam Pattern */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">JEE Main 2026 Exam Pattern</h2>
                  <p className="text-gray-700 mb-6">For pattern, structure, and marking, see the table below.</p>
                  
                  <div className="bg-cyan-100 rounded-lg p-4 mb-4">
                    <h3 className="text-xl font-semibold text-center text-gray-700">JEE Main 2026 Exam Pattern Overview</h3>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-200 py-3 px-4 text-left font-semibold text-gray-700">Particulars</th>
                          <th className="border border-gray-200 py-3 px-4 text-left font-semibold text-gray-700">Paper 1 (B.Tech/B.E.)</th>
                          <th className="border border-gray-200 py-3 px-4 text-left font-semibold text-gray-700">Paper 2A (B.Arch)</th>
                          <th className="border border-gray-200 py-3 px-4 text-left font-semibold text-gray-700">Paper 2B (B.Plan)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentExam.examPattern.map((row, index) => (
                          <tr key={index}>
                            <td className="border border-gray-200 py-3 px-4 font-medium text-gray-900">{row.particular}</td>
                            <td className="border border-gray-200 py-3 px-4 text-gray-700">{row.paper1}</td>
                            <td className="border border-gray-200 py-3 px-4 text-gray-700">{row.paper2A}</td>
                            <td className="border border-gray-200 py-3 px-4 text-gray-700">{row.paper2B}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* JEE Advanced */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{currentExam.advanced.title}</h2>
                  <p className="text-gray-700 mb-6">{currentExam.advanced.description}</p>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">JEE Advanced 2025 Exam Dates</h3>
                  <p className="text-gray-700 mb-4">The main exam is typically conducted in mid-May.</p>
                  
                  <div className="bg-cyan-100 rounded-lg p-4 mb-4">
                    <h4 className="text-xl font-semibold text-center text-gray-700">JEE Advanced 2025 Exam Dates</h4>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-4 px-4 font-semibold text-gray-700">Activity</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-700">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentExam.advanced.examDates.map((item, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-4 px-4 text-gray-900">{item.activity}</td>
                            <td className="py-4 px-4 text-gray-700">{item.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ExamDetails;
