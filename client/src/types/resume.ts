export interface ResumeEducation {
  degree: string;
  field?: string;
  institution: string;
  startYear?: string;
  endYear?: string;
  grade?: string;
}

export interface ResumeExperience {
  role: string;
  company: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface ResumeProject {
  name: string;
  description?: string;
  technologies?: string[];
  link?: string;
}

export interface ResumeData {
  name: string;
  role?: string;

  email?: string;
  phone?: string;
  location?: string;

  linkedin?: string;
  github?: string;
  portfolio?: string;

  about?: string;
  photo?: string;
  skills: string[];

  education: ResumeEducation[];

  experience: ResumeExperience[];

  projects: ResumeProject[];
}
