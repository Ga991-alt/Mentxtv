import React, { createContext, useContext, useMemo, useState } from "react";
import { mentors as seedMentors } from "@/data/adminMockData";

export type MentorDomain = "JEE" | "NEET" | "UPSC" | "GATE" | string;

export interface MentorItem {
  id: string;
  name: string;
  domain: MentorDomain;
  rating: number; // 0-5
  sessions: number;
  image?: string; // image URL
  goodFeedback?: string[]; // top positive feedback lines
  badFeedback?: string[]; // top negative feedback lines
}

interface MentorContextType {
  mentors: MentorItem[];
  domains: MentorDomain[];
  addMentor: (m: Omit<MentorItem, "id">) => void;
  updateMentor: (id: string, patch: Partial<MentorItem>) => void;
  removeMentor: (id: string) => void;
}

const MentorContext = createContext<MentorContextType | undefined>(undefined);

export const MentorProvider = ({ children }: { children: React.ReactNode }) => {
  // Seed with mock mentors; extend with extra fields defaulting empty
  const [mentors, setMentors] = useState<MentorItem[]>(
    seedMentors.map((m) => ({ ...m, goodFeedback: [], badFeedback: [] }))
  );

  const addMentor: MentorContextType["addMentor"] = (m) => {
    setMentors((prev) => {
      const id = `M${(prev.length + 1).toString().padStart(3, "0")}`;
      return [{ id, ...m }, ...prev];
    });
  };

  const updateMentor: MentorContextType["updateMentor"] = (id, patch) => {
    setMentors((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...patch } : m))
    );
  };

  const removeMentor: MentorContextType["removeMentor"] = (id) => {
    setMentors((prev) => prev.filter((m) => m.id !== id));
  };

  const domains = useMemo<MentorDomain[]>(() => {
    const set = new Set<MentorDomain>(["JEE", "NEET", "UPSC", "GATE"]);
    mentors.forEach((m) => set.add(m.domain));
    return Array.from(set);
  }, [mentors]);

  return (
    <MentorContext.Provider
      value={{ mentors, domains, addMentor, updateMentor, removeMentor }}
    >
      {children}
    </MentorContext.Provider>
  );
};

export const useMentors = () => {
  const ctx = useContext(MentorContext);
  if (!ctx) throw new Error("useMentors must be used within MentorProvider");
  return ctx;
};
