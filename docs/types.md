# Types

Source: `src/types/portfolio.ts`

## `PersonalInfo`
```ts
interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  email: string;
  location: string;
  phone: string;
}
```

## `Navigation`
```ts
interface Navigation {
  home: string;
  about: string;
  skills: string;
  projects: string;
  contact: string;
}
```

## `HeroSection`
```ts
interface HeroSection {
  greeting: string;
  cta: {
    primary: string;
    secondary: string;
  };
}
```

## `AboutSection`
```ts
interface AboutSection {
  title: string;
  description: string;
  skills: Array<{ name: string; icon: string; category: string; color: string; }>;
}
```

## `ProjectsSection`
```ts
interface ProjectsSection { title: string; subtitle: string; }
```

## `ContactSection`
```ts
interface ContactSection {
  title: string;
  subtitle: string;
  form: { name: string; email: string; message: string; send: string };
}
```

## `Sections`
```ts
interface Sections {
  hero: HeroSection;
  about: AboutSection;
  projects: ProjectsSection;
  contact: ContactSection;
}
```

## `PortfolioData`
```ts
interface PortfolioData {
  personal: PersonalInfo;
  navigation: Navigation;
  sections: Sections;
}
```

## `ProjectLinks`
```ts
interface ProjectLinks { live?: string; github?: string; demo?: string }
```

## `ProjectTechnologies`
```ts
interface ProjectTechnologies {
  frontend?: string[];
  backend?: string[];
  database?: string[];
  deployment?: string[];
  apis?: string[];
  ml?: string[];
}
```

## `ProjectDetails`
```ts
interface ProjectDetails {
  overview: string;
  challenges: string;
  solutions: string;
  features: string[];
  technologies: ProjectTechnologies;
  links: ProjectLinks;
}
```

## `Project`
```ts
interface Project {
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
```

## `ProjectsData`
```ts
interface ProjectsData { projects: Project[] }
```

## `ContactForm`
```ts
interface ContactForm { name: string; email: string; message: string }
```