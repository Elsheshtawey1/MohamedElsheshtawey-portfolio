import { m } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  Code2, 
  Database, 
  Globe, 
  Layers, 
  Smartphone, 
  GitBranch,
  Cloud,
  Zap,
  Palette,
  Monitor,
  Server,
  FileCode
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { AnimatedCard } from "@/components/animations/AnimatedCard";

interface SkillsProps {
  skills: Array<{
    name: string;
    icon: string;
    category: string;
    color: string;
  }>;
}

const getSkillIcon = (iconName: string, color: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    "HTML": <Code2 className="w-8 h-8" style={{ color }} />,
    "CSS": <Palette className="w-8 h-8" style={{ color }} />,
    "JS": <FileCode className="w-6 h-6" style={{ color }} />,
    "TS": <Code2 className="w-6 h-6" style={{ color }} />,
    "⚛️": <Layers className="w-6 h-6" style={{ color }} />,
    "▲": <Globe className="w-6 h-6" style={{ color }} />,
    "🟢": <Server className="w-6 h-6" style={{ color }} />,
    "🍃": <Database className="w-6 h-6" style={{ color }} />,
    "EX": <Server className="w-6 h-6" style={{ color }} />,
    "ST": <Monitor className="w-6 h-6" style={{ color }} />,
    "RX": <Layers className="w-6 h-6" style={{ color }} />,
    "FM": <Zap className="w-6 h-6" style={{ color }} />,
  };
  
  return iconMap[iconName] || <Code2 className="w-6 h-6" style={{ color }} />;
};

const Skills = ({ skills }: SkillsProps) => {
  const containerVariants = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      scale: 1
    }
  };

  return (
    <TooltipProvider>
      <AnimatedSection className="py-16" staggerChildren={0.1}>
        <m.div 
          variants={itemVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">My Skills</h3>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full" />
        </m.div>

        <m.div 
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
        >
          {skills.map((skill, index) => (
            <m.div key={index} variants={itemVariants}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card
                    className="group h-32 p-4 bg-surface-elevated border-primary/20 hover:border-primary/40 transition-smooth hover-glow cursor-pointer"
                    style={{
                      borderColor: `${skill.color}30`,
                      boxShadow: `0 0 0 1px ${skill.color}20`,
                    }}
                  >
                    <div className="flex flex-col items-center text-center justify-between h-full">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-smooth"
                        style={{
                          backgroundColor: `${skill.color}15`,
                          border: `2px solid ${skill.color}30`,
                        }}
                      >
                        {getSkillIcon(skill.icon, skill.color)}
                      </div>
                      <div className="text-xs font-medium text-secondary group-hover:text-primary transition-smooth text-center leading-tight">
                        {skill.name}
                      </div>
                    </div>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="capitalize">{skill.category} Technology</p>
                </TooltipContent>
              </Tooltip>
            </m.div>
          ))}
        </m.div>
      </AnimatedSection>
    </TooltipProvider>
  );
};

export default Skills;