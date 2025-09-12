import { useState } from "react";
import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TypingText } from "@/components/animations/TypingText";
import { ShinyText } from "@/components/animations/ShinyText";
import heroBackground from "@/assets/hero-background.jpg";

interface HeroProps {
  data: {
    personal: {
      name: string;
      title: string;
      subtitle: string;
    };
    sections: {
      hero: {
        greeting: string;
        cta: {
          primary: string;
          secondary: string;
        };
      };
    };
  };
}

const Hero = ({ data }: HeroProps) => {
  const [typingComplete, setTypingComplete] = useState(false);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-primary rounded-full opacity-20 animate-float blur-xl" />
      <div className="absolute bottom-32 right-20 w-24 h-24 bg-gradient-secondary rounded-full opacity-30 animate-float blur-xl" style={{ animationDelay: '2s' }} />
      
      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <m.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Greeting */}
          <m.p 
            variants={itemVariants}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-xl text-secondary mb-4 font-medium"
          >
            {data.sections.hero.greeting}
          </m.p>
          
          {/* Name with Gradient */}
          <m.h1 
            variants={itemVariants}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
          >
            <span className="gradient-text">{data.personal.name}</span>
          </m.h1>
          
          {/* Title with Typing Effect and Shiny Animation */}
          <m.h2 
            variants={itemVariants}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl lg:text-5xl font-semibold text-primary mb-6"
          >
            <ShinyText shimmerDuration={2.5} wordByWord={true} staggerDelay={0.4}>
              <TypingText 
                text={data.personal.title}
                speed={80}
                onComplete={() => setTypingComplete(true)}
              />
            </ShinyText>
          </m.h2>

          {/* Subtitle with Shiny Animation */}
          <m.p 
            variants={itemVariants}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-xl text-secondary max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            <ShinyText shimmerDuration={3} shimmerWidth={80} wordByWord={true} staggerDelay={0.2}>
              {data.personal.subtitle}
            </ShinyText>
          </m.p>
          
          {/* CTA Buttons */}
          <m.div 
            variants={itemVariants}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-smooth text-lg px-8 py-6 hover-glow"
              onClick={() => scrollToSection('projects')}
            >
              {data.sections.hero.cta.primary}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/30 text-primary hover:bg-white hover:text-black hover:border-white transition-smooth text-lg px-8 py-6 glass-effect hover:shadow-glow"
              asChild
            >
              <a href="/resume.pdf" download className="inline-flex items-center">
                <ShinyText wordByWord={true} staggerDelay={0.3}>
                  Download My CV
                </ShinyText>
              </a>
            </Button>
          </m.div>
          
          {/* Social Links */}
          <m.div variants={itemVariants} transition={{ duration: 0.6 }}>
            <TooltipProvider>
            <div className="flex justify-center gap-6">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass-effect hover:bg-primary/20 transition-smooth hover-glow"
                  >
                    <Github className="w-6 h-6 text-primary" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View my GitHub profile</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass-effect hover:bg-primary/20 transition-smooth hover-glow"
                  >
                    <Linkedin className="w-6 h-6 text-primary" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Connect on LinkedIn</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="mailto:alex.chen@portfolio.dev"
                    className="p-3 rounded-full glass-effect hover:bg-primary/20 transition-smooth hover-glow"
                  >
                    <Mail className="w-6 h-6 text-primary" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send me an email</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="https://wa.me/1234567890" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass-effect hover:bg-primary/20 transition-smooth hover-glow"
                  >
                     <MessageCircle className="w-6 h-6 text-primary" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Chat on WhatsApp</p>
                </TooltipContent>
              </Tooltip>
              
            </div>
            </TooltipProvider>
          </m.div>
        </m.div>
      </div>
      
      {/* Interactive Scroll Indicator */}
      <button 
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-smooth group"
        aria-label="Scroll to next section"
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center group-hover:border-primary transition-smooth">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse group-hover:bg-primary-glow transition-smooth" />
        </div>
      </button>
    </section>
  );
};

export default Hero;