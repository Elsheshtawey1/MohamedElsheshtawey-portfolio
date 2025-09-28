# Components

## `src/components/Navigation.tsx`
- Props:
  - `data.navigation`: labels for sections
  - `data.personal.name`: used in logo
- Usage example:
```tsx
import Navigation from '@/components/Navigation';
<Navigation data={portfolioData} />
```

## `src/components/Hero.tsx`
- Props:
  - `data.personal`: `{ name, title, subtitle }`
  - `data.sections.hero.cta`: `{ primary, secondary }`
- Example:
```tsx
import Hero from '@/components/Hero';
<Hero data={portfolioData} />
```

## `src/components/About.tsx`
- Props:
  - `data.personal.bio`
  - `data.sections.about`: `{ title, description }`
- Example:
```tsx
import About from '@/components/About';
<About data={portfolioData} />
```

## `src/components/Skills.tsx`
- No props. Uses `src/data/SkillData.json`.
- Example:
```tsx
import Skills from '@/components/Skills';
<Skills />
```

## `src/components/Projects.tsx`
- Props:
  - `data.sections.projects`: `{ title, subtitle }`
  - `projects`: `Project[]` (see types)
- Example:
```tsx
import Projects from '@/components/Projects';
import type { Project } from '@/types/portfolio';
<Projects data={portfolioData} projects={projects as Project[]} />
```

## `src/components/ProjectCard.tsx`
- Props:
  - `project`: `Project`
- Example:
```tsx
import ProjectCard from '@/components/ProjectCard';
<ProjectCard project={project} />
```

## `src/components/Contact.tsx`
- Props:
  - `data.personal`: `{ email, location, phone }`
  - `data.sections.contact`: `{ title, subtitle, form: { name, email, message, send } }`
- Example:
```tsx
import Contact from '@/components/Contact';
<Contact data={portfolioData} />
```

## `src/components/ContactForm.tsx`
- Props:
  - `labels`: `{ name, email, message, send }`
- Example:
```tsx
import ContactForm from '@/components/ContactForm';
<ContactForm labels={portfolioData.sections.contact.form} />
```

## `src/components/Footer.tsx`
- No props.
- Example:
```tsx
import Footer from '@/components/Footer';
<Footer />
```

## `src/components/ScrollToTop.tsx`
- No props. Appears when you scroll down.
- Example:
```tsx
import ScrollToTop from '@/components/ScrollToTop';
<ScrollToTop />
```

## Animation Components

### `src/components/animations/AnimationProvider.tsx`
- Wrap once near the root to enable `framer-motion` lazy features.
- Props: `{ children }`.
- Example:
```tsx
import { AnimationProvider } from '@/components/animations/AnimationProvider';
<AnimationProvider>{children}</AnimationProvider>
```

### `src/components/animations/AnimatedSection.tsx`
- Props: `{ children, className?, delay?, staggerChildren?, id? }`
- Example:
```tsx
import { AnimatedSection } from '@/components/animations/AnimatedSection';
<AnimatedSection id="about" staggerChildren>{...}</AnimatedSection>
```

### `src/components/animations/AnimatedCard.tsx`
- Props: `{ children, className?, delay?, index? }`
- Example:
```tsx
import { AnimatedCard } from '@/components/animations/AnimatedCard';
<AnimatedCard index={i}><Card>...</Card></AnimatedCard>
```

### `src/components/animations/TypingText.tsx`
- Props: `{ text, speed?, className?, onComplete? }`
- Example:
```tsx
import { TypingText } from '@/components/animations/TypingText';
<TypingText text="Hello" speed={80} />
```

### `src/components/animations/ShinyText.tsx`
- Props: `{ children, className?, shimmerWidth?, shimmerDuration?, wordByWord?, staggerDelay? }`
- Example:
```tsx
import { ShinyText } from '@/components/animations/ShinyText';
<ShinyText shimmerDuration={3} wordByWord>{"Nice subtitle"}</ShinyText>
```