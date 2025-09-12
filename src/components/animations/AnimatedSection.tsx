import { ReactNode } from "react";
import { m } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  id?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true, margin: "-100px" }
};

export const AnimatedSection = ({ 
  children, 
  className = "", 
  delay = 0,
  staggerChildren,
  id
}: AnimatedSectionProps) => {
  const variants = staggerChildren ? staggerContainer : fadeInUp;
  
  return (
    <m.section
      id={id}
      variants={variants}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </m.section>
  );
};