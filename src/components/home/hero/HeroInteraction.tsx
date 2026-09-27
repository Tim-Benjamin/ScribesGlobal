import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type MutableRefObject,
  type ReactNode,
} from "react";

export interface HeroPointer {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

interface HeroInteractionContextValue {
  pointer: MutableRefObject<HeroPointer>;
}

const HeroInteractionContext =
  createContext<HeroInteractionContextValue | null>(null);

export function HeroInteractionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pointer = useRef<HeroPointer>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      pointer.current = {
        x: event.clientX,
        y: event.clientY,

        normalizedX:
          (event.clientX / width - 0.5) * 2,

        normalizedY:
          (event.clientY / height - 0.5) * 2,
      };
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true },
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );
    };
  }, []);

  return (
    <HeroInteractionContext.Provider
      value={{ pointer }}
    >
      {children}
    </HeroInteractionContext.Provider>
  );
}

export function useHeroInteraction() {
  const context = useContext(
    HeroInteractionContext,
  );

  if (!context) {
    throw new Error(
      "useHeroInteraction must be used inside HeroInteractionProvider.",
    );
  }

  return context;
}