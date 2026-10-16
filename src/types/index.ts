export interface Project {
  title: string;
  category: string;
  description: string;
  technologies: string;
  highlights: string[];
  github: string;
  link: string;
  featured: boolean;
  screenshot?: string;
}

export interface Experience {
  position: string;
  company: string;
  duration: string;
  image?: string; // optional — fallback icon shown if omitted
  descriptions: string[];
}

export interface Education {
  school: string;
  degree: string;
  duration: string;
  image: string;
}

export interface Certificate {
  title: string;
  description: string;
  icon: string;
  link: string;
}

export interface SkillSet {
  ai_automation: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  devops: string[];
  design: string[];
  testing: string[];
}

export interface About {
  title: string;
  highlight: string;
  body: string;
  quote: string;
  traits: string[];
}

export interface UserInfo {
  main: {
    name: string;
    role: string;
    description: string;
    summary: string;
    photo: string;
    email: string;
    location: string;
    availability: string;
  };
  socials: {
    github: string;
    linkedin: string;
  };
  skills: SkillSet;
  projects: Project[];
  education: Education[];
  experience: Experience[];
  certificates: Certificate[];
  contact: {
    title: string;
    description: string;
    note: string;
  };
  footer: string;
  about: About;
  services: string[];
}
