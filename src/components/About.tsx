import { m } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Code2, Sparkles, Target, Users, Award, Coffee } from "lucide-react";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { memo } from "react";

interface AboutProps {
  data: {
    personal: {
      bio: string;
    };
    sections: {
      about: {
        title: string;
        description: string;
      };
    };
  };
}

const About = ({ data }: AboutProps) => {
  const stats = [
    { icon: Code2, label: "Years Experience", value: "1+", color: "from-blue-500 to-cyan-500" },
    { icon: Target, label: "Projects Completed", value: "20+", color: "from-emerald-500 to-teal-500" },
    { icon: Users, label: "Happy Clients", value: "2+", color: "from-purple-500 to-pink-500" },
    { icon: Sparkles, label: "Technologies", value: "25+", color: "from-orange-500 to-red-500" },
  ];

  const containerVariants = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 40 },
    whileInView: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <AnimatedSection id="about" className="py-24 px-6 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-primary rounded-full opacity-5 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-secondary rounded-full opacity-5 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="max-w-7xl mx-auto">
        {/* Enhanced Section Header */}
        <m.div variants={containerVariants} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }} className="text-center mb-20">
          <m.div
            variants={itemVariants}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-elevated border border-primary/20 mb-6"
          >
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-secondary">About Me</span>
          </m.div>

          <m.h2 variants={itemVariants} transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }} className="text-5xl md:text-6xl font-bold text-primary mb-6 gradient-text">
            {data.sections.about.title}
          </m.h2>

          <m.div variants={itemVariants} transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }} className="w-32 h-1 bg-gradient-primary mx-auto rounded-full shadow-glow" />
        </m.div>

        <div className="grid lg:grid-cols-5 gap-16 items-start">
          {/* Enhanced Left Content */}
          <m.div
            variants={itemVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            className="lg:col-span-3 space-y-8"
          >
            {/* Main Description Card */}
            <Card className="p-8 bg-surface-elevated border-primary/10 shadow-elegant">
              <div className="space-y-6 p-1">
                <p className="text-xl text-primary leading-relaxed font-medium">{data.sections.about.description}</p>
                <div className="h-px bg-gradient-primary/30 rounded-full" />
                <p className="text-lg text-secondary leading-relaxed">{data.personal.bio}</p>
              </div>
            </Card>

            {/* Skills & Passion Card */}
            <Card className="p-8 bg-surface-elevated border-primary/10 shadow-elegant">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Coffee className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Passion for Excellence</h3>
                  <p className="text-secondary leading-relaxed">
                    I really care about building things well, especially when it comes to web apps. I try to make them not just work, but work smoothly and feel good to use. It’s satisfying to take an
                    idea and turn it into something real that people can actually interact with. I’m always learning and trying out new tools to keep things fresh and effective.
                  </p>
                </div>
              </div>
            </Card>
          </m.div>

          {/* Enhanced Right Content - Stats */}
          <m.div
            variants={containerVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <AnimatedCard key={index} index={index} delay={0.2}>
                <Card className="relative p-6 bg-surface-elevated border-primary/10 hover:border-primary/30 transition-smooth hover-glow group overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-smooth`} />

                  <div className="relative flex flex-col items-center text-center space-y-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-smooth shadow-lg`}>
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>

                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-primary gradient-text">{stat.value}</div>
                      <div className="text-sm text-secondary font-medium leading-tight">{stat.label}</div>
                    </div>
                  </div>
                </Card>
              </AnimatedCard>
            ))}
          </m.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default memo(About);
