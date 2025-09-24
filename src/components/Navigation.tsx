import { useState, useEffect, memo, useMemo, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Code2 } from "lucide-react";
import throttle from "lodash/throttle";
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
  const navItems = useMemo(
    () => [
      { id: "home", label: data.navigation.home },
      { id: "about", label: data.navigation.about },
      { id: "skills", label: data.navigation.skills },
      { id: "projects", label: data.navigation.projects },
      { id: "contact", label: data.navigation.contact },
    ],
    [data.navigation]
  );
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    sectionsRef.current = navItems.map((item) => document.getElementById(item.id));
  }, [navItems]);
  const handleScroll = useCallback(() => {
    const scrollPos = window.scrollY;
    const scrolled = scrollPos > 50;
    setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    const scrollPosition = scrollPos + 100;
    for (let i = sectionsRef.current.length - 1; i >= 0; i--) {
      const section = sectionsRef.current[i];
      if (section && section.offsetTop <= scrollPosition) {
        const newActive = navItems[i].id;
        setActiveSection((prev) => (prev !== newActive ? newActive : prev));
        break;
      }
    }
  }, [navItems]);
  useEffect(() => {
    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      throttledHandleScroll.cancel();
    };
  }, [handleScroll]);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${isScrolled ? "bg-background/80 backdrop-blur-md border-b border-primary/20 shadow-card" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 text-center text-xl">
          {/* Logo */}
          <button onClick={() => scrollToSection("home")} className="flex items-center gap-2 text-primary hover:text-accent transition-smooth group">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-smooth">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <h1>Mohamed</h1>
          </button>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-smooth hover:text-primary ${activeSection === item.id ? "text-primary" : "text-secondary"}`}
              >
                {item.label}
                {activeSection === item.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary rounded-full" />}
              </button>
            ))}
          </div>
          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <Button size="sm" aria-label="Hire Me" className="bg-gradient-primary hover:shadow-glow transition-smooth" onClick={() => scrollToSection("contact")}>
              Hire Me
            </Button>
          </div>
          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-primary hover:text-accent transition-smooth">
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
                  aria-label="Go to section"
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-4 py-3 text-sm font-medium transition-smooth hover:bg-primary/10 rounded-lg ${activeSection === item.id ? "text-primary bg-primary/10" : "text-secondary"}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-primary/20 mt-2">
                <Button aria-label="Hire Me" size="sm" className="w-full bg-gradient-primary hover:shadow-glow transition-smooth" onClick={() => scrollToSection("contact")}>
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
export default memo(Navigation);
