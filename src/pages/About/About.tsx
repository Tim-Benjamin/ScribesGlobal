import {
  useLayoutEffect,
  useRef,
} from "react";

import { Link } from "react-router-dom";
import { motion } from "motion/react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./about.css";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   DATA
========================================================= */

const SCRIBES_LETTERS = [
  {
    letter: "S",
    word: "Speaking",
  },
  {
    letter: "C",
    word: "Christ’s",
  },
  {
    letter: "R",
    word: "Redemption",
  },
  {
    letter: "I",
    word: "In",
  },
  {
    letter: "B",
    word: "Biblically",
  },
  {
    letter: "E",
    word: "Edified",
  },
  {
    letter: "S",
    word: "Speech",
  },
];

const IDENTITY_WORDS = [
  {
    number: "01",
    title: "Restorers of Truth",
    description:
      "We use our gifts as messengers of the Gospel, pointing people back to the truth found in Christ.",
  },
  {
    number: "02",
    title: "Unashamed to Speak",
    description:
      "Our creativity is not separated from our message. We boldly communicate Christ through the gifts entrusted to us.",
  },
  {
    number: "03",
    title: "Grace Unto Us",
    description:
      "Everything we create and every platform we receive is understood as grace given for the purpose of making Christ known.",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function About() {
  const pageRef =
    useRef<HTMLElement>(null);

  const heroRef =
    useRef<HTMLElement>(null);

  const heroTitleRef =
    useRef<HTMLHeadingElement>(null);

  const heroOrbRef =
    useRef<HTMLDivElement>(null);

  const scriptureRef =
    useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const media = gsap.matchMedia();

    const context = gsap.context(() => {
      media.add(
        "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
        () => {
          if (heroTitleRef.current) {
            gsap.to(
              heroTitleRef.current,
              {
                yPercent: -12,
                opacity: 0.28,

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

          if (heroOrbRef.current) {
            gsap.to(
              heroOrbRef.current,
              {
                yPercent: 25,
                rotate: 22,
                scale: 1.12,

                ease: "none",

                scrollTrigger: {
                  trigger:
                    heroRef.current,
                  start: "top top",
                  end: "bottom top",
                  scrub: 1.3,
                },
              },
            );
          }

          if (scriptureRef.current) {
            gsap.fromTo(
              scriptureRef.current,
              {
                backgroundPosition:
                  "50% 0%",
              },
              {
                backgroundPosition:
                  "50% 100%",

                ease: "none",

                scrollTrigger: {
                  trigger:
                    scriptureRef.current,
                  start:
                    "top bottom",
                  end:
                    "bottom top",
                  scrub: true,
                },
              },
            );
          }
        },
      );
    }, page);

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <main
      ref={pageRef}
      className="about-page"
    >
      {/* ===================================================
          HERO
      =================================================== */}

      <section
        ref={heroRef}
        className="about-hero"
      >
        <div
          ref={heroOrbRef}
          className="about-hero__orb"
          aria-hidden="true"
        />

        <div
          className="about-hero__grid"
          aria-hidden="true"
        />

        <div className="about-hero__top">
          <motion.span
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.75,
              delay: 0.15,
            }}
          >
            About Scribes Global
          </motion.span>

          <motion.span
            className="about-hero__year"
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.75,
              delay: 0.25,
            }}
          >
            Est. 2017
          </motion.span>
        </div>

        <div className="about-hero__inner">
          <p className="about-hero__eyebrow">
            FAITH ✦ CREATIVITY ✦ REDEMPTION
          </p>

          <h1
            ref={heroTitleRef}
            className="about-hero__title"
          >
            <span>
              WE ARE
            </span>

            <span className="about-hero__title-accent">
              SCRIBES.
            </span>
          </h1>

          <motion.div
            className="about-hero__intro"
            initial={{
              opacity: 0,
              y: 35,
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
            <span className="about-hero__intro-number">
              01
            </span>

            <p>
              A creative evangelistic
              ministry committed to
              communicating the message
              of Jesus Christ through
              artistic expression.
            </p>
          </motion.div>
        </div>

        <div
          className="about-hero__scroll"
          aria-hidden="true"
        >
          <span>
            Discover our story
          </span>

          <span className="about-hero__scroll-line">
            <span />
          </span>
        </div>
      </section>

      {/* ===================================================
          ORIGIN
      =================================================== */}

      <section className="about-origin">
        <div className="about-container">
          <motion.div
            className="about-origin__label"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <span>02</span>
            <span>Our beginning</span>
          </motion.div>

          <div className="about-origin__layout">
            <motion.h2
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-10%",
              }}
              transition={{
                duration: 0.85,
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
            >
              It began with
              <span>
                a direction.
              </span>
            </motion.h2>

            <motion.div
              className="about-origin__copy"
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.15,
              }}
            >
              <p>
                Scribes Global was
                established on May 22,
                2017, beginning as a
                small community with a
                conviction that creative
                gifts could become
                instruments for sharing
                the Gospel.
              </p>

              <p>
                What began with only a
                handful of people grew
                into a wider community
                of creatives using
                poetry, music, spoken
                word and other forms of
                expression to make
                Christ known.
              </p>

              <Link
                to="/ministries"
                className="about-inline-link"
                data-cursor="VIEW"
              >
                Explore our ministries

                <span
                  aria-hidden="true"
                >
                  ↗
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================================================
          ACRONYM
      =================================================== */}

      <section className="about-acronym">
        <div className="about-container">
          <div className="about-acronym__heading">
            <div>
              <span className="about-section-number">
                03
              </span>

              <p className="about-section-eyebrow">
                The name
              </p>
            </div>

            <h2>
              Every letter carries
              <span>
                the message.
              </span>
            </h2>
          </div>

          <div className="about-acronym__list">
            {SCRIBES_LETTERS.map(
              (
                item,
                index,
              ) => (
                <motion.div
                  key={`${item.letter}-${index}`}
                  className="about-acronym__item"
                  initial={{
                    opacity: 0,
                    x: -25,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    margin:
                      "-5% 0px",
                  }}
                  transition={{
                    duration: 0.6,
                    delay:
                      index * 0.045,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                >
                  <span className="about-acronym__index">
                    {String(
                      index + 1,
                    ).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <span className="about-acronym__letter">
                    {item.letter}
                  </span>

                  <span className="about-acronym__word">
                    {item.word}
                  </span>
                </motion.div>
              ),
            )}
          </div>

          <motion.p
            className="about-acronym__full"
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
          >
            Speaking Christ’s
            Redemption In
            Biblically-Edified Speech.
          </motion.p>
        </div>
      </section>

      {/* ===================================================
          BIBLICAL PERSPECTIVE
      =================================================== */}

      <section
        ref={scriptureRef}
        className="about-scripture"
      >
        <div className="about-scripture__glow" />

        <div className="about-container">
          <div className="about-scripture__top">
            <span>
              04
            </span>

            <span>
              Biblical perspective
            </span>

            <span>
              2 Kings 22–23
            </span>
          </div>

          <motion.div
            className="about-scripture__statement"
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
              duration: 1,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
          >
            <p>
              Like a scribe entrusted
              with a message, we believe
              our creative gifts carry
              responsibility.
            </p>

            <h2>
              MESSENGERS OF
              <span>
                REDEMPTION.
              </span>
            </h2>
          </motion.div>

          <div className="about-scripture__story">
            <div className="about-scripture__aside">
              <span>
                Shaphan
              </span>

              <small>
                The Scribe
              </small>
            </div>

            <div className="about-scripture__copy">
              <p>
                The biblical account of
                King Josiah and Shaphan
                provides an important
                picture for the ministry:
                a scribe receives the
                written message and
                faithfully carries it to
                others.
              </p>

              <p>
                Scribes Global draws from
                that picture in seeing
                creatives as messengers—
                entrusted with gifts that
                can communicate truth,
                point people to Christ,
                and carry the message of
                redemption into the
                world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          IDENTITY
      =================================================== */}

      <section className="about-identity">
        <div className="about-container">
          <div className="about-identity__header">
            <div>
              <span className="about-section-number">
                05
              </span>

              <p className="about-section-eyebrow">
                Who we are
              </p>
            </div>

            <h2>
              Our identity is
              <span>
                our message.
              </span>
            </h2>
          </div>

          <div className="about-identity__grid">
            {IDENTITY_WORDS.map(
              (
                item,
                index,
              ) => (
                <motion.article
                  key={item.title}
                  className="about-identity__card"
                  initial={{
                    opacity: 0,
                    y: 45,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.7,
                    delay:
                      index * 0.08,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                >
                  <span>
                    {item.number}
                  </span>

                  <div>
                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {
                        item.description
                      }
                    </p>
                  </div>
                </motion.article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ===================================================
          MISSION / VISION
      =================================================== */}

      <section className="about-direction">
        <div className="about-direction__panel about-direction__panel--mission">
          <span className="about-direction__number">
            06
          </span>

          <p className="about-direction__eyebrow">
            Mission
          </p>

          <h2>
            Carry the message
            <span>
              of redemption.
            </span>
          </h2>

          <p className="about-direction__copy">
            We exist to communicate
            Christ through creative arts,
            calling people toward
            salvation, truth and a life
            prepared for Him.
          </p>

          <div
            className="about-direction__circle"
            aria-hidden="true"
          />
        </div>

        <div className="about-direction__panel about-direction__panel--vision">
          <span className="about-direction__number">
            07
          </span>

          <p className="about-direction__eyebrow">
            Vision
          </p>

          <h2>
            Raise voices that
            <span>
              carry Christ.
            </span>
          </h2>

          <p className="about-direction__copy">
            Through discipleship,
            training and creative
            expression, we seek to raise
            believers who influence the
            world while reflecting the
            fullness of the Christ-life.
          </p>

          <div
            className="about-direction__circle"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* ===================================================
          CTA
      =================================================== */}

      <section className="about-cta">
        <div className="about-container">
          <motion.div
            className="about-cta__inner"
            initial={{
              opacity: 0,
              y: 40,
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
              duration: 0.85,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
          >
            <p>
              THE STORY CONTINUES
            </p>

            <h2>
              There is room
              <span>
                in the story for you.
              </span>
            </h2>

            <div className="about-cta__actions">
              <Link
                to="/chapters"
                className="about-cta__primary"
                data-cursor="EXPLORE"
              >
                <span>
                  Find a chapter
                </span>

                <span
                  aria-hidden="true"
                  className="about-cta__arrow"
                >
                  ↗
                </span>
              </Link>

              <Link
                to="/volunteer"
                className="about-cta__secondary"
                data-cursor="VIEW"
              >
                Volunteer with us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}