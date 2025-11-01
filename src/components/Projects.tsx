import { useState } from "react";
import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/portfolio";
import { Filter, Grid, List, Plus } from "lucide-react";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { AnimatedCard } from "@/components/animations/AnimatedCard";

interface ProjectsProps {
  data: {
    sections: {
      projects: {
        title: string;
        subtitle: string;
      };
    };
  };
  projects: Project[];
}

const Projects = ({ data, projects }: ProjectsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [displayedCount, setDisplayedCount] = useState<number>(6);

  // Get unique categories
  const categories = ["all", ...new Set(projects.map(project => project.category))];
  
  // Filter projects
  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Sort projects: featured first, then by year
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.year - a.year;
  });

  // Progressive loading - show only displayedCount projects
  const displayedProjects = sortedProjects.slice(0, displayedCount);
  const hasMoreProjects = sortedProjects.length > displayedCount;

  // Reset displayed count when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setDisplayedCount(10);
  };

  // Load more projects
  const loadMoreProjects = () => {
    setDisplayedCount(prev => Math.min(prev + 10, sortedProjects.length));
  };

  const containerVariants = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { 
      opacity: 1, 
      y: 0
    }
  };

  return (
    <AnimatedSection id="projects" className="py-20 px-6 bg-surface/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <m.div variants={containerVariants} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }} className="text-center mb-20">
          <m.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 tracking-tight">
            {data.sections.projects.title}
          </m.h2>
          <m.p variants={itemVariants} className="text-lg md:text-xl text-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
            {data.sections.projects.subtitle}
          </m.p>
          <m.div variants={itemVariants} className="w-24 h-1 bg-gradient-primary mx-auto rounded-full shadow-glow" />
        </m.div>

        {/* Filters and View Mode */}
        <m.div
          variants={itemVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-8 mb-16 md:flex-row md:justify-between"
        >
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 lg:gap-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className={`
                  rounded-full px-6 py-3 text-sm font-medium transition-smooth relative overflow-hidden
                  ${
                    selectedCategory === category
                      ? "bg-gradient-primary text-white border-0 shadow-glow"
                      : "border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 hover:text-primary-glow hover:shadow-glow bg-surface-elevated/50"
                  }
                `}
              >
                {category === "all" ? "All Projects" : category}
                <Badge className={`ml-3 text-xs px-2 py-1 rounded-full ${selectedCategory === category ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>
                  {category === "all" ? projects.length : projects.filter((p) => p.category === category).length}
                </Badge>
              </Button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex rounded-full bg-surface-elevated p-1.5 border border-primary/20 shadow-card">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={`rounded-full px-4 py-2 transition-smooth ${
                viewMode === "grid" ? "bg-gradient-primary text-white shadow-glow" : "hover:bg-accent/20 text-accent hover:shadow-glow hover:scale-105"
              }`}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={`rounded-full px-4 py-2 transition-smooth ${
                viewMode === "list" ? "bg-gradient-primary text-white shadow-glow" : "hover:bg-accent/20 text-accent hover:shadow-glow hover:scale-105"
              }`}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </m.div>

        {/* Projects Grid/List */}
        {displayedProjects.length > 0 ? (
          <m.div
            variants={containerVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10" : "space-y-8"}
          >
            {displayedProjects.map((project, index) => (
              <AnimatedCard key={project.id} index={index}>
                <ProjectCard project={project} />
              </AnimatedCard>
            ))}
          </m.div>
        ) : (
          <div className="text-center py-16">
            <Filter className="w-16 h-16 text-primary/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-2">No projects found</h3>
            <p className="text-secondary">Try selecting a different category or view all projects.</p>
          </div>
        )}

        {/* Load More Projects Button */}
        {hasMoreProjects && (
          <m.div variants={itemVariants} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="text-center mt-16">
            <Button
              onClick={loadMoreProjects}
              variant="outline"
              size="lg"
              className="group border-primary/30 text-primary hover:bg-primary/25 hover:text-primary-glow hover:border-primary/50 transition-smooth bg-surface-elevated/50 backdrop-blur-sm shadow-card hover:shadow-glow px-8 py-3 text-base font-medium rounded-full"
            >
              <Plus className="mr-3 w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Load More Projects
              <Badge className="ml-3 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">{Math.min(10, sortedProjects.length - displayedCount)} more</Badge>
            </Button>
            <p className="text-secondary text-sm mt-4">
              Showing {displayedProjects.length} of {sortedProjects.length} projects
            </p>
          </m.div>
        )}
      </div>
    </AnimatedSection>
  );
};

export default Projects;