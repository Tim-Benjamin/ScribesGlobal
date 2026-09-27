import {
  useLayoutEffect,
  useRef,
} from "react";

import { Link } from "react-router-dom";
import { motion } from "motion/react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroVisual from "./HeroVisual";

import {
  HeroInteractionProvider,
} from "./HeroInteraction";

import "./hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const contentRef =
    useRef<HTMLDivElement>(null);

  const titleRef =
    useRef<HTMLHeadingElement>(null);

  const visualWrapperRef =
    useRef<HTMLDivElement>(null);

  const scrollRef =
    useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const media = gsap.matchMedia();

    const ctx = gsap.context(() => {
      media.add(
        "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.to(contentRef.current, {
            yPercent: -14,
            opacity: 0.4,

            ease: "none",

            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });

          gsap.to(
            visualWrapperRef.current,
            {
              yPercent: 12,
              scale: 1.08,

              ease: "none",

              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                scrub: 1.2,
              },
            },
          );

          gsap.to(titleRef.current, {
            letterSpacing: "0.015em",

            ease: "none",

            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "65% top",
              scrub: true,
            },
          });

          gsap.to(scrollRef.current, {
            opacity: 0,
            y: 20,

            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "25% top",
              scrub: true,
            },
          });
        },
      );
    }, section);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  return (
    <HeroInteractionProvider>
      <section
        ref={sectionRef}
        className="home-hero"
      >
        <div
          ref={visualWrapperRef}
          className="home-hero__visual-wrapper"
        >
          <HeroVisual />
        </div>

        <div className="home-hero__topline">
          <motion.span
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
          >
            Scribes Global
          </motion.span>

          <motion.span
            className="home-hero__topline-side"
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
          >
            Faith · Creativity · Purpose
          </motion.span>
        </div>

        <div
          ref={contentRef}
          className="home-hero__content"
        >
          <motion.p
            className="home-hero__eyebrow"
            initial={{
              opacity: 0,
              y: 22,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            FAITH ✦ CREATIVITY ✦ PURPOSE ✦ COMMUNITY
          </motion.p>

          <h1
            ref={titleRef}
            className="home-hero__title"
          >
            <span className="home-hero__title-line">
              <motion.span
                initial={{
                  y: "110%",
                }}
                animate={{
                  y: "0%",
                }}
                transition={{
                  duration: 1.15,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                CREATE
              </motion.span>
            </span>

            <span className="home-hero__title-line home-hero__title-line--accent">
              <motion.span
                initial={{
                  y: "110%",
                }}
                animate={{
                  y: "0%",
                }}
                transition={{
                  duration: 1.15,
                  delay: 0.32,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                WITH PURPOSE.
              </motion.span>
            </span>
          </h1>

          <motion.div
            className="home-hero__lower"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="home-hero__description">
              A creative arts ministry where faith
              becomes expression.
            </p>

            <div className="home-hero__actions">
              <Link
                to="/about"
                className="home-hero__cta"
                data-cursor="VIEW"
              >
                <span>Discover our story</span>

                <span
                  className="home-hero__cta-arrow"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </Link>

              <Link
                to="/chapters"
                className="home-hero__text-link"
                data-cursor="EXPLORE"
              >
                Find a chapter
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          ref={scrollRef}
          className="home-hero__scroll"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.4,
            duration: 0.8,
          }}
          aria-hidden="true"
        >
          <span>Scroll to explore</span>

          <span className="home-hero__scroll-line">
            <span />
          </span>
        </motion.div>
      </section>
    </HeroInteractionProvider>
  );
}