import { motion } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export default function TextReveal({
  children,
  className,
  delay = 0,
}: TextRevealProps) {
  const reducedMotion = useReducedMotion();

  const words = children.split(" ");

  return (
    <span
      className={className}
      aria-label={children}
      style={{
        display: "inline",
      }}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
            marginRight: "0.25em",
          }}
        >
          <motion.span
            style={{
              display: "inline-block",
            }}
            initial={
              reducedMotion
                ? false
                : {
                    y: "110%",
                    opacity: 0,
                  }
            }
            whileInView={{
              y: "0%",
              opacity: 1,
            }}
            viewport={{
              once: true,
              amount: 0.8,
            }}
            transition={{
              duration: reducedMotion ? 0 : 0.8,
              delay: reducedMotion
                ? 0
                : delay + index * 0.045,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}