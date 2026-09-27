import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    const handleScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", handleScroll);

    gsap.ticker.add(update);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", handleScroll);
      gsap.ticker.remove(update);

      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}