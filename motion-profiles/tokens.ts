export const EASE = {
  expoOut: [0.16, 1, 0.3, 1],
  fluid: [0.76, 0, 0.24, 1],
  snap: [0.25, 1, 0.5, 1],
} as const;
export const SPRING = {
  magnetic: { stiffness: 250, damping: 20, mass: 0.5 },
  spatial: { stiffness: 80, damping: 18, mass: 1.2 },
  elastic: { stiffness: 400, damping: 10, mass: 0.2 },
} as const;
export const TIMING = {
  exit: 0.4, enter: 0.6, characterStagger: 0.02, exitStagger: 0.03,
} as const;
export interface MotionProfile {
  name: string;
  color: string;
  accent: string;
  cameraZ: number;
  shape: number;
  rotation: number;
}
