import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";

import { Link } from "react-router-dom";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SectionTransition from "../../components/animation/SectionTransition";

import "./project-move.css";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   CONSTANTS
========================================================= */

const DONATION_URL =
  "https://donate.changoapp.com/campaign/6728c4e07586d";

const VIDEO_URL =
  "https://www.youtube.com/embed/r7ou9YEnv44?rel=0&modestbranding=1&color=white";

/* =========================================================
   HERO SLIDES
========================================================= */

const HERO_SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1800&q=85",
    label:
      "Amplifying the Gospel",
  },
  {
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1800&q=85",
    label:
      "Ministry in Motion",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1800&q=85",
    label:
      "Scribes in Outreach",
  },
  {
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1800&q=85",
    label:
      "Creative Voice, Loud Impact",
  },
  {
    image:
      "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=1800&q=85",
    label:
      "Equipped for the Kingdom",
  },
];

/* =========================================================
   MOVE MEANING
========================================================= */

const MOVE_PILLARS = [
  {
    letter: "M",
    word: "Ministry",
    description:
      "Everything we do is rooted in ministry — serving God and His people through the creative arts and spoken word.",
    className:
      "move-pillar--purple",
  },

  {
    letter: "O",
    word: "Outreach",
    description:
      "Reaching beyond our walls to campuses, communities, and everywhere the Spirit leads — carrying the gospel outward.",
    className:
      "move-pillar--violet",
  },

  {
    letter: "V",
    word: "Voice",
    description:
      "The spoken word, poetry, music — every voice sharpened and amplified to declare truth with boldness and clarity.",
    className:
      "move-pillar--gold",
  },

  {
    letter: "E",
    word: "Equipment",
    description:
      "Practical tools — PA systems, microphones, and gear — that physically equip us to be heard wherever God sends us.",
    className:
      "move-pillar--deep",
  },
];

/* =========================================================
   HOW TO GIVE
========================================================= */

const GIVE_STEPS = [
  {
    number: "01",
    title: "Click the Link",
    icon: "↗",
    description:
      "Visit our giving page at donate.changoapp.com — quick, secure, and easy on any device.",
  },

  {
    number: "02",
    title: "Give Any Amount",
    icon: "♥",
    description:
      "There is no minimum. Every seed — whether large or small — is counted and appreciated by God and by us.",
  },

  {
    number: "03",
    title: "Give Monthly",
    icon: "↻",
    description:
      "Set up a recurring monthly gift and become a consistent partner in this specific project for the ministry.",
  },
];

/* =========================================================
   PROJECT MOVE
========================================================= */

export default function ProjectMove() {
  const pageRef =
    useRef<HTMLElement>(null);

  const heroRef =
    useRef<HTMLElement>(null);

  const heroTitleRef =
    useRef<HTMLHeadingElement>(null);

  const signalRef =
    useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] =
    useState(0);

  const [paused, setPaused] =
    useState(false);

  const [videoOpen, setVideoOpen] =
    useState(false);

  const touchStart =
    useRef(0);

  /* =======================================================
     SLIDESHOW
  ======================================================= */

  useEffect(() => {
    if (paused) {
      return;
    }

    const timer =
      window.setInterval(
        () => {
          setCurrentSlide(
            (current) =>
              (current + 1) %
              HERO_SLIDES.length,
          );
        },
        6500,
      );

    return () => {
      window.clearInterval(
        timer,
      );
    };
  }, [paused]);

  const goNext = () => {
    setCurrentSlide(
      (current) =>
        (current + 1) %
        HERO_SLIDES.length,
    );
  };

  const goPrevious = () => {
    setCurrentSlide(
      (current) =>
        (current -
          1 +
          HERO_SLIDES.length) %
        HERO_SLIDES.length,
    );
  };

  const handleTouchStart = (
    event: TouchEvent<HTMLElement>,
  ) => {
    touchStart.current =
      event.touches[0].clientX;
  };

  const handleTouchEnd = (
    event: TouchEvent<HTMLElement>,
  ) => {
    const distance =
      event.changedTouches[0]
        .clientX -
      touchStart.current;

    if (
      Math.abs(distance) <
      50
    ) {
      return;
    }

    if (distance < 0) {
      goNext();
    } else {
      goPrevious();
    }
  };

  /* =======================================================
     GSAP
  ======================================================= */

  useLayoutEffect(() => {
    const page =
      pageRef.current;

    if (!page) {
      return;
    }

    const mm =
      gsap.matchMedia();

    const ctx =
      gsap.context(() => {
        /* =================================================
           DESKTOP
        ================================================= */

        mm.add(
          "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
          () => {
            /* ---------------------------------------------
               HERO TITLE DEPTH
            --------------------------------------------- */

            if (
              heroRef.current &&
              heroTitleRef.current
            ) {
              gsap.to(
                heroTitleRef.current,
                {
                  yPercent:
                    -18,

                  scale:
                    1.04,

                  opacity:
                    0.14,

                  ease:
                    "none",

                  scrollTrigger: {
                    trigger:
                      heroRef.current,

                    start:
                      "top top",

                    end:
                      "bottom top",

                    scrub:
                      1,
                  },
                },
              );
            }

            /* ---------------------------------------------
               SIGNAL WAVE
            --------------------------------------------- */

            if (
              signalRef.current
            ) {
              gsap.to(
                signalRef.current,
                {
                  xPercent:
                    -22,

                  ease:
                    "none",

                  scrollTrigger: {
                    trigger:
                      heroRef.current,

                    start:
                      "top top",

                    end:
                      "bottom top",

                    scrub:
                      1.2,
                  },
                },
              );
            }

            /* ---------------------------------------------
               SCENE OPENINGS
            --------------------------------------------- */

            const scenes =
              gsap.utils.toArray<HTMLElement>(
                ".move-scene",
                page,
              );

            scenes.forEach(
              (
                scene,
                index,
              ) => {
                if (
                  index === 0
                ) {
                  return;
                }

                const inner =
                  scene.querySelector<HTMLElement>(
                    ".move-scene__inner",
                  );

                const curtain =
                  scene.querySelector<HTMLElement>(
                    ".section-transition__curtain",
                  );

                gsap.fromTo(
                  scene,
                  {
                    clipPath:
                      index % 2 === 0
                        ? "inset(0% 5% 0% 5% round 3rem)"
                        : "inset(7% 0% 0% 0% round 3rem 3rem 0 0)",
                  },

                  {
                    clipPath:
                      "inset(0% 0% 0% 0% round 0rem)",

                    ease:
                      "none",

                    scrollTrigger: {
                      trigger:
                        scene,

                      start:
                        "top 96%",

                      end:
                        "top 37%",

                      scrub:
                        1,
                    },
                  },
                );

                if (inner) {
                  gsap.fromTo(
                    inner,
                    {
                      y:
                        index % 2 ===
                        0
                          ? 90
                          : 55,
                    },

                    {
                      y: 0,

                      ease:
                        "none",

                      scrollTrigger: {
                        trigger:
                          scene,

                        start:
                          "top 95%",

                        end:
                          "top 43%",

                        scrub:
                          1,
                      },
                    },
                  );
                }

                if (curtain) {
                  gsap.fromTo(
                    curtain,
                    {
                      scaleX: 1,
                    },

                    {
                      scaleX: 0,

                      transformOrigin:
                        index % 2 ===
                        0
                          ? "right"
                          : "left",

                      ease:
                        "power3.inOut",

                      scrollTrigger: {
                        trigger:
                          scene,

                        start:
                          "top 93%",

                        end:
                          "top 50%",

                        scrub:
                          1,
                      },
                    },
                  );
                }
              },
            );

            /* ---------------------------------------------
               MOVE PILLARS
            --------------------------------------------- */

            const pillars =
              gsap.utils.toArray<HTMLElement>(
                ".move-pillar",
                page,
              );

            pillars.forEach(
              (
                pillar,
                index,
              ) => {
                const letter =
                  pillar.querySelector<HTMLElement>(
                    ".move-pillar__letter",
                  );

                gsap.fromTo(
                  pillar,
                  {
                    y:
                      80 +
                      index *
                        15,

                    opacity:
                      0,
                  },

                  {
                    y: 0,

                    opacity:
                      1,

                    ease:
                      "none",

                    scrollTrigger: {
                      trigger:
                        pillar,

                      start:
                        "top 90%",

                      end:
                        "top 58%",

                      scrub:
                        0.8,
                    },
                  },
                );

                if (letter) {
                  gsap.fromTo(
                    letter,
                    {
                      rotate:
                        index %
                          2 ===
                        0
                          ? -30
                          : 30,

                      scale:
                        0.65,
                    },

                    {
                      rotate:
                        0,

                      scale:
                        1,

                      ease:
                        "none",

                      scrollTrigger: {
                        trigger:
                          pillar,

                        start:
                          "top 88%",

                        end:
                          "top 56%",

                        scrub:
                          0.8,
                      },
                    },
                  );
                }
              },
            );

            /* ---------------------------------------------
               ANNOUNCEMENT CARD
            --------------------------------------------- */

            const announcement =
              page.querySelector<HTMLElement>(
                ".move-announcement__card",
              );

            if (
              announcement
            ) {
              gsap.fromTo(
                announcement,
                {
                  rotateX:
                    9,

                  scale:
                    0.93,

                  y:
                    100,
                },

                {
                  rotateX:
                    0,

                  scale:
                    1,

                  y:
                    0,

                  transformPerspective:
                    1200,

                  ease:
                    "none",

                  scrollTrigger: {
                    trigger:
                      announcement,

                    start:
                      "top 92%",

                    end:
                      "center 55%",

                    scrub:
                      1,
                  },
                },
              );
            }

            /* ---------------------------------------------
               VIDEO
            --------------------------------------------- */

            const videoFrame =
              page.querySelector<HTMLElement>(
                ".move-video__frame",
              );

            if (
              videoFrame
            ) {
              gsap.fromTo(
                videoFrame,
                {
                  clipPath:
                    "inset(0% 100% 0% 0% round 1.5rem)",
                },

                {
                  clipPath:
                    "inset(0% 0% 0% 0% round 1.5rem)",

                  ease:
                    "none",

                  scrollTrigger: {
                    trigger:
                      videoFrame,

                    start:
                      "top 87%",

                    end:
                      "center 50%",

                    scrub:
                      1,
                  },
                },
              );
            }

            /* ---------------------------------------------
               WHY MOVE IMAGE
            --------------------------------------------- */

            const whyImage =
              page.querySelector<HTMLElement>(
                ".move-why__image",
              );

            if (whyImage) {
              gsap.fromTo(
                whyImage,
                {
                  y:
                    90,

                  scale:
                    0.94,
                },

                {
                  y:
                    -30,

                  scale:
                    1,

                  ease:
                    "none",

                  scrollTrigger: {
                    trigger:
                      ".move-why",

                    start:
                      "top bottom",

                    end:
                      "bottom top",

                    scrub:
                      1.2,
                  },
                },
              );
            }

            /* ---------------------------------------------
               GIVING STEPS
            --------------------------------------------- */

            const steps =
              gsap.utils.toArray<HTMLElement>(
                ".move-give-step",
                page,
              );

            steps.forEach(
              (
                step,
                index,
              ) => {
                gsap.fromTo(
                  step,
                  {
                    x:
                      index ===
                      0
                        ? -70
                        : index ===
                          2
                        ? 70
                        : 0,

                    y:
                      index ===
                      1
                        ? 70
                        : 25,

                    opacity:
                      0,
                  },

                  {
                    x: 0,
                    y: 0,

                    opacity:
                      1,

                    ease:
                      "none",

                    scrollTrigger: {
                      trigger:
                        step,

                      start:
                        "top 90%",

                      end:
                        "top 60%",

                      scrub:
                        0.7,
                    },
                  },
                );
              },
            );

            /* ---------------------------------------------
               FINAL SIGNAL EXPANSION
            --------------------------------------------- */

            const finalCta =
              page.querySelector<HTMLElement>(
                ".move-final",
              );

            if (
              finalCta
            ) {
              gsap.fromTo(
                finalCta,
                {
                  clipPath:
                    "polygon(0 18%, 100% 0%, 100% 82%, 0% 100%)",
                },

                {
                  clipPath:
                    "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",

                  ease:
                    "none",

                  scrollTrigger: {
                    trigger:
                      finalCta,

                    start:
                      "top 95%",

                    end:
                      "top 25%",

                    scrub:
                      1,
                  },
                },
              );
            }
          },
        );

        /* =================================================
           MOBILE
        ================================================= */

        mm.add(
          "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
          () => {
            const scenes =
              gsap.utils.toArray<HTMLElement>(
                ".move-scene",
                page,
              );

            scenes.forEach(
              (
                scene,
                index,
              ) => {
                if (
                  index === 0
                ) {
                  return;
                }

                gsap.fromTo(
                  scene,
                  {
                    opacity:
                      0,

                    y:
                      38,
                  },

                  {
                    opacity:
                      1,

                    y:
                      0,

                    duration:
                      0.85,

                    ease:
                      "power3.out",

                    scrollTrigger: {
                      trigger:
                        scene,

                      start:
                        "top 90%",

                      toggleActions:
                        "play none none none",
                    },
                  },
                );
              },
            );
          },
        );
      }, page);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main
      ref={pageRef}
      className="project-move"
    >
      {/* ===================================================
          HERO
      =================================================== */}

      <section
        ref={heroRef}
        className="move-hero move-scene"
        onMouseEnter={() =>
          setPaused(true)
        }
        onMouseLeave={() =>
          setPaused(false)
        }
        onTouchStart={
          handleTouchStart
        }
        onTouchEnd={
          handleTouchEnd
        }
      >
        <div className="move-hero__slides">
          <AnimatePresence
            mode="sync"
            initial={false}
          >
            <motion.div
              key={
                currentSlide
              }
              className="move-hero__slide"
              initial={{
                clipPath:
                  "inset(0 100% 0 0)",
              }}
              animate={{
                clipPath:
                  "inset(0 0% 0 0)",
              }}
              exit={{
                clipPath:
                  "inset(0 0 0 100%)",
              }}
              transition={{
                duration:
                  1.1,

                ease: [
                  0.77,
                  0,
                  0.18,
                  1,
                ],
              }}
            >
              <motion.img
                src={
                  HERO_SLIDES[
                    currentSlide
                  ].image
                }
                alt=""
                initial={{
                  scale:
                    1.08,
                }}
                animate={{
                  scale:
                    1.16,
                }}
                transition={{
                  duration:
                    8,

                  ease:
                    "easeOut",
                }}
              />

              <div className="move-hero__image-tint" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="move-hero__overlay" />

        <div className="move-hero__grain" />

        <div
          ref={signalRef}
          className="move-hero__signal"
          aria-hidden="true"
        >
          {Array.from({
            length: 42,
          }).map(
            (
              _,
              index,
            ) => (
              <span
                key={
                  index
                }
                style={{
                  "--signal-height":
                    `${
                      14 +
                      ((index *
                        17) %
                        68)
                    }%`,
                } as React.CSSProperties}
              />
            ),
          )}
        </div>

        <div className="move-hero__particles">
          {Array.from({
            length: 28,
          }).map(
            (
              _,
              index,
            ) => (
              <span
                key={
                  index
                }
                style={{
                  "--x":
                    `${
                      (index *
                        37) %
                      100
                    }%`,

                  "--y":
                    `${
                      (index *
                        53) %
                      100
                    }%`,

                  "--delay":
                    `${
                      (index %
                        8) *
                      -0.6
                    }s`,

                  "--duration":
                    `${
                      5 +
                      (index %
                        6)
                    }s`,
                } as React.CSSProperties}
              />
            ),
          )}
        </div>

        <button
          type="button"
          className="move-hero__arrow move-hero__arrow--left"
          onClick={
            goPrevious
          }
          aria-label="Previous slide"
        >
          ←
        </button>

        <button
          type="button"
          className="move-hero__arrow move-hero__arrow--right"
          onClick={
            goNext
          }
          aria-label="Next slide"
        >
          →
        </button>

        <div className="move-hero__content">
          <motion.div
            className="move-hero__badge"
            initial={{
              opacity:
                0,

              y:
                20,
            }}
            animate={{
              opacity:
                1,

              y:
                0,
            }}
            transition={{
              duration:
                0.8,

              delay:
                0.15,
            }}
          >
            <span>
              ●
            </span>

            Scribes Global Initiative
          </motion.div>

          <h1
            ref={heroTitleRef}
            className="move-hero__title"
          >
            <span className="move-title-mask">
              <motion.span
                initial={{
                  y:
                    "110%",
                }}
                animate={{
                  y:
                    "0%",
                }}
                transition={{
                  duration:
                    1.1,

                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
                }}
              >
                PROJECT
              </motion.span>
            </span>

            <span className="move-title-mask">
              <motion.span
                className="move-hero__title-accent"
                initial={{
                  y:
                    "110%",
                }}
                animate={{
                  y:
                    "0%",
                }}
                transition={{
                  duration:
                    1.1,

                  delay:
                    0.15,

                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
                }}
              >
                MOVE
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="move-hero__acronym"
            initial={{
              opacity:
                0,

              y:
                20,
            }}
            animate={{
              opacity:
                1,

              y:
                0,
            }}
            transition={{
              duration:
                0.8,

              delay:
                0.55,
            }}
          >
            <strong>M</strong>
            inistry
            <span>·</span>

            <strong>O</strong>
            utreach
            <span>·</span>

            <strong>V</strong>
            oice
            <span>·</span>

            <strong>E</strong>
            quipment
          </motion.p>

          <motion.p
            className="move-hero__description"
            initial={{
              opacity:
                0,

              y:
                20,
            }}
            animate={{
              opacity:
                1,

              y:
                0,
            }}
            transition={{
              duration:
                0.8,

              delay:
                0.7,
            }}
          >
            Equipping the ministry
            to speak louder — for
            the Kingdom.
          </motion.p>

          <motion.div
            className="move-hero__pills"
            initial={{
              opacity:
                0,

              y:
                20,
            }}
            animate={{
              opacity:
                1,

              y:
                0,
            }}
            transition={{
              duration:
                0.8,

              delay:
                0.85,
            }}
          >
            <span>
              Microphones
            </span>

            <span>
              PA System
            </span>

            <span>
              Outreach-Ready
            </span>
          </motion.div>

          <motion.a
            href={
              DONATION_URL
            }
            target="_blank"
            rel="noopener noreferrer"
            className="move-button move-button--gold"
            data-cursor="VIEW"
            initial={{
              opacity:
                0,

              y:
                20,
            }}
            animate={{
              opacity:
                1,

              y:
                0,
            }}
            transition={{
              duration:
                0.8,

              delay:
                1,
            }}
          >
            <span>
              Give to Project MOVE
            </span>

            <span>
              ↗
            </span>
          </motion.a>
        </div>

        <div className="move-hero__caption">
          <div>
            <span>
              Scribes Global
            </span>

            <strong>
              {
                HERO_SLIDES[
                  currentSlide
                ].label
              }
            </strong>
          </div>

          <span>
            {String(
              currentSlide +
                1,
            ).padStart(
              2,
              "0",
            )}
            {" / "}
            {String(
              HERO_SLIDES.length,
            ).padStart(
              2,
              "0",
            )}
          </span>
        </div>

        <div className="move-hero__rail">
          <strong>
            {String(
              currentSlide +
                1,
            ).padStart(
              2,
              "0",
            )}
          </strong>

          <div>
            <motion.span
              key={
                currentSlide
              }
              initial={{
                scaleX:
                  0,
              }}
              animate={{
                scaleX:
                  1,
              }}
              transition={{
                duration:
                  paused
                    ? 0
                    : 6.5,

                ease:
                  "linear",
              }}
            />
          </div>

          <span>
            {String(
              HERO_SLIDES.length,
            ).padStart(
              2,
              "0",
            )}
          </span>
        </div>
      </section>

      {/* ===================================================
          ACRONYM
      =================================================== */}

      <section className="move-meaning move-scene">
        <SectionTransition label="M · O · V · E" />

        <div className="move-scene__inner">
          <div className="move-container">
            <div className="move-heading">
              <div>
                <span>
                  01
                </span>

                <p>
                  What MOVE Means
                </p>
              </div>

              <h2>
                FOUR WORDS,
                <span>
                  ONE MISSION.
                </span>
              </h2>
            </div>

            <div className="move-pillars">
              {MOVE_PILLARS.map(
                (
                  item,
                  index,
                ) => (
                  <article
                    key={
                      item.word
                    }
                    className={`move-pillar ${item.className}`}
                  >
                    <span className="move-pillar__index">
                      {String(
                        index +
                          1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <div className="move-pillar__letter">
                      {
                        item.letter
                      }
                    </div>

                    <h3>
                      {
                        item.word
                      }
                    </h3>

                    <p>
                      {
                        item.description
                      }
                    </p>

                    <span className="move-pillar__arrow">
                      ↗
                    </span>
                  </article>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          ANNOUNCEMENT
      =================================================== */}

      <section className="move-announcement move-scene">
        <SectionTransition label="FROM THE FAMILY" />

        <div className="move-scene__inner">
          <div className="move-container">
            <div className="move-heading move-heading--center">
              <div>
                <span>
                  02
                </span>

                <p>
                  From the Family
                </p>
              </div>

              <h2>
                A GENTLE
                <span>
                  REMINDER.
                </span>
              </h2>
            </div>

            <article className="move-announcement__card">
              <div
                className="move-announcement__quote"
                aria-hidden="true"
              >
                “
              </div>

              <div className="move-announcement__meta">
                <span>
                  PROJECT MOVE
                </span>

                <span>
                  SCRIBES GLOBAL
                </span>
              </div>

              <div className="move-announcement__message">
                <p className="move-announcement__hello">
                  Hello family,
                </p>

                <p>
                  A gentle reminder
                  concerning our{" "}
                  <strong>
                    Project Move
                  </strong>{" "}
                  initiative. We are
                  trusting God to help
                  us procure essential
                  equipment such as{" "}
                  <strong>
                    microphones
                  </strong>{" "}
                  and a{" "}
                  <strong>
                    PA system
                  </strong>{" "}
                  to strengthen our
                  meetings and outreach
                  activities.
                </p>

                <p>
                  April is soon ending
                  and we want to remind
                  all about our{" "}
                  <strong>
                    monthly giving
                  </strong>{" "}
                  towards our project.
                  Give any seed to
                  support the ministry.
                </p>

                <p>
                  Give easily through
                  the link below:
                </p>

                <a
                  href={
                    DONATION_URL
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="VIEW"
                >
                  donate.changoapp.com
                  <span>
                    ↗
                  </span>
                </a>
              </div>

              <div className="move-announcement__tags">
                <span>
                  #ScribesGlobal
                </span>

                <span>
                  #ProjectMove
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===================================================
          VIDEO
      =================================================== */}

      <section className="move-video move-scene">
        <SectionTransition label="WATCH THE VISION" />

        <div className="move-scene__inner">
          <div className="move-container">
            <div className="move-heading">
              <div>
                <span>
                  03
                </span>

                <p>
                  Watch the Vision
                </p>
              </div>

              <h2>
                PROJECT MOVE
                <span>
                  — THE CALL.
                </span>
              </h2>
            </div>

            <div className="move-video__layout">
              <div className="move-video__media">
                <div className="move-video__frame">
                  <div className="move-video__window-bar">
                    <div>
                      <span />
                      <span />
                      <span />
                    </div>

                    <p>
                      PROJECT MOVE —
                      SCRIBES GLOBAL
                    </p>
                  </div>

                  <button
                    type="button"
                    className="move-video__preview"
                    onClick={() =>
                      setVideoOpen(
                        true,
                      )
                    }
                    data-cursor="PLAY"
                    aria-label="Play Project MOVE video"
                  >
                    <img
                      src="https://img.youtube.com/vi/r7ou9YEnv44/maxresdefault.jpg"
                      alt="Project MOVE video"
                      loading="lazy"
                    />

                    <span className="move-video__play">
                      <i>
                        ▶
                      </i>
                    </span>

                    <span className="move-video__preview-label">
                      Play vision film
                    </span>
                  </button>
                </div>

                <div className="move-video__scriptures">
                  <span>
                    Matthew 28:19–20
                  </span>

                  <i>·</i>

                  <span>
                    John 3:16
                  </span>

                  <i>·</i>

                  <span>
                    The Great Commission
                  </span>
                </div>
              </div>

              <div className="move-video__content">
                <p className="move-kicker">
                  About This Video
                </p>

                <h3>
                  Preaching the
                  Gospel
                  <span>
                    Across the Nation
                  </span>
                </h3>

                <div className="move-video__copy">
                  <p>
                    In Scribes Global,
                    we believe our core
                    mandate is to
                    evangelise the
                    gospel which
                    affirms the great
                    commission in{" "}
                    <strong>
                      Matthew 28:19–20
                    </strong>
                    :
                  </p>

                  <blockquote>
                    “Go ye therefore
                    into the world and
                    make disciples of
                    many nations,
                    baptizing them in
                    the name of the
                    Father, Son and the
                    Holy Spirit.”

                    <cite>
                      — Matthew
                      28:19–20
                    </cite>
                  </blockquote>

                  <p>
                    The desire of God
                    is that all men are
                    saved. In{" "}
                    <strong>
                      John 3:16
                    </strong>
                    , we understand
                    that God loved us
                    and gave His only
                    begotten Son so
                    that we will be
                    saved.
                  </p>

                  <p>
                    We can do this with
                    your support.{" "}
                    <strong>
                      Partner with us
                      for this project
                    </strong>{" "}
                    as we embark on this
                    outreach to preach
                    the gospel across
                    the country.
                  </p>
                </div>

                <div className="move-video__tags">
                  <span>
                    Matthew 28:19–20
                  </span>

                  <span>
                    John 3:16
                  </span>

                  <span>
                    The Great Commission
                  </span>
                </div>

                <a
                  href={
                    DONATION_URL
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="move-button move-button--gold"
                  data-cursor="VIEW"
                >
                  <span>
                    Partner With Us
                  </span>

                  <span>
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          WHY IT MATTERS
      =================================================== */}

      <section className="move-why move-scene">
        <SectionTransition label="WHY MOVE MATTERS" />

        <div className="move-scene__inner">
          <div className="move-container move-why__layout">
            <div className="move-why__visual">
              <div className="move-why__image">
                <img
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=85"
                  alt="Sound equipment ministry"
                  loading="lazy"
                />

                <div className="move-why__image-overlay" />
              </div>

              <div className="move-why__chip move-why__chip--top">
                <span>
                  ●
                </span>

                <div>
                  <strong>
                    Monthly Giving
                  </strong>

                  <small>
                    Every seed counts
                  </small>
                </div>
              </div>

              <div className="move-why__chip move-why__chip--bottom">
                <span>
                  ✦
                </span>

                <div>
                  <strong>
                    Gospel-Focused
                  </strong>

                  <small>
                    Meetings & Outreach
                  </small>
                </div>
              </div>

              <div
                className="move-why__wave"
                aria-hidden="true"
              >
                {Array.from({
                  length:
                    28,
                }).map(
                  (
                    _,
                    index,
                  ) => (
                    <span
                      key={
                        index
                      }
                    />
                  ),
                )}
              </div>
            </div>

            <div className="move-why__content">
              <p className="move-kicker">
                The Vision Behind MOVE
              </p>

              <h2>
                Why Equipment
                <span>
                  Matters for Ministry
                </span>
              </h2>

              <div className="move-why__copy">
                <p>
                  God has called
                  Scribes Global to
                  preach the gospel
                  through creative arts
                  — poetry, music, and
                  spoken word. But
                  every great voice
                  needs the right tools
                  to carry its message
                  far.
                </p>

                <p>
                  Project MOVE was born
                  from a simple,
                  practical need:{" "}
                  <strong>
                    our meetings and
                    outreach activities
                    require proper sound
                    equipment
                  </strong>
                  . When a microphone
                  fails or a PA system
                  isn't available, the
                  voice goes unheard.
                  We are trusting God
                  to change that.
                </p>

                <p>
                  With the right
                  equipment, every
                  campus outreach,
                  fellowship meeting,
                  and conference can be
                  conducted with{" "}
                  <strong>
                    excellence
                  </strong>{" "}
                  — because the message
                  of Jesus deserves to
                  be heard clearly.
                </p>
              </div>

              <blockquote className="move-why__quote">
                “The voice of one
                crying in the
                wilderness: Prepare the
                way of the Lord.”

                <cite>
                  — Isaiah 40:3
                </cite>
              </blockquote>

              <div className="move-progress">
                <div className="move-progress__top">
                  <strong>
                    Project MOVE Fund
                  </strong>

                  <span>
                    Ongoing
                  </span>
                </div>

                <div className="move-progress__track">
                  <span />
                </div>

                <p>
                  Monthly contributions
                  building toward our
                  equipment goal. Every
                  gift — any size —
                  moves us forward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          HOW TO GIVE
      =================================================== */}

      <section className="move-give move-scene">
        <SectionTransition label="JOIN THE MONTHLY GIVERS" />

        <div className="move-scene__inner">
          <div className="move-container">
            <div className="move-heading move-heading--give">
              <div>
                <span>
                  04
                </span>

                <p>
                  Join the Monthly
                  Givers
                </p>
              </div>

              <h2>
                HOW
                <span>
                  TO GIVE.
                </span>
              </h2>
            </div>

            <div className="move-give__steps">
              {GIVE_STEPS.map(
                (
                  step,
                  index,
                ) => (
                  <article
                    key={
                      step.number
                    }
                    className="move-give-step"
                  >
                    <div className="move-give-step__number">
                      {
                        step.number
                      }
                    </div>

                    <span className="move-give-step__icon">
                      {
                        step.icon
                      }
                    </span>

                    <p>
                      Step{" "}
                      {String(
                        index +
                          1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </p>

                    <h3>
                      {
                        step.title
                      }
                    </h3>

                    <div className="move-give-step__line">
                      <span />
                    </div>

                    <p className="move-give-step__description">
                      {
                        step.description
                      }
                    </p>
                  </article>
                ),
              )}
            </div>

            <div className="move-give__action">
              <a
                href={
                  DONATION_URL
                }
                target="_blank"
                rel="noopener noreferrer"
                className="move-button move-button--gold move-button--large"
                data-cursor="VIEW"
              >
                <span>
                  Give to Project MOVE
                </span>

                <span>
                  ↗
                </span>
              </a>

              <p>
                Secure giving via
                Chango
                <span>
                  #ProjectMove
                </span>
                <span>
                  #ScribesGlobal
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          FINAL
      =================================================== */}

      <section className="move-final move-scene">
        <div className="move-scene__inner">
          <div
            className="move-final__M"
            aria-hidden="true"
          >
            M
          </div>

          <div
            className="move-final__transmission"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="move-container move-final__content">
            <p>
              Be Part of the Move
            </p>

            <h2>
              EVERY SEED
              <span>
                AMPLIFIES
                <br />
                HIS VOICE.
              </span>
            </h2>

            <p className="move-final__description">
              You may not be on stage,
              but your giving puts the
              microphone there. Partner
              with Scribes Global
              monthly and help us carry
              the gospel — louder,
              further, clearer.
            </p>

            <div className="move-final__actions">
              <a
                href={
                  DONATION_URL
                }
                target="_blank"
                rel="noopener noreferrer"
                className="move-button move-button--gold"
                data-cursor="VIEW"
              >
                <span>
                  Give to Project MOVE
                </span>

                <span>
                  ↗
                </span>
              </a>

              <Link
                to="/volunteer"
                className="move-button move-button--outline"
                data-cursor="EXPLORE"
              >
                <span>
                  Join the Family
                </span>

                <span>
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          VIDEO MODAL
      =================================================== */}

      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="move-video-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Project MOVE video"
            initial={{
              opacity:
                0,
            }}
            animate={{
              opacity:
                1,
            }}
            exit={{
              opacity:
                0,
            }}
            onClick={() =>
              setVideoOpen(
                false,
              )
            }
          >
            <button
              type="button"
              className="move-video-modal__close"
              onClick={() =>
                setVideoOpen(
                  false,
                )
              }
              aria-label="Close video"
            >
              ×
            </button>

            <motion.div
              className="move-video-modal__frame"
              initial={{
                scale:
                  0.92,

                y:
                  35,
              }}
              animate={{
                scale:
                  1,

                y:
                  0,
              }}
              exit={{
                scale:
                  0.94,

                y:
                  20,
              }}
              onClick={(
                event,
              ) =>
                event.stopPropagation()
              }
            >
              <iframe
                src={
                  VIDEO_URL
                }
                title="Project MOVE — Scribes Global"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}