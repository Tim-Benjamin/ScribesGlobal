import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  duration = 1,
  className,
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 80,
              clipPath: "inset(0 0 100% 0)",
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: reducedMotion ? 0 : duration,
        delay: reducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}