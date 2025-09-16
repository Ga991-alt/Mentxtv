import fs from "fs";
import path from "path";
import { BlogPost } from "../types";

const filePath = path.join(__dirname, "blogs.json");
console.log(filePath);

const readBlogs = (): BlogPost[] => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

const writeBlogs = (blogs: BlogPost[]) => {
  fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2));
};

export const BlogService = {
  getAll: (): BlogPost[] => readBlogs(),
  getPublished: (): BlogPost[] => readBlogs().filter(b => b.status === "published"),
  add: (blog: BlogPost): void => {
    const blogs = readBlogs();
    blogs.push(blog);
    writeBlogs(blogs);
  },
  update: (id: string, updated: Partial<BlogPost>): void => {
    const blogs = readBlogs().map(b => (b.id === id ? { ...b, ...updated } : b));
    writeBlogs(blogs);
  },
  delete: (id: string): void => {
    const blogs = readBlogs().filter(b => b.id !== id);
    writeBlogs(blogs);
  }
};
