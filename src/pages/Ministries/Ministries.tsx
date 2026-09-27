import {
  useLayoutEffect,
  useRef,
} from "react";

import { Link } from "react-router-dom";
import { motion } from "motion/react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ministries.css";

gsap.registerPlugin(ScrollTrigger);

const MINISTRIES = [
  {
    number: "01",
    name: "Scribes Poetry",
    short: "Poetry",
    discipline: "Spoken Word / Poetry",
    description:
      "A community of spoken word artists and poets.",
    statement:
      "Words shaped with truth. Voices carrying Christ.",
    theme: "purple",
  },
  {
    number: "02",
    name: "Scribes Worship",
    short: "Worship",
    discipline: "Music / Worship",
    description:
      "A community of worship leaders and musicians.",
    statement:
      "Sound becomes surrender. Music becomes ministry.",
    theme: "blue",
  },
  {
    number: "03",
    name: "Scribes Khoros",
    short: "Khoros",
    discipline: "Dance / Movement",
    description:
      "Dance and creative movement ministry.",
    statement:
      "Faith expressed beyond words through movement.",
    theme: "magenta",
  },
];

export default function Ministries() {
  const pageRef =
    useRef<HTMLElement>(null);

  const heroRef =
    useRef<HTMLElement>(null);

  const heroWordRef =
    useRef<HTMLHeadingElement>(null);

  const cursorGlowRef =
    useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const ctx = gsap.context(() => {
      const media =
        gsap.matchMedia();

      media.add(
        "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
        () => {
          if (
            heroRef.current &&
            heroWordRef.current
          ) {
            gsap.to(
              heroWordRef.current,
              {
                yPercent: -20,
                scale: 1.08,
                opacity: 0.15,
                ease: "none",

                scrollTrigger: {
                  trigger:
                    heroRef.current,
                  start: "top top",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            );
          }

          const scenes =
            gsap.utils.toArray<HTMLElement>(
              ".ministry-scene",
            );

          scenes.forEach(
            (
              scene,
              index,
            ) => {
              const massive =
                scene.querySelector(
                  ".ministry-scene__massive",
                );

              const copy =
                scene.querySelector(
                  ".ministry-scene__content",
                );

              const orb =
                scene.querySelector(
                  ".ministry-scene__orb",
                );

              if (massive) {
                gsap.fromTo(
                  massive,
                  {
                    xPercent:
                      index % 2 === 0
                        ? -10
                        : 10,
                  },
                  {
                    xPercent:
                      index % 2 === 0
                        ? 8
                        : -8,

                    ease: "none",

                    scrollTrigger: {
                      trigger: scene,
                      start:
                        "top bottom",
                      end:
                        "bottom top",
                      scrub: 1.4,
                    },
                  },
                );
              }

              if (copy) {
                gsap.fromTo(
                  copy,
                  {
                    y: 90,
                    opacity: 0,
                  },
                  {
                    y: 0,
                    opacity: 1,

                    scrollTrigger: {
                      trigger: scene,
                      start:
                        "top 72%",
                      end:
                        "top 28%",
                      scrub: 1,
                    },
                  },
                );
              }

              if (orb) {
                gsap.to(orb, {
                  rotate:
                    index % 2 === 0
                      ? 38
                      : -38,

                  scale: 1.15,

                  ease: "none",

                  scrollTrigger: {
                    trigger: scene,
                    start:
                      "top bottom",
                    end:
                      "bottom top",
                    scrub: 1.2,
                  },
                });
              }
            },
          );
        },
      );
    }, page);

    return () => {
      ctx.revert();
    };
  }, []);

  useLayoutEffect(() => {
    const glow =
      cursorGlowRef.current;

    if (!glow) return;

    const moveX =
      gsap.quickTo(
        glow,
        "x",
        {
          duration: 0.8,
          ease: "power3.out",
        },
      );

    const moveY =
      gsap.quickTo(
        glow,
        "y",
        {
          duration: 0.8,
          ease: "power3.out",
        },
      );

    const handleMove = (
      event: PointerEvent,
    ) => {
      moveX(event.clientX);
      moveY(event.clientY);
    };

    window.addEventListener(
      "pointermove",
      handleMove,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handleMove,
      );
    };
  }, []);

  return (
    <main
      ref={pageRef}
      className="ministries-page"
    >
      <div
        ref={cursorGlowRef}
        className="ministries-cursor-glow"
        aria-hidden="true"
      />

      {/* HERO */}

      <section
        ref={heroRef}
        className="ministries-hero"
      >
        <div className="ministries-hero__grid" />

        <div className="ministries-hero__meta">
          <span>
            Scribes Global
          </span>

          <span>
            Creative Ministries
          </span>

          <span>
            03 Expressions
          </span>
        </div>

        <div className="ministries-hero__center">
          <motion.p
            className="ministries-hero__eyebrow"
            initial={{
              opacity: 0,
              y: 20,
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
            ONE MESSAGE.
            MANY EXPRESSIONS.
          </motion.p>

          <h1
            ref={heroWordRef}
            className="ministries-hero__title"
          >
            <span>
              MINIS
            </span>

            <span>
              TRIES
            </span>
          </h1>

          <motion.div
            className="ministries-hero__intro"
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
              delay: 0.75,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
          >
            <span>
              001—003
            </span>

            <p>
              Poetry. Worship.
              Movement. Different
              languages carrying the
              same Gospel.
            </p>
          </motion.div>
        </div>

        <div className="ministries-hero__orbit">
          <span />
          <span />
          <span />

          <strong>
            SG
          </strong>
        </div>

        <div className="ministries-hero__scroll">
          <span>
            Enter the ministries
          </span>

          <span className="ministries-hero__line">
            <span />
          </span>
        </div>
      </section>

      {/* MANIFESTO */}

      <section className="ministries-manifesto">
        <div className="ministries-container">
          <div className="ministries-manifesto__top">
            <span>
              00
            </span>

            <span>
              The expression
            </span>
          </div>

          <motion.p
            className="ministries-manifesto__statement"
            initial={{
              opacity: 0,
              y: 70,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-15%",
            }}
            transition={{
              duration: 1,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
          >
            Creativity is not
            decoration.
            <span>
              It is a language.
            </span>
            And every language can
            carry the message of
            Christ.
          </motion.p>
        </div>
      </section>

      {/* MINISTRY WORLDS */}

      <section className="ministries-worlds">
        {MINISTRIES.map(
          (
            ministry,
            index,
          ) => (
            <article
              key={ministry.name}
              className={`ministry-scene ministry-scene--${ministry.theme}`}
            >
              <div className="ministry-scene__background">
                <div className="ministry-scene__orb" />

                <div className="ministry-scene__rings">
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="ministry-scene__massive">
                {ministry.short}
              </div>

              <div className="ministry-scene__index">
                <span>
                  {ministry.number}
                </span>

                <span>
                  {String(
                    index + 1,
                  ).padStart(
                    2,
                    "0",
                  )}
                  /03
                </span>
              </div>

              <div className="ministry-scene__content">
                <p className="ministry-scene__discipline">
                  {
                    ministry.discipline
                  }
                </p>

                <h2>
                  {
                    ministry.name
                  }
                </h2>

                <p className="ministry-scene__statement">
                  {
                    ministry.statement
                  }
                </p>

                <p className="ministry-scene__description">
                  {
                    ministry.description
                  }
                </p>

                <Link
                  to="/volunteer"
                  className="ministry-scene__link"
                  data-cursor="EXPLORE"
                >
                  <span>
                    Step into this
                    ministry
                  </span>

                  <span
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </Link>
              </div>

              <div className="ministry-scene__side-label">
                <span>
                  Scribes Global
                </span>

                <span>
                  {
                    ministry.short
                  }
                </span>
              </div>

              <div className="ministry-scene__progress">
                <span
                  style={{
                    width: `${
                      ((index + 1) /
                        MINISTRIES.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </article>
          ),
        )}
      </section>

      {/* INTERLUDE */}

      <section className="ministries-interlude">
        <div className="ministries-interlude__track">
          <span>
            POETRY
          </span>

          <span>
            ✦
          </span>

          <span>
            WORSHIP
          </span>

          <span>
            ✦
          </span>

          <span>
            KHOROS
          </span>

          <span>
            ✦
          </span>

          <span>
            ONE MESSAGE
          </span>

          <span>
            ✦
          </span>

          <span>
            MANY EXPRESSIONS
          </span>
        </div>
      </section>

      {/* CALLING */}

      <section className="ministries-calling">
        <div className="ministries-container">
          <div className="ministries-calling__layout">
            <div className="ministries-calling__label">
              <span>
                04
              </span>

              <span>
                Your expression
              </span>
            </div>

            <motion.div
              className="ministries-calling__content"
              initial={{
                opacity: 0,
                y: 60,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-15%",
              }}
              transition={{
                duration: 0.9,
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
            >
              <h2>
                YOUR GIFT
                <span>
                  HAS A VOICE.
                </span>
              </h2>

              <p>
                Whether your language
                is words, sound,
                movement, design or
                another expression,
                there is space to grow,
                serve and create with
                purpose.
              </p>

              <div className="ministries-calling__actions">
                <Link
                  to="/volunteer"
                  className="ministries-calling__primary"
                  data-cursor="VIEW"
                >
                  <span>
                    Join the movement
                  </span>

                  <span>
                    ↗
                  </span>
                </Link>

                <Link
                  to="/chapters"
                  className="ministries-calling__secondary"
                  data-cursor="EXPLORE"
                >
                  Find a chapter
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}