import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8  transform -translate-x-1/2 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent shadow-glow backdrop-blur-sm border border-primary/30 hover:shadow-primary hover:scale-110 transition-smooth"
      size="sm"
    >
      <ChevronUp className="w-5 h-5" />
      <span className="sr-only">Scroll to top</span>
    </Button>
  );
};

export default ScrollToTop;