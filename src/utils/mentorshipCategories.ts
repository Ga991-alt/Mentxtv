// mentorshipCategories.ts
export const mentorshipCategories: Record<string, string[]> = {
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
    "Computer Science",
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

// utils.ts
export const normalize = (str: string) =>
  str?.toLowerCase().replace(/\s+/g, "");

export const filterByCategory = (
  sessions: any[],
  selectedMainCategory: string,
  selectedSubCategory: string
) => {
  if (selectedMainCategory === "All") return sessions;

  const subs = mentorshipCategories[selectedMainCategory].map(normalize);

  if (selectedSubCategory && selectedSubCategory !== "All") {
    return sessions.filter((s) => {
      const sessionSubjects = Array.isArray(s.subjects)
        ? s.subjects
        : [s.subject || "General"];
      return sessionSubjects.some(
        (subj: string) => normalize(subj) === normalize(selectedSubCategory)
      );
    });
  }

  return sessions.filter((s) => {
    const sessionSubjects = Array.isArray(s.subjects)
      ? s.subjects
      : [s.subject || "General"];
    return sessionSubjects.some((subj: string) =>
      subs.includes(normalize(subj))
    );
  });
};
