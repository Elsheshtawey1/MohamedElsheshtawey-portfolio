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
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
  };

  return (
    <AnimatedSection id="about" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-20 right-10 w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 bg-gradient-primary rounded-full opacity-5 blur-3xl animate-float" />
      <div
        className="absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 bg-gradient-secondary rounded-full opacity-5 blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <m.div variants={containerVariants} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }} className="text-center mb-12 sm:mb-16 md:mb-20">
          <m.h2
            variants={itemVariants}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6 gradient-text leading-snug"
          >
            {data.sections.about.title}
          </m.h2>

          <m.div variants={itemVariants} transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }} className="w-20 sm:w-28 md:w-32 h-1 bg-gradient-primary mx-auto rounded-full shadow-glow" />
        </m.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-16 items-start">
          {/* Left Side */}
          <m.div
            variants={itemVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            className="lg:col-span-3 space-y-6 sm:space-y-8"
          >
            {/* Main Description */}
            <Card className="p-4 sm:p-6 md:p-8 bg-surface-elevated border-primary/10 shadow-elegant">
              <div className="space-y-6">
                <p className="text-xl sm:text-2xl font-semibold text-primary leading-relaxed">Turning ideas into interactive, user-friendly web experiences.</p>

                <div className="h-px bg-gradient-primary/30 rounded-full" />

                <div className="text-base sm:text-lg text-secondary leading-relaxed space-y-4">
                  <p>
                    My name is <strong>Mohamed Elsheshtawey</strong>, a self-taught MERN Stack developer with a strong passion for modern web technologies. Although I originally studied law, my
                    curiosity for coding pushed me to learn web development from the ground up.
                  </p>

                  <p>
                    Over the past years, I’ve built and delivered multiple freelance projects — focusing on both <strong>visual appeal</strong> and <strong>functionality</strong>. I specialize in
                    MongoDB, Express, React, and Node.js, while leveraging modern tools like Vite, TypeScript, and Tailwind CSS.
                  </p>

                  <p>
                    My goal is to build products that are <strong>smooth</strong>, <strong>scalable</strong>, and <strong>delightful to use</strong>. I love solving real-world problems and helping
                    clients bring their ideas to life through clean, maintainable code.
                  </p>
                </div>
              </div>
            </Card>

            {/* Passion Card */}
            <Card className="p-4 sm:p-6 md:p-8 bg-surface-elevated border-primary/10 shadow-elegant">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Coffee className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2 sm:mb-3">Passion for Excellence</h3>
                  <p className="text-secondary text-sm sm:text-base leading-relaxed">
                    I care deeply about crafting high-quality applications that not only work well but also feel great to use. Each project is an opportunity to refine my skills and deliver something
                    meaningful — combining creativity, logic, and attention to detail.
                  </p>
                </div>
              </div>
            </Card>
          </m.div>

          {/* Right Side (Stats) */}
          <m.div
            variants={containerVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6"
          >
            {stats.map((stat, index) => (
              <AnimatedCard key={index} index={index} delay={0.2}>
                <Card className="relative p-4 sm:p-6 bg-surface-elevated border-primary/10 hover:border-primary/30 transition-smooth hover-glow group overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-smooth`} />

                  <div className="relative flex flex-col items-center text-center space-y-3 sm:space-y-4">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-smooth shadow-lg`}>
                      <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                      <div className="text-2xl sm:text-3xl font-bold text-primary gradient-text">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-secondary font-medium leading-tight">{stat.label}</div>
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
