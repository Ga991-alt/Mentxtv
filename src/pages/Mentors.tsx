import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Enhanced mentorship categories from BookingSessions
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

interface Feedback {
  rating: number;
  comment: string;
}

interface SessionData {
  _id: string;
  feedbacks: Feedback[];
}

interface Mentor {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  bio: string;
  subjects: string[];
  education: string;
  expertise: string[];
  profilePic: string;
  domin: string;
  sessions: string[];
  reviews: number;
  canSub: boolean;
}

const renderStars = (rating: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={16}
      className={
        i < Math.floor(rating)
          ? "text-yellow-400 fill-current"
          : "text-gray-300"
      }
    />
  ));

const Mentors = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [selectedMainCategory, setSelectedMainCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Mentors | MentxTv";
  }, []);

  // Fetch mentors
  useEffect(() => {
    // const fetchMentors = async () => {
    //   try {
    //     const res = await fetch(
    //       `${import.meta.env.VITE_API_BASE_URL}/api/mentors`
    //     );
    //     if (!res.ok) throw new Error("Failed to fetch mentors");
    //     const data: Mentor[] = await res.json();
    //     setMentors(data);

    //     // Calculate ratings
    //     data.forEach((mentor) => fetchSessionsAndCalcRating(mentor));
    //   } catch (error) {
    //     console.error("Failed to fetch mentors", error);
    //   }
    // };
    const fetchMentors = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/mentors`
    );
    if (!res.ok) throw new Error("Failed to fetch mentors");
    const data: Mentor[] = await res.json();

    // For each mentor, fetch their subscriptions
    const mentorsWithSubsFlag = await Promise.all(
      data.map(async (mentor) => {
        try {
          const subRes = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/subscription-plans/mentor/${mentor._id}`
          );

          if (!subRes.ok)
            return { ...mentor, canSub: false, subscriptions: [] };

          const subData = await subRes.json();
          const plans = subData?.data;

          // If no plans or any plan has price 0
          const invalidPlans =
            !plans || !Array.isArray(plans) || plans.length === 0 || plans.some((plan: any) => plan.price === 0);

          if (invalidPlans) return { ...mentor, canSub: false, subscriptions: [] };

          // Valid plans
          return { ...mentor, canSub: true, subscriptions: plans };
        } catch (err) {
          console.error(`Failed to fetch subscription for mentor ${mentor._id}`, err);
          return { ...mentor, canSub: false, subscriptions: [] };
        }
      })
    );

    setMentors(mentorsWithSubsFlag);

    // Calculate ratings
    mentorsWithSubsFlag.forEach((mentor) => fetchSessionsAndCalcRating(mentor));
  } catch (error) {
    console.error("Failed to fetch mentors", error);
  }
};


    fetchMentors();
  }, []);

  // Calculate rating per mentor
  const fetchSessionsAndCalcRating = async (mentor: Mentor) => {
    try {
      if (!mentor.sessions || mentor.sessions.length === 0) {
        setRatings((prev) => ({ ...prev, [mentor._id]: 0 }));
        return;
      }

      let totalFeedback = 0;
      let feedbackCount = 0;

      const sessionPromises = mentor.sessions.map((sessionId) =>
        fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/sessions/${sessionId}`
        ).then((res) => res.json())
      );

      const sessionData: SessionData[] = await Promise.all(sessionPromises);

      sessionData.forEach((session) => {
        if (session?.feedbacks?.length) {
          session.feedbacks.forEach((feedback) => {
            totalFeedback += feedback.rating;
            feedbackCount++;
          });
        }
      });

      const avgRating = feedbackCount > 0 ? totalFeedback / feedbackCount : 0;
      setRatings((prev) => ({ ...prev, [mentor._id]: avgRating }));
    } catch (err) {
      console.error("Error calculating mentor rating:", err);
      setRatings((prev) => ({ ...prev, [mentor._id]: 0 }));
    }
  };

  const normalize = (str: string) => str?.toLowerCase().replace(/\s+/g, "");

  // Filter mentors by selected category
  const filterByCategory = (mentors: Mentor[]) => {
    if (selectedMainCategory === "All") return mentors;

    const subs =
      mentorshipCategories[selectedMainCategory]?.map((sub) =>
        normalize(sub)
      ) || [];

    const createMatchingPatterns = (category: string) => {
      const normalized = normalize(category);
      const patterns = [
        normalized,
        normalized.replace("preparation", ""),
        normalized.replace("prep", ""),
        normalized.split("/")[0],
        category.toLowerCase().split(" ")[0],
        category.toLowerCase().replace(/\s+/g, ""),
      ];
      return [...new Set(patterns.filter(Boolean))];
    };

    if (selectedSubCategory && selectedSubCategory !== "All") {
      const targetPatterns = createMatchingPatterns(selectedSubCategory);
      return mentors.filter((mentor) => {
        const mentorDomains = [
          mentor.domin,
          ...(mentor.subjects || []),
          ...(mentor.expertise || []),
        ].filter(Boolean);
        return mentorDomains.some((domain) =>
          targetPatterns.some(
            (pattern) =>
              normalize(domain).includes(pattern) ||
              pattern.includes(normalize(domain))
          )
        );
      });
    }

    const allPatterns = subs.flatMap((sub) => createMatchingPatterns(sub));
    return mentors.filter((mentor) => {
      const mentorDomains = [
        mentor.domin,
        ...(mentor.subjects || []),
        ...(mentor.expertise || []),
      ].filter(Boolean);
      return mentorDomains.some((domain) =>
        allPatterns.some(
          (pattern) =>
            normalize(domain).includes(pattern) ||
            pattern.includes(normalize(domain))
        )
      );
    });
  };

  const filteredMentors = useMemo(
    () => filterByCategory(mentors),
    [mentors, selectedMainCategory, selectedSubCategory]
  );

  const handleSubscribe = (mentorId: string) => {
    navigate(`/mentors/${mentorId}/subscribe`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Mentor</h1>
          <p className="text-gray-600">
            Browse mentors by category and subscribe to their plans.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Section */}
        <section className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-col gap-2 w-64">
            <Select
              value={selectedMainCategory}
              onValueChange={(val) => {
                setSelectedMainCategory(val);
                setSelectedSubCategory("All");
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Main Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {Object.keys(mentorshipCategories).map((main) => (
                  <SelectItem key={main} value={main}>
                    {main}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-64">
            <Select
              value={selectedSubCategory}
              onValueChange={setSelectedSubCategory}
              disabled={selectedMainCategory === "All"}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Subcategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                {selectedMainCategory !== "All" &&
                  mentorshipCategories[selectedMainCategory]?.map((sub) => (
                    <SelectItem key={sub} value={sub}>
                      {sub}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Mentor Cards */}
        {filteredMentors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No mentors found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((m) => (
              <Card key={m._id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="mb-4">
                      <AspectRatio ratio={1}>
                        {m.profilePic ? (
                          <img
                            src={m.profilePic}
                            alt={`${m.userId?.name} mentor portrait`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                            No Image
                          </div>
                        )}
                      </AspectRatio>
                    </div>

                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {m.userId?.name}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {m.domin}
                      </Badge>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex">{renderStars(ratings[m._id] ?? 0)}</div>
                      <span className="text-sm text-gray-600">
                        ({(ratings[m._id] ?? 0).toFixed(1)})
                      </span>
                      <div className="ml-auto flex items-center gap-1 text-sm text-gray-700">
                        <Users size={14} /> {m.sessions?.length || 0} sessions
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {m.domin || "General"}
                      </Badge>
                      {m.subjects?.slice(0, 2).map((subject, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {m.subjects && m.subjects.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{m.subjects.length - 2} more
                        </Badge>
                      )}
                    </div>

                    <div className="mt-6">
                      <Button className="w-full" disabled={!m.canSub} onClick={() => handleSubscribe(m._id)}>
                        {m.canSub?`Subscribe`:`No Subscription Plans`}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Mentors;
