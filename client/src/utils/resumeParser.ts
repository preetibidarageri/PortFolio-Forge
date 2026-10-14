import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

// @ts-ignore
import mammoth from "mammoth/mammoth.browser";

import type { ResumeData } from "../types/resume";
import { normalizeResumeData } from "./normalizeResumeData";

async function extractPdfText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({
    data: arrayBuffer,
  }).promise;

  let fullText = "";

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();

    const items = content.items as any[];

    const positionedItems = items
      .map((item) => ({
        text: typeof item.str === "string" ? item.str.trim() : "",
        x: item.transform?.[4] ?? 0,
        y: item.transform?.[5] ?? 0,
      }))
      .filter((item) => item.text);

    positionedItems.sort((a, b) => {
      if (Math.abs(b.y - a.y) > 3) {
        return b.y - a.y;
      }

      return a.x - b.x;
    });

    const pageLines: string[] = [];

    let currentY: number | null = null;
    let currentLine = "";

    for (const item of positionedItems) {
      if (currentY !== null && Math.abs(item.y - currentY) > 4) {
        if (currentLine.trim()) {
          pageLines.push(currentLine.trim());
        }

        currentLine = item.text;
      } else {
        currentLine += currentLine ? ` ${item.text}` : item.text;
      }

      currentY = item.y;
    }

    if (currentLine.trim()) {
      pageLines.push(currentLine.trim());
    }

    fullText += pageLines.join("\n") + "\n";
  }

  return fullText;
}

async function extractDocxText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  const result = await mammoth.extractRawText({
    arrayBuffer,
  });

  return result.value;
}

function normalizeText(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const sectionAliases: Record<string, string[]> = {
  about: [
    "objective",
    "career objective",
    "summary",
    "professional summary",
    "career summary",
    "profile",
    "professional profile",
    "about",
    "about me",
    "personal summary",
    "career profile",
    "professional objective",
  ],

  education: [
    "education",
    "educational qualification",
    "education qualification",
    "academic qualification",
    "academic background",
    "education background",
    "academic details",
    "educational background",
    "qualifications",
    "academic qualifications",
  ],

  skills: [
    "skills",
    "technical skills",
    "technical expertise",
    "technical knowledge",
    "core skills",
    "key skills",
    "technologies",
    "technical proficiencies",
    "skills and technologies",
    "programming skills",
    "technical competencies",
    "technical skills and tools",
  ],

  experience: [
    "experience",
    "work experience",
    "professional experience",
    "employment history",
    "work history",
    "internship experience",
    "internships",
    "professional background",
    "career history",
    "work experience and internships",
  ],

  projects: [
    "projects",
    "personal projects",
    "academic projects",
    "key projects",
    "project experience",
    "major projects",
    "projects experience",
    "academic projects and achievements",
  ],
};

function detectSectionHeading(line: string): string | null {
  const normalized = normalizeHeading(line);

  for (const [section, aliases] of Object.entries(sectionAliases)) {
    if (aliases.includes(normalized)) {
      return section;
    }
  }

  return null;
}

function splitIntoSections(text: string): Record<string, string[]> {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const sections: Record<string, string[]> = {
    header: [],
    about: [],
    education: [],
    skills: [],
    experience: [],
    projects: [],
    other: [],
  };

  let currentSection = "header";

  for (const line of lines) {
    const detectedSection = detectSectionHeading(line);

    if (detectedSection) {
      currentSection = detectedSection;
      continue;
    }

    sections[currentSection].push(line);
  }

  return sections;
}

function extractEmail(text: string): string | undefined {
  const match = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);

  return match?.[0];
}

function extractPhone(text: string): string | undefined {
  const matches = text.match(/(?:\+91[\s-]?)?[6-9]\d{9}/g);

  if (!matches?.length) {
    return undefined;
  }

  return matches[0];
}

function extractLinkedIn(text: string): string | undefined {
  const match = text.match(
    /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[A-Za-z0-9_./-]+/i,
  );

  if (!match) {
    return undefined;
  }

  const url = match[0].replace(/[),.;]+$/, "");

  return url.startsWith("http") ? url : `https://${url}`;
}

function extractGithub(text: string): string | undefined {
  const match = text.match(
    /(?:https?:\/\/)?(?:www\.)?github\.com\/[A-Za-z0-9_.-]+/i,
  );

  if (!match) {
    return undefined;
  }

  const url = match[0].replace(/[),.;]+$/, "");

  return url.startsWith("http") ? url : `https://${url}`;
}

function extractPortfolio(text: string): string | undefined {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  for (const line of lines) {
    if (!/portfolio|personal website|website/i.test(line)) {
      continue;
    }

    const match = line.match(/https?:\/\/[^\s]+|www\.[^\s]+/i);

    if (match) {
      const url = match[0].replace(/[),.;]+$/, "");

      return url.startsWith("http") ? url : `https://${url}`;
    }
  }

  return undefined;
}

function extractLocation(text: string): string | undefined {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  for (const line of lines.slice(0, 15)) {
    const match = line.match(/^(?:location|address)\s*:\s*(.+)$/i);

    if (match?.[1]) {
      return match[1].trim();
    }
  }

  return undefined;
}

function extractName(lines: string[]): string {
  if (!lines.length) {
    return "Your Name";
  }

  for (const line of lines.slice(0, 7)) {
    const cleanLine = line.trim();

    if (!cleanLine) continue;

    if (cleanLine.includes("@")) continue;

    if (/(?:\+91[\s-]?)?[6-9]\d{9}/.test(cleanLine)) {
      continue;
    }

    if (/linkedin|github|portfolio|http|www\./i.test(cleanLine)) {
      continue;
    }

    if (
      /developer|engineer|designer|manager|analyst|student|intern|software|consultant|architect|tester|devops|frontend|backend|full stack/i.test(
        cleanLine,
      )
    ) {
      continue;
    }

    if (/^[A-Za-z][A-Za-z .'-]{2,60}$/.test(cleanLine)) {
      return cleanLine;
    }
  }

  return lines[0] || "Your Name";
}

function extractRole(lines: string[]): string | undefined {
  if (lines.length < 2) {
    return undefined;
  }

  const roleKeywords =
    /developer|engineer|designer|manager|analyst|consultant|architect|intern|student|specialist|administrator|scientist|tester|devops|frontend|backend|software|full stack|web developer|application developer/i;

  for (const line of lines.slice(1, 7)) {
    const cleanLine = line.trim();

    if (!cleanLine) continue;

    if (cleanLine.includes("@")) continue;

    if (/(?:\+91[\s-]?)?[6-9]\d{9}/.test(cleanLine)) {
      continue;
    }

    if (/linkedin|github|portfolio|http|www\./i.test(cleanLine)) {
      continue;
    }

    if (roleKeywords.test(cleanLine)) {
      return cleanLine;
    }
  }

  return undefined;
}

function extractSkills(lines: string[]): string[] {
  const skills: string[] = [];

  for (const line of lines) {
    let cleanLine = line.replace(/^[-•*]\s*/, "").trim();

    cleanLine = cleanLine.replace(
      /^(languages?|frameworks?|libraries?|tools?|technologies?|databases?|frontend|backend|programming languages?|platforms?|software|technical skills?)\s*:\s*/i,
      "",
    );

    const parts = cleanLine.split(/[,|;•]/);

    for (const part of parts) {
      const skill = part.replace(/^[-•*]\s*/, "").trim();

      if (
        skill.length > 1 &&
        skill.length < 50 &&
        !/^(skills|technical skills|technologies)$/i.test(skill)
      ) {
        skills.push(skill);
      }
    }
  }

  return [...new Set(skills.map((skill) => skill.trim()))];
}

function extractYears(line: string): {
  startYear?: string;
  endYear?: string;
} {
  const rangeMatch = line.match(
    /((?:19|20)\d{2})\s*[-–—]\s*((?:19|20)\d{2}|present|current)/i,
  );

  if (rangeMatch) {
    return {
      startYear: rangeMatch[1],
      endYear: rangeMatch[2],
    };
  }

  const singleYear = line.match(/(?:19|20)\d{2}/);

  if (singleYear) {
    return {
      startYear: singleYear[0],
    };
  }

  return {};
}

function extractGrade(line: string): string | undefined {
  const cgpaMatch = line.match(/\b(?:CGPA|GPA)\s*[:-]?\s*([\d.]+)/i);

  if (cgpaMatch) {
    return `CGPA: ${cgpaMatch[1]}`;
  }

  const percentageMatch = line.match(/([\d.]+)\s*%/);

  if (percentageMatch) {
    return `${percentageMatch[1]}%`;
  }

  const percentageTextMatch = line.match(/\bpercentage\s*[:-]?\s*([\d.]+)/i);

  if (percentageTextMatch) {
    return `${percentageTextMatch[1]}%`;
  }

  return undefined;
}

function extractDegree(line: string, fallback: string): string {
  const degreeMatch = line.match(
    /\b(B\.?\s*E\.?|B\.?\s*TECH|BTECH|MCA|M\.?\s*TECH|MTECH|MBA|Bachelor(?:'s)?|Master(?:'s)?)\b/i,
  );

  return degreeMatch?.[0] || fallback;
}

function extractField(line: string): string | undefined {
  const degreeMatch = line.match(
    /\b(B\.?\s*E\.?|B\.?\s*TECH|BTECH|MCA|M\.?\s*TECH|MTECH|MBA|Bachelor(?:'s)?|Master(?:'s)?)\b/i,
  );

  if (!degreeMatch) {
    return undefined;
  }

  const degreeEnd = (degreeMatch.index ?? 0) + degreeMatch[0].length;

  let remaining = line.slice(degreeEnd).trim();

  remaining = remaining.replace(/^[-,:|]+/, "");

  remaining = remaining.replace(/^in\s+/i, "");

  remaining = remaining.replace(/\b(?:19|20)\d{2}\b.*$/i, "");

  remaining = remaining.replace(/\b(?:CGPA|GPA|percentage)\b.*$/i, "");

  remaining = remaining.replace(/\d+(?:\.\d+)?\s*%.*$/i, "");

  remaining = remaining.replace(/[|,;:-]+$/, "").trim();

  if (!remaining) {
    return undefined;
  }

  if (/^(?:from|at|@)\s+/i.test(remaining)) {
    return undefined;
  }

  return remaining;
}

function cleanEducationInstitution(line: string): string {
  let result = line;

  result = result.replace(
    /\b(B\.?\s*E\.?|B\.?\s*TECH|BTECH|MCA|M\.?\s*TECH|MTECH|MBA|Bachelor(?:'s)?|Master(?:'s)?|PUC|HSC|12th|SSLC|SSC|10th|Secondary School|Higher Secondary)\b/gi,
    "",
  );

  result = result.replace(
    /\b(?:19|20)\d{2}\s*[-–—]\s*(?:(?:19|20)\d{2}|present|current)\b/gi,
    "",
  );

  result = result.replace(/\b(?:CGPA|GPA|percentage)\s*[:-]?\s*[\d.]+%?/gi, "");

  result = result.replace(/\d+(?:\.\d+)?\s*%/g, "");

  result = result.replace(/\s{2,}/g, " ");

  result = result.replace(/^[\s,|:-]+|[\s,|:-]+$/g, "");

  return result.trim();
}

function extractEducation(lines: string[]): ResumeData["education"] {
  const education: ResumeData["education"] = [];

  for (const line of lines) {
    const years = extractYears(line);
    const grade = extractGrade(line);

    const isBachelor =
      /\b(B\.?\s*E\.?|B\.?\s*TECH|BTECH|Bachelor(?:'s)?)\b/i.test(line);

    const isMaster = /\b(MCA|M\.?\s*TECH|MTECH|MBA|Master(?:'s)?)\b/i.test(
      line,
    );

    const isPuc = /\b(PUC|12th|HSC|Higher Secondary)\b/i.test(line);

    const isSslc = /\b(SSLC|10th|SSC|Secondary School)\b/i.test(line);

    if (isBachelor) {
      education.push({
        degree: extractDegree(line, "BE"),
        field: extractField(line),
        institution: cleanEducationInstitution(line),
        startYear: years.startYear,
        endYear: years.endYear,
        grade,
      });

      continue;
    }

    if (isMaster) {
      education.push({
        degree: extractDegree(line, "Master's"),
        field: extractField(line),
        institution: cleanEducationInstitution(line),
        startYear: years.startYear,
        endYear: years.endYear,
        grade,
      });

      continue;
    }

    if (isPuc) {
      education.push({
        degree: "PUC",
        institution: cleanEducationInstitution(line),
        startYear: years.startYear,
        endYear: years.endYear,
        grade,
      });

      continue;
    }

    if (isSslc) {
      education.push({
        degree: "SSLC",
        institution: cleanEducationInstitution(line),
        startYear: years.startYear,
        endYear: years.endYear,
        grade,
      });
    }
  }

  return education;
}

function extractExperience(lines: string[]): ResumeData["experience"] {
  const experience: ResumeData["experience"] = [];

  let current: ResumeData["experience"][number] | null = null;

  for (const line of lines) {
    const isBullet = /^[-•*]\s*/.test(line);

    const cleanLine = line.replace(/^[-•*]\s*/, "").trim();

    if (!cleanLine) continue;

    const years = extractYears(cleanLine);

    const headingMatch = cleanLine.match(/^(.+?)\s+(?:[-–—|]|at)\s+(.+)$/i);

    const looksLikeJobTitle =
      /developer|engineer|designer|manager|analyst|consultant|architect|intern|administrator|specialist|tester|devops|software|frontend|backend/i.test(
        cleanLine,
      );

    if (!isBullet && (headingMatch || looksLikeJobTitle)) {
      if (current) {
        experience.push(current);
      }

      let role = cleanLine;
      let company = "";

      if (headingMatch) {
        role = headingMatch[1].trim();

        company = headingMatch[2].trim();
      }

      current = {
        role,
        company,
        startDate: years.startYear,
        endDate: years.endYear,
        description: "",
      };

      continue;
    }

    if (current) {
      current.description = current.description
        ? `${current.description} ${cleanLine}`
        : cleanLine;
    }
  }

  if (current) {
    experience.push(current);
  }

  return experience;
}

function looksLikeProjectTitle(line: string): boolean {
  const cleanLine = line.replace(/^[-•*]\s*/, "").trim();

  if (!cleanLine) {
    return false;
  }

  if (/^technologies?\s*:/i.test(cleanLine)) {
    return false;
  }

  if (/^(?:link|github|demo|url)\s*:/i.test(cleanLine)) {
    return false;
  }

  if (cleanLine.length > 100) {
    return false;
  }

  if (
    /^[A-Z][^.?!]{0,40}\s+(is|was|uses|using|developed|created|built|implemented|designed|provides|allows|helps|enables)\b/i.test(
      cleanLine,
    )
  ) {
    return false;
  }

  if (/[.!?]$/.test(cleanLine)) {
    return false;
  }

  return /^[A-Z0-9][A-Za-z0-9 .&'()_/-]{2,80}$/.test(cleanLine);
}

function extractProjectLink(line: string): string | undefined {
  const match = line.match(/https?:\/\/[^\s]+|www\.[^\s]+/i);

  if (!match) {
    return undefined;
  }

  const url = match[0].replace(/[),.;]+$/, "");

  return url.startsWith("http") ? url : `https://${url}`;
}

function extractProjects(lines: string[]): ResumeData["projects"] {
  const projects: ResumeData["projects"] = [];

  let current: ResumeData["projects"][number] | null = null;

  for (const line of lines) {
    const isBullet = /^[-•*]\s*/.test(line);

    const cleanLine = line.replace(/^[-•*]\s*/, "").trim();

    if (!cleanLine) continue;

    const technologyMatch = cleanLine.match(/^Technologies?\s*:\s*(.+)$/i);

    if (technologyMatch && current) {
      current.technologies = technologyMatch[1]
        .split(/[,|;]/)
        .map((tech) => tech.trim())
        .filter(Boolean);

      continue;
    }

    if (current && /^(?:link|github|demo|url)\s*:/i.test(cleanLine)) {
      current.link = extractProjectLink(cleanLine);

      continue;
    }

    if (isBullet) {
      if (current) {
        current.description = current.description
          ? `${current.description} ${cleanLine}`
          : cleanLine;
      }

      continue;
    }

    if (looksLikeProjectTitle(cleanLine)) {
      if (current) {
        projects.push(current);
      }

      current = {
        name: cleanLine,
        description: "",
        technologies: [],
      };

      continue;
    }

    if (current) {
      current.description = current.description
        ? `${current.description} ${cleanLine}`
        : cleanLine;
    }
  }

  if (current) {
    projects.push(current);
  }

  return projects;
}

function parseResumeText(text: string): ResumeData {
  const normalizedText = normalizeText(text);

  const sections = splitIntoSections(normalizedText);

  const name = extractName(sections.header);

  const role = extractRole(sections.header);

  const email = extractEmail(normalizedText);

  const phone = extractPhone(normalizedText);

  const location = extractLocation(normalizedText);

  const linkedin = extractLinkedIn(normalizedText);

  const github = extractGithub(normalizedText);

  const portfolio = extractPortfolio(normalizedText);

  const about =
    sections.about.length > 0 ? sections.about.join(" ") : undefined;

  const skills = extractSkills(sections.skills);

  const education = extractEducation(sections.education);

  const experience = extractExperience(sections.experience);

  const projects = extractProjects(sections.projects);

  return normalizeResumeData({
    name,
    role,
    email,
    phone,
    location,
    linkedin,
    github,
    portfolio,
    about,
    skills,
    education,
    experience,
    projects,
  });
}

export async function extractResumeData(file: File): Promise<ResumeData> {
  let text = "";

  if (
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  ) {
    text = await extractPdfText(file);
  } else if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.name.toLowerCase().endsWith(".docx")
  ) {
    text = await extractDocxText(file);
  } else {
    throw new Error(
      "Unsupported file type. Please upload a PDF or DOCX resume.",
    );
  }

  if (!text.trim()) {
    throw new Error("Could not extract text from this resume.");
  }

  console.log("========== EXTRACTED RESUME TEXT ==========");

  console.log(text);

  console.log("============================================");

  const parsedData = parseResumeText(text);

  console.log("========== PARSED RESUME DATA =============");

  console.log(JSON.stringify(parsedData, null, 2));

  console.log("============================================");

  return parsedData;
}
