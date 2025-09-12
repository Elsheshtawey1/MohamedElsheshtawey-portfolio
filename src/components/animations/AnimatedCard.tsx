import { ReactNode } from "react";
import { m } from "framer-motion";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  index?: number;
}

const cardVariants = {
  initial: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  whileInView: { 
    opacity: 1, 
    y: 0,
    scale: 1
  },
  whileHover: {
    y: -5,
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};

export const AnimatedCard = ({ 
  children, 
  className = "", 
  delay = 0,
  index = 0
}: AnimatedCardProps) => {
  return (
    <m.div
      variants={cardVariants}
      initial="initial"
      whileInView="whileInView"
      whileHover="whileHover"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: delay + (index * 0.1), 
        duration: 0.5, 
        ease: [0.4, 0, 0.2, 1]
      }}
      className={className}
    >
      {children}
    </m.div>
  );
};