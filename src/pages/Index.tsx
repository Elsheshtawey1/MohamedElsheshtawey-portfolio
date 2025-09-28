import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const Index = () => {
  const { portfolioData, projectsData, loading, error } = usePortfolioData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-secondary">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolioData || !projectsData) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Error Loading Portfolio</h1>
          <p className="text-secondary mb-8">
            {error || "Failed to load portfolio data. Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation data={portfolioData} />
      <main>
        <Hero data={portfolioData} />
        <About data={portfolioData} />
        <section id="skills" className="py-20 px-6 bg-surface">
          <div className="max-w-6xl mx-auto">
            <Skills  />
          </div>
        </section>
        <Projects data={portfolioData} projects={projectsData.projects} />
        <Contact data={portfolioData} />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
