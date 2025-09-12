export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  email: string;
  location: string;
  phone: string;
}

export interface Navigation {
  home: string;
  about: string;
  skills: string;
  projects: string;
  contact: string;
}

export interface HeroSection {
  greeting: string;
  cta: {
    primary: string;
    secondary: string;
  };
}

export interface AboutSection {
  title: string;
  description: string;
  skills: Array<{
    name: string;
    icon: string;
    category: string;
    color: string;
  }>;
}

export interface ProjectsSection {
  title: string;
  subtitle: string;
}

export interface ContactSection {
  title: string;
  subtitle: string;
  form: {
    name: string;
    email: string;
    message: string;
    send: string;
  };
}

export interface Sections {
  hero: HeroSection;
  about: AboutSection;
  projects: ProjectsSection;
  contact: ContactSection;
}

export interface PortfolioData {
  personal: PersonalInfo;
  navigation: Navigation;
  sections: Sections;
}

export interface ProjectLinks {
  live?: string;
  github?: string;
  demo?: string;
}

export interface ProjectTechnologies {
  frontend?: string[];
  backend?: string[];
  database?: string[];
  deployment?: string[];
  apis?: string[];
  ml?: string[];
}

export interface ProjectDetails {
  overview: string;
  challenges: string;
  solutions: string;
  features: string[];
  technologies: ProjectTechnologies;
  links: ProjectLinks;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  status: 'completed' | 'in-progress' | 'planning';
  year: number;
  featured: boolean;
  details: ProjectDetails;
}

export interface ProjectsData {
  projects: Project[];
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}