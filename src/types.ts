// blogTypes.ts

export interface SocialMediaLinks {
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

export interface BlogPost {
  id: string;           // Unique identifier for the blog
  title: string;        // Blog title
  content: string;      // Blog content
  category: string;     // Blog category (e.g., JEE Analysis, NEET Preparation, etc.)
  author: string;       // Author name
  date: string;         // ISO string or YYYY-MM-DD format
  image: string;        // Image URL
  status: "published" | "draft" | "archived"; // Blog status
  socialMedia: SocialMediaLinks; // Related social media links
}
