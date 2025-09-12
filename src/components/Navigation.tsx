import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Code2 } from "lucide-react";
import { ShinyText } from "@/components/animations/ShinyText";

interface NavigationProps {
  data: {
    personal: {
      name: string;
    };
    navigation: {
      home: string;
      about: string;
      skills: string;
      projects: string;
      contact: string;
    };
  };
}

const Navigation = ({ data }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: data.navigation.home },
    { id: "about", label: data.navigation.about },
    { id: "skills", label: data.navigation.skills },
    { id: "projects", label: data.navigation.projects },
    { id: "contact", label: data.navigation.contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
      isScrolled 
        ? "bg-background/80 backdrop-blur-md border-b border-primary/20 shadow-card" 
        : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 text-primary hover:text-accent transition-smooth group"
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-smooth">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <ShinyText shimmerDuration={2} shimmerWidth={120} wordByWord={true} staggerDelay={0.5}>
              {data.personal.name}
            </ShinyText>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-smooth hover:text-primary ${
                  activeSection === item.id 
                    ? "text-primary" 
                    : "text-secondary"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <Button 
              size="sm"
              className="bg-gradient-primary hover:shadow-glow transition-smooth"
              onClick={() => scrollToSection("contact")}
            >
              Hire Me
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-primary hover:text-accent transition-smooth"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary/20 bg-background/95 backdrop-blur-md">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-4 py-3 text-sm font-medium transition-smooth hover:bg-primary/10 rounded-lg ${
                    activeSection === item.id 
                      ? "text-primary bg-primary/10" 
                      : "text-secondary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-primary/20 mt-2">
                <Button 
                  size="sm"
                  className="w-full bg-gradient-primary hover:shadow-glow transition-smooth"
                  onClick={() => scrollToSection("contact")}
                >
                  Hire Me
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;