import React, { Suspense, lazy } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ScrollToTop from "@/components/ScrollToTop";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import Loader from "@/components/Loader";

// Lazy load heavy sections
const About = lazy(() => import("@/components/About"));
const Skills = lazy(() => import("@/components/Skills"));
const Projects = lazy(() => import("@/components/Projects"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  const { portfolioData, projectsData, loading, error } = usePortfolioData();

if (loading) {
  return <Loader message="Loading portfolio..." />;
}


  if (error || !portfolioData || !projectsData) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Error Loading Portfolio</h1>
          <p className="text-secondary mb-8">{error || "Failed to load portfolio data. Please try again later."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation data={portfolioData} />
      <main>
        <Hero data={portfolioData} />

        {/* Lazy loaded sections */}
        <Suspense fallback={<div className="text-center py-10 text-secondary">Loading section...</div>}>
          <About  />
          <section id="skills" className="py-20 px-6 bg-surface">
            <div className="max-w-6xl mx-auto">
              <Skills />
            </div>
          </section>
          <Projects data={portfolioData} projects={projectsData.projects} />
          <Contact data={portfolioData} />
          <Footer />
        </Suspense>
      </main>
      <ScrollToTop />
    </div>
  );
};

export default Index;
