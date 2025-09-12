import { ReactNode } from "react";
import { m } from "framer-motion";

interface ShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
  shimmerDuration?: number;
  wordByWord?: boolean;
  staggerDelay?: number;
}

export const ShinyText = ({ 
  children, 
  className = "", 
  shimmerWidth = 100,
  shimmerDuration = 3,
  wordByWord = false,
  staggerDelay = 0.3
}: ShinyTextProps) => {
  // If not word-by-word animation, use the original implementation
  if (!wordByWord || typeof children !== 'string') {
    return (
      <div className={`relative inline-block overflow-hidden ${className}`}>
        <div className="relative">
          {children}
          <m.div
            className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{ width: `${shimmerWidth}%` }}
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: shimmerDuration,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    );
  }

  // Word-by-word animation
  const words = children.split(' ');
  
  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={index} className="relative inline-block overflow-hidden mr-1 last:mr-0">
          <span className="relative">
            {word}
            <m.div
              className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{ width: `${shimmerWidth}%` }}
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: shimmerDuration * 0.6,
                repeat: Infinity,
                repeatDelay: shimmerDuration * 2,
                delay: index * staggerDelay,
                ease: "easeInOut"
              }}
            />
          </span>
        </span>
      ))}
    </span>
  );
};