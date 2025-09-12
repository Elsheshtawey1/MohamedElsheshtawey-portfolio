import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <h1 className="text-8xl md:text-9xl font-bold gradient-text opacity-20">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-primary rounded-full opacity-20 animate-pulse" />
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-secondary mb-8 leading-relaxed">
          Oops! The page you're looking for seems to have wandered off into the digital void. 
          Let's get you back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-smooth">
              <Home className="mr-2 w-5 h-5" />
              Go Home
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary/30 text-primary hover:bg-primary/10"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Go Back
          </Button>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-secondary rounded-full opacity-20 animate-float blur-xl" />
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-primary rounded-full opacity-30 animate-float blur-xl" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default NotFound;
