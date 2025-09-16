import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { BlogPost } from "../types";

interface BlogContextType {
  blogs: BlogPost[];
  addBlog: (blog: BlogPost) => Promise<void>;
  updateBlog: (id: string, blog: Partial<BlogPost>) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  getPublishedBlogs: () => BlogPost[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    axios.get("/api/blogs").then(res => setBlogs(res.data));
  }, []);

  const addBlog = async (blog: BlogPost) => {
    await axios.post("/api/blogs", blog);
    setBlogs(prev => [...prev, blog]);
  };

  const updateBlog = async (id: string, updatedBlog: Partial<BlogPost>) => {
    await axios.put(`/api/blogs/${id}`, updatedBlog);
    setBlogs(prev =>
      prev.map(b => (b.id === id ? { ...b, ...updatedBlog } : b))
    );
  };

  const deleteBlog = async (id: string) => {
    await axios.delete(`/api/blogs/${id}`);
    setBlogs(prev => prev.filter(b => b.id !== id));
  };

  const getPublishedBlogs = () => blogs.filter(b => b.status === "published");

  return (
    <BlogContext.Provider value={{ blogs, addBlog, updateBlog, deleteBlog, getPublishedBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const ctx = useContext(BlogContext);
  if (!ctx) throw new Error("useBlog must be used within BlogProvider");
  return ctx;
};
