import { memo, useState, useMemo } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TypingText } from "@/components/animations/TypingText";
import heroBackground from "@/assets/hero-background.webp";

interface HeroProps {
  data: {
    personal: { name: string; title: string; subtitle: string };
    sections: {
      hero: {
        greeting: string;
        cta: { primary: string; secondary: string };
      };
    };
  };
}

const Hero = ({ data }: HeroProps) => {
  // Controls when the subtitle appears (after typing animation finishes)
  const [typingComplete, setTypingComplete] = useState(false);

  // Framer Motion animation variants (memoized to prevent re-renders)
  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }),
    []
  );

  // Smooth scroll function to navigate to other sections
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // === Hero Section ===
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-center">
      {/* === Background Image ===
          Using a static <img> instead of background-image improves LCP (Largest Contentful Paint)
          'fetchPriority' + 'loading=eager' ensures it loads as early as possible.
          Slight blur and scale create a cinematic look. */}
      <img
        src={heroBackground}
        alt="Hero background"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        style={{ filter: "blur(0.5px)", transform: "scale(1.01)" }}
      />

      {/* Gradient overlay for readability and mood */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />

      {/* Floating blurred decorative elements for soft motion background */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-primary rounded-full opacity-20 blur-xl animate-float" />
      <div className="absolute bottom-32 right-20 w-24 h-24 bg-gradient-secondary rounded-full opacity-30 blur-xl animate-float" style={{ animationDelay: "1.5s" }} />

      {/* LazyMotion loads animation features on demand to reduce bundle size */}
      <LazyMotion features={domAnimation}>
        <m.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.1 }} className="relative z-10 mx-auto max-w-6xl px-6">
          {/* === Greeting text (e.g., "Hello, I'm") === */}
          <m.p variants={itemVariants} transition={{ duration: 0.3 }} className="mb-4 text-lg md:text-xl text-secondary font-medium">
            {data.sections.hero.greeting}
          </m.p>

          {/* === Name with static gradient text ===
              No shiny or animation effects to improve performance and LCP. */}
          <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600">
            {data.personal.name}
          </h1>

          {/* === Job title with typing effect === */}
          <m.h2 variants={itemVariants} transition={{ duration: 0.4 }} className="mb-6 text-2xl md:text-3xl lg:text-4xl font-semibold text-primary">
            <TypingText text={data.personal.title} speed={60} onComplete={() => setTypingComplete(true)} />
          </m.h2>

          {/* === Subtitle (only shown after typing animation finishes) === */}
          {typingComplete && (
            <m.p variants={itemVariants} transition={{ duration: 0.4 }} className="mb-10 text-md md:text-lg text-secondary max-w-3xl mx-auto leading-relaxed">
              {data.personal.subtitle}
            </m.p>
          )}

          {/* === Call-to-Action Buttons === */}
          <m.div variants={itemVariants} transition={{ duration: 0.4 }} className="mb-16 flex flex-col sm:flex-row justify-center gap-4">
            {/* Primary CTA: Scroll to projects */}
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow text-lg px-8 py-6 transition-smooth" onClick={() => scrollToSection("projects")}>
              {data.sections.hero.cta.primary}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            {/* Secondary CTA: Download CV */}
            <Button variant="outline" size="lg" className="border-primary/30 text-primary hover:bg-white hover:text-black hover:border-white glass-effect transition-smooth text-lg px-8 py-6" asChild>
              <a href="/FRONTEND-Mohamed_Elsheshtawey.pdf" download>
                {data.sections.hero.cta.secondary}
              </a>
            </Button>
          </m.div>

          {/* === Social Links with Tooltips === */}
          <m.div variants={itemVariants} transition={{ duration: 0.3 }}>
            <TooltipProvider>
              <div className="flex justify-center gap-6">
                {[
                  {
                    icon: <Github className="w-6 h-6 text-primary" />,
                    href: "https://github.com/Elsheshtawey1",
                    label: "View my GitHub profile",
                  },
                  {
                    icon: <Linkedin className="w-6 h-6 text-primary" />,
                    href: "https://www.linkedin.com/in/mohamed-elsheshtawey/",
                    label: "Connect on LinkedIn",
                  },
                  {
                    icon: <Mail className="w-6 h-6 text-primary" />,
                    href: "mailto:mohamedelsheshtawey1@gmail.com",
                    label: "Send me an email",
                  },
                  {
                    icon: <MessageCircle className="w-6 h-6 text-primary" />,
                    href: "https://wa.me/201201585814",
                    label: "Chat on WhatsApp",
                  },
                ].map((link, idx) => (
                  <Tooltip key={idx}>
                    <TooltipTrigger asChild>
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass-effect hover:bg-primary/20 hover-glow transition-smooth" aria-label={link.label}>
                        {link.icon}
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>{link.label}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </m.div>
        </m.div>
      </LazyMotion>

      {/* === Scroll Indicator ===
          Simple bounce animation to hint users to scroll down. */}
      <button
        onClick={() => scrollToSection("about")}
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce cursor-pointer hover:scale-110 transition-smooth group"
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center group-hover:border-primary transition-smooth">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse group-hover:bg-primary-glow transition-smooth" />
        </div>
      </button>
    </section>
  );
};

export default memo(Hero);
