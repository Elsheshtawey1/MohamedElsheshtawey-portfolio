import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight, Calendar, Star } from "lucide-react";
import { Project } from "@/types/portfolio";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const statusColors = {
    completed: "bg-green-500/20 text-green-400 border-green-500/30",
    "in-progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    planning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
  };

  return (
    <Card className="group bg-surface-elevated border-primary/20 hover:border-primary/40 transition-smooth overflow-hidden hover-glow h-full flex flex-col">
      {/* Project Image */}
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover transition-smooth group-hover:scale-105"
        />
        
        {/* Overlay with Quick Actions */}
        <div className="absolute inset-0 bg-gradient-hero/80 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center gap-3">
          {project.details.links.live && (
            <Button size="sm" variant="outline" className="glass-effect">
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </Button>
          )}
          {project.details.links.github && (
            <Button size="sm" variant="outline" className="glass-effect">
              <Github className="w-4 h-4 mr-2" />
              Code
            </Button>
          )}
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-gradient-primary text-white border-0">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <Badge className={`border ${statusColors[project.status]} capitalize`}>
            {project.status.replace('-', ' ')}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6 flex-1 flex flex-col">
        {/* Project Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2 group-hover:gradient-text transition-smooth">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-secondary">
              <Calendar className="w-4 h-4" />
              <span>{project.year}</span>
              <span>•</span>
              <span className="text-accent">{project.category}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-secondary mb-6 leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 3).map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="text-xs bg-primary/10 text-primary border-primary/20"
            >
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs bg-surface text-secondary">
              +{project.tags.length - 3} more
            </Badge>
          )}
        </div>

        {/* View Details Button */}
        <Link to={`/project/${project.id}`} className="mt-auto">
          <Button className="w-full bg-gradient-primary hover:shadow-glow transition-smooth group">
            View Details
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-smooth" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;