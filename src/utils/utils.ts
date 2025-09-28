// utils.ts
import { mentorshipCategories } from "./mentorshipCategories";

export const normalize = (str: string) =>
  str?.toLowerCase().replace(/\s+/g, "");

export const filterByCategory = (
  mentors: any[],
  selectedMainCategory: string,
  selectedSubCategory: string
) => {
  if (selectedMainCategory === "All") return mentors;

  // get all subcategories under main category
  const subcats = mentorshipCategories[selectedMainCategory] || [];

  return mentors.filter((mentor) => {
    const mentorDomain = normalize(mentor.domin || "");
    const mentorSubjects = Array.isArray(mentor.subjects)
      ? mentor.subjects.map(normalize)
      : [];

    if (selectedSubCategory && selectedSubCategory !== "All") {
      return (
        mentorDomain === normalize(selectedSubCategory) ||
        mentorSubjects.includes(normalize(selectedSubCategory))
      );
    }

    // if only main category is selected, match any subcategory
    return subcats.some((sub) => {
      const subNorm = normalize(sub);
      return mentorDomain === subNorm || mentorSubjects.includes(subNorm);
    });
  });
};
