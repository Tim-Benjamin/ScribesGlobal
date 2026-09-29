import {
  useEffect, useLayoutEffect, useRef, useState, type ReactNode,
} from "react";
import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { useLocation, useNavigationType, useOutlet } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, TIMING } from "../../motion-profiles";
import { useMotionEngine } from "../motion/motion-context";
import { useMediaPreference } from "../motion/useMediaPreference";

function RouteFrame({ children, pathname, entryKey, hash, restore }: {
  children: ReactNode;
  pathname: string;
  entryKey: string;
  hash: string;
  restore: boolean;
}) {
  const engine = useMotionEngine();
  const reduced = useMediaPreference("(prefers-reduced-motion: reduce)");
  const present = useIsPresent();
  const frame = useRef<HTMLDivElement>(null);
  // Only a pathname change mounts a new frame. Filter changes keep page state.
  const [entry] = useState(() => ({ entryKey, hash, restore }));

  useLayoutEffect(() => {
    const saved = engine.positions.get(entry.entryKey);
    const y = entry.restore && saved !== undefined ? saved : 0;
    engine.setRoute({ pathname, phase: reduced ? "idle" : "enter" });
    engine.lenis.current?.resize();
    if (engine.lenis.current) {
      engine.lenis.current.scrollTo(y, { immediate: true, force: true });
    } else {
      window.scrollTo({ top: y, behavior: "instant" });
    }
    if (entry.hash && saved === undefined) {
      let id = entry.hash.slice(1);
      try { id = decodeURIComponent(id); } catch { /* Use the literal hash. */ }
      document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
    }

    // Refresh once height settles after images and async data change the layout.
    let timer: ReturnType<typeof setTimeout> | undefined;
    const refresh = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        engine.lenis.current?.resize();
        ScrollTrigger.refresh();
      }, 120);
    };
    const observer = new ResizeObserver(refresh);
    if (frame.current) observer.observe(frame.current);
    refresh();
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [engine, entry, pathname, reduced]);

  return (
    <motion.div
      ref={frame}
      className="motion-route"
      tabIndex={-1}
      inert={!present}
      aria-hidden={!present || undefined}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        y: reduced ? 0 : -40,
        transition: { duration: reduced ? 0 : TIMING.exit, ease: EASE.expoOut },
      }}
      transition={{ duration: reduced ? 0 : TIMING.enter, ease: EASE.expoOut }}
      onAnimationStart={() => {
        if (!present) engine.setPhase("exit");
      }}
      onAnimationComplete={() => {
        if (!present || engine.route.current.pathname !== pathname) return;
        engine.setPhase("idle");
        ScrollTrigger.refresh();
        if (entryKey !== "default") frame.current?.focus({ preventScroll: true });
      }}
    >
      {children}
    </motion.div>
  );
}

export default function PageTransition({ children }: { children: ReactNode }) {
  const outlet = useOutlet();
  const location = useLocation();
  const navigation = useNavigationType();
  const engine = useMotionEngine();
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  useLayoutEffect(() => {
    if (previousPath.current === location.pathname) {
      const saved = engine.positions.get(location.key);
      if (navigation === "POP" && saved !== undefined) {
        if (engine.lenis.current) {
          engine.lenis.current.scrollTo(saved, { immediate: true, force: true });
        } else {
          window.scrollTo({ top: saved, behavior: "instant" });
        }
      } else if (location.hash) {
        let id = location.hash.slice(1);
        try { id = decodeURIComponent(id); } catch { /* Use the literal hash. */ }
        const target = document.getElementById(id);
        if (target) {
          if (engine.lenis.current) {
            engine.lenis.current.scrollTo(target, { immediate: true, force: true });
          } else {
            target.scrollIntoView({ behavior: "instant" });
          }
        }
      }
    }
    previousPath.current = location.pathname;
    return () => {
      engine.positions.set(location.key, window.scrollY);
      if (engine.positions.size > 80) {
        const oldest = engine.positions.keys().next().value;
        if (oldest !== undefined) engine.positions.delete(oldest);
      }
    };
  }, [engine, location.pathname, location.key, location.hash, navigation]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <RouteFrame
        key={location.pathname}
        pathname={location.pathname}
        entryKey={location.key}
        hash={location.hash}
        restore={navigation === "POP"}
      >
        {/* Capture the resolved page, not an Outlet that changes during exit. */}
        {outlet ?? children}
      </RouteFrame>
    </AnimatePresence>
  );
}
