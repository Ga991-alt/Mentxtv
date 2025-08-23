import React, { createContext, useContext, useState, ReactNode } from "react";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
  status: "draft" | "published";
  socialMedia: {
    instagram: string;
    twitter: string;
    linkedin: string;
  };
}

interface BlogContextType {
  blogs: BlogPost[];
  addBlog: (blog: BlogPost) => void;
  updateBlog: (id: string, blog: Partial<BlogPost>) => void;
  deleteBlog: (id: string) => void;
  getPublishedBlogs: () => BlogPost[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const initialBlogs: BlogPost[] = [
  {
    id: "1",
    title:
      "Highest Number of Students Appeared in JEE Main 2024 in the History of NTA",
    content:
      "This blog delves into key aspects of the JEE-Main 2024, including the selection criteria for JEE Advanced, percentile cutoffs, the perfect 100-percentile scorers, and state-wise toppers. Additionally, we explore the tie-breaking criteria introduced this year, ensuring a fair assessment for all participants.",
    category: "JEE Analysis",
    author: "MentxTv Team",
    date: "2024-11-15",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    status: "published",
    socialMedia: {
      instagram: "https://instagram.com/jeeanalysis",
      twitter: "https://twitter.com/jeeanalysis",
      linkedin: "https://linkedin.com/company/jeeanalysis",
    },
  },
  {
    id: "2",
    title:
      "Finding Your Guide to Success: Choosing the Perfect Mentor for NEET | MentxTv",
    content:
      "Finding Your Guide to Success: How to Choose the Perfect Mentor for NEET highlights the importance of mentorship in NEET preparation. It explains how the right mentor can offer essential guidance and support throughout your journey. Finding the right mentor is crucial for NEET preparation success.",
    category: "NEET Preparation",
    author: "Dr. Sharma",
    date: "2024-11-10",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
    status: "published",
    socialMedia: {
      instagram: "https://instagram.com/neetprep",
      twitter: "https://twitter.com/neetprep",
      linkedin: "https://linkedin.com/company/neetprep",
    },
  },
  {
    id: "3",
    title: "Empower Your Child: A Parent's Guide to Academic Excellence",
    content:
      "Discover effective ways to help your child thrive in school with our guide for parents. Learn simple strategies to empower your child, keep them motivated, and get involved in their learning journey. This comprehensive guide covers everything from creating study schedules to supporting your child emotionally.",
    category: "Parent Guide",
    author: "MentxTv Team",
    date: "2024-11-05",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
    status: "published",
    socialMedia: {
      instagram: "https://instagram.com/parentguide",
      twitter: "https://twitter.com/parentguide",
      linkedin: "https://linkedin.com/company/parentguide",
    },
  },
  {
    id: "4",
    title:
      "Next Level Prep: Top 10 Books for IIT-JEE and NEET Exam in 2025 Aspirant's",
    content:
      "Preparing for competitive exams like JEE and NEET can be overwhelming, but with the right books, it becomes more manageable. This blog highlights the top 10 essential books that every aspirant should consider for their preparation journey.",
    category: "Study Materials",
    author: "MentxTv Team",
    date: "2024-10-28",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop",
    status: "published",
    socialMedia: {
      instagram: "https://instagram.com/studymaterials",
      twitter: "https://twitter.com/studymaterials",
      linkedin: "https://linkedin.com/company/studymaterials",
    },
  },
  {
    id: "5",
    title: "Unlock Your Future: How to Choose the Right Stream",
    content:
      "Choosing the right academic stream is one of the most important decisions you'll make. This comprehensive guide will help you understand different streams and make an informed choice for your future career. We explore Science, Commerce, and Arts streams in detail.",
    category: "Career Guidance",
    author: "MentxTv Team",
    date: "2024-10-20",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    status: "published",
    socialMedia: {
      instagram: "https://instagram.com/careerguidance",
      twitter: "https://twitter.com/careerguidance",
      linkedin: "https://linkedin.com/company/careerguidance",
    },
  },
  {
    id: "6",
    title: "Topper-Approved Study Techniques for NEET/JEE 2025",
    content:
      "Learn the proven study methods used by top scorers in NEET and JEE. These techniques have been tested and approved by successful candidates and can significantly improve your preparation strategy. Discover time management, revision techniques, and more.",
    category: "Study Tips",
    author: "MentxTv Team",
    date: "2024-10-15",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    status: "published",
    socialMedia: {
      instagram: "https://instagram.com/studytips",
      twitter: "https://twitter.com/studytips",
      linkedin: "https://linkedin.com/company/studytips",
    },
  },
];

export const BlogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);

  const addBlog = (blog: BlogPost) => {
    setBlogs((prev) => [...prev, blog]);
  };

  const updateBlog = (id: string, updatedBlog: Partial<BlogPost>) => {
    setBlogs((prev) =>
      prev.map((blog) => (blog.id === id ? { ...blog, ...updatedBlog } : blog))
    );
  };

  const deleteBlog = (id: string) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
  };

  const getPublishedBlogs = () => {
    return blogs.filter((blog) => blog.status === "published");
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        addBlog,
        updateBlog,
        deleteBlog,
        getPublishedBlogs,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};
