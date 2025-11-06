import { useState, useEffect, memo, useMemo, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Code2 } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import throttle from "lodash/throttle";

interface NavigationProps {
  data: {
    personal: { name: string };
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
  const [scrollProgress, setScrollProgress] = useState(0);

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
    sectionsRef.current = navItems.map((item) => (typeof document !== "undefined" ? document.getElementById(item.id) : null));
  }, [navItems]);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const scrolled = scrollY > 50;
    setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

    const scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollY / scrollHeight) * 100 : 0;
    setScrollProgress(progress);

    const scrollPosition = scrollY + 120; // offset for sticky header
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
    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    // trigger once on mount
    handleScroll();
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      throttledHandleScroll.cancel();
    };
  }, [handleScroll]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${isScrolled ? "bg-background/80 backdrop-blur-md border-b border-primary/20 shadow-card" : "bg-transparent"}`}
      aria-label="Primary"
    >
      <LazyMotion features={domAnimation}>
        {/* Scroll Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-transparent">
          <m.div className="h-full bg-gradient-primary shadow-glow" style={{ width: `${scrollProgress}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} aria-hidden="true" />
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button onClick={() => scrollToSection("home")} className="flex items-center gap-2 text-primary hover:text-accent transition-smooth group" aria-label="Go to home">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-smooth">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold select-none">MOHAMED</h1>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 relative">
              {navItems.map((item) => (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${activeSection === item.id ? "text-primary" : "text-secondary hover:text-primary"}`}
                    aria-current={activeSection === item.id ? "page" : undefined}
                    aria-label={`Go to ${item.label}`}
                  >
                    {item.label}

                    {/* Hover underline */}
                    <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                    {/* Active underline */}
                    {activeSection === item.id && (
                      <m.div
                        layoutId="nav-underline"
                        className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary rounded-full z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* CTA Button (Desktop) */}
            <div className="hidden md:block">
              <Button size="sm" aria-label="Hire Me" className="bg-gradient-primary hover:shadow-glow transition-smooth" onClick={() => scrollToSection("contact")}>
                Hire Me
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="md:hidden p-2 text-primary hover:text-accent transition-smooth"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div id="mobile-menu" className="md:hidden py-4 border-t border-primary/20 bg-background/95 backdrop-blur-md">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left px-4 py-3 text-sm font-medium transition-smooth rounded-lg ${
                        isActive ? "text-primary bg-primary/20 border-l-4 border-primary pl-3" : "text-secondary hover:bg-primary/10"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                      aria-label={`Go to ${item.label}`}
                    >
                      {item.label}
                    </button>
                  );
                })}
                <div className="pt-2 border-t border-primary/20 mt-2">
                  <Button aria-label="Hire Me" size="sm" className="w-full bg-gradient-primary hover:shadow-glow transition-smooth" onClick={() => scrollToSection("contact")}>
                    Hire Me
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </LazyMotion>
    </nav>
  );
};

export default memo(Navigation);
