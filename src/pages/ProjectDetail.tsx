import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Calendar, 
  Tag, 
  CheckCircle, 
  Lightbulb, 
  Target,
  Code2
} from "lucide-react";
import { useProject } from "@/hooks/usePortfolioData";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { project, loading, error } = useProject(projectId || "");

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-secondary">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return <Navigate to="/404" replace />;
  }

  const statusColors = {
    completed: "bg-green-500/20 text-green-400 border-green-500/30",
    "in-progress": "bg-blue-500/20 text-blue-400 border-blue-500/30", 
    planning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
  };

  return (
    <div className="min-h-screen bg-gradient-hero pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
        </div>

        {/* Project Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Project Image */}
          <div className="relative overflow-hidden rounded-2xl shadow-card">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-hero/20" />
          </div>

          {/* Project Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Badge className={`border ${statusColors[project.status]} capitalize`}>
                  {project.status.replace('-', ' ')}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-secondary">
                  <Calendar className="w-4 h-4" />
                  <span>{project.year}</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 gradient-text">
                {project.title}
              </h1>
              
              <p className="text-lg text-secondary leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {project.details.links.live && (
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:shadow-glow transition-smooth"
                  onClick={() => window.open(project.details.links.live, '_blank')}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Live Project
                </Button>
              )}
              
              {project.details.links.github && (
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary/30 text-primary hover:bg-primary/10"
                  onClick={() => window.open(project.details.links.github, '_blank')}
                >
                  <Github className="w-5 h-5 mr-2" />
                  View Code
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Overview */}
          <Card className="lg:col-span-2 bg-surface-elevated border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                <Lightbulb className="w-6 h-6" />
                Project Overview
              </h2>
              <p className="text-secondary leading-relaxed text-lg mb-8">
                {project.details.overview}
              </p>

              {/* Challenges & Solutions */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Challenges
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    {project.details.challenges}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Solutions
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    {project.details.solutions}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <div className="space-y-6">
            {/* Features */}
            <Card className="bg-surface-elevated border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {project.details.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-secondary">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Tech Stack Breakdown */}
            <Card className="bg-surface-elevated border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                  <Code2 className="w-5 h-5" />
                  Tech Stack
                </h3>
                <div className="space-y-4">
                  {Object.entries(project.details.technologies).map(([category, techs]) => (
                    <div key={category}>
                      <h4 className="text-sm font-medium text-primary capitalize mb-2">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {techs.map((tech, index) => (
                          <Badge 
                            key={index}
                            variant="secondary" 
                            className="text-xs bg-primary/5 text-secondary border-primary/10"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Projects CTA */}
        <div className="text-center mt-16 pt-16 border-t border-primary/20">
          <h3 className="text-2xl font-semibold text-primary mb-4">
            Interested in similar projects?
          </h3>
          <p className="text-secondary mb-8 max-w-2xl mx-auto">
            Check out more of my work or get in touch to discuss your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#projects">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-smooth">
                View All Projects
              </Button>
            </Link>
            <Link to="/#contact">
              <Button variant="outline" size="lg" className="border-primary/30 text-primary hover:bg-primary/10">
                Start a Project
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;