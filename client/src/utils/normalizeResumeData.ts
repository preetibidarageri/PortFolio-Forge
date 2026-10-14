import type { ResumeData } from "../types/resume";

export function normalizeResumeData(data: Partial<ResumeData>): ResumeData {
  return {
    name:
      typeof data.name === "string" && data.name.trim()
        ? data.name.trim()
        : "Your Name",

    role:
      typeof data.role === "string" && data.role.trim()
        ? data.role.trim()
        : undefined,

    email:
      typeof data.email === "string" && data.email.trim()
        ? data.email.trim()
        : undefined,

    phone:
      typeof data.phone === "string" && data.phone.trim()
        ? data.phone.trim()
        : undefined,

    location:
      typeof data.location === "string" && data.location.trim()
        ? data.location.trim()
        : undefined,

    linkedin:
      typeof data.linkedin === "string" && data.linkedin.trim()
        ? data.linkedin.trim()
        : undefined,

    github:
      typeof data.github === "string" && data.github.trim()
        ? data.github.trim()
        : undefined,

    portfolio:
      typeof data.portfolio === "string" && data.portfolio.trim()
        ? data.portfolio.trim()
        : undefined,

    about:
      typeof data.about === "string" && data.about.trim()
        ? data.about.trim()
        : undefined,

    skills: Array.isArray(data.skills)
      ? data.skills
          .filter(
            (skill): skill is string =>
              typeof skill === "string" && skill.trim().length > 0,
          )
          .map((skill) => skill.trim())
      : [],

    education: Array.isArray(data.education)
      ? data.education.map((education) => ({
          degree: education.degree || "",
          field: education.field || "",
          institution: education.institution || "",
          startYear: education.startYear || "",
          endYear: education.endYear || "",
          grade: education.grade || "",
        }))
      : [],

    experience: Array.isArray(data.experience)
      ? data.experience.map((experience) => ({
          role: experience.role || "",
          company: experience.company || "",
          startDate: experience.startDate || "",
          endDate: experience.endDate || "",
          description: experience.description || "",
        }))
      : [],

    projects: Array.isArray(data.projects)
      ? data.projects.map((project) => ({
          name: project.name || "",
          description: project.description || "",
          technologies: Array.isArray(project.technologies)
            ? project.technologies.filter(
                (technology): technology is string =>
                  typeof technology === "string" &&
                  technology.trim().length > 0,
              )
            : [],
          link: project.link || "",
        }))
      : [],
  };
}
