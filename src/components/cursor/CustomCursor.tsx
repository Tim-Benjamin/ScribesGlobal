import {
  useEffect,
  useRef,
} from "react";

import { motion, useSpring } from "motion/react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useCursor } from "./CursorProvider";

export default function CustomCursor() {
  const { label } = useCursor();

  const reducedMotion = useReducedMotion();

  const isTouch = useMediaQuery(
    "(hover: none), (pointer: coarse)"
  );

  const cursorX = useSpring(0, {
    stiffness: 500,
    damping: 35,
    mass: 0.4,
  });

  const cursorY = useSpring(0, {
    stiffness: 500,
    damping: 35,
    mass: 0.4,
  });

  useEffect(() => {
    if (isTouch || reducedMotion) {
      return;
    }

    const move = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, [
    cursorX,
    cursorY,
    isTouch,
    reducedMotion,
  ]);

  if (isTouch || reducedMotion) {
    return null;
  }

  return (
    <motion.div
      className={`custom-cursor ${
        label ? "custom-cursor-active" : ""
      }`}
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      {label && <span>{label}</span>}
    </motion.div>
  );
}