import { motion } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageReveal({
  src,
  alt,
  className,
}: ImageRevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`image-reveal ${className ?? ""}`}
      initial={
        reducedMotion
          ? false
          : {
              clipPath: "inset(0 100% 0 0)",
            }
      }
      whileInView={{
        clipPath: "inset(0 0% 0 0)",
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: reducedMotion ? 0 : 1.2,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        initial={
          reducedMotion
            ? false
            : {
                scale: 1.2,
              }
        }
        whileInView={{
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: reducedMotion ? 0 : 1.4,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </motion.div>
  );
}