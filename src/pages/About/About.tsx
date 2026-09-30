import {
  motion,
} from "motion/react";

import {
  Link,
} from "react-router-dom";

import "./about.css";

/* =========================================================
   SOURCE CONTENT

   These values intentionally preserve the wording and
   structure from the legacy Scribes Global About page.
========================================================= */

const HERO_IMAGE =
  "https://static.wixstatic.com/media/521bf8_7d622c1e53064c06ab56a08a6e19e1fa~mv2.jpg/v1/fill/w_940,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/_MG_3829.jpg";

const BIBLICAL_IMAGE =
  "https://static.wixstatic.com/media/521bf8_ca1f56b295d54b0aa5b5e4f0665b674d~mv2.jpg/v1/fill/w_966,h_644,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/521bf8_ca1f56b295d54b0aa5b5e4f0665b674d~mv2.jpg";

const MISSION_IMAGE =
  "https://static.wixstatic.com/media/521bf8_513d5db66b9740378bcbdb1b6fb0789c~mv2.jpg/v1/fill/w_1145,h_644,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/521bf8_513d5db66b9740378bcbdb1b6fb0789c~mv2.jpg";

const VISION_IMAGE =
  "https://static.wixstatic.com/media/521bf8_5b5283b848854b6087436506c9b352bf~mv2.jpg/v1/fill/w_1145,h_644,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/521bf8_5b5283b848854b6087436506c9b352bf~mv2.jpg";

const CHAPTERS_BACKGROUND =
  "https://static.wixstatic.com/media/98ecda_cce9f04b679046bb80afa0f2b60dac4e~mv2.jpg/v1/fill/w_1505,h_443,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/98ecda_cce9f04b679046bb80afa0f2b60dac4e~mv2.jpg";

/* =========================================================
   MINISTRIES
========================================================= */

const MINISTRIES = [
  {
    title:
      "Scribes Poetry",

    image:
      "https://static.wixstatic.com/media/521bf8_dda9d495fdf54dffaeb6b90d070166e7~mv2.jpg/v1/fill/w_966,h_644,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/521bf8_dda9d495fdf54dffaeb6b90d070166e7~mv2.jpg",

    description:
      "Established as the initial step in fulfilling our mission, spreading the gospel through poetry, spoken word and short stories. The first official meeting was held on May 22nd, 2017.",

    symbol:
      "POETRY",

    tone:
      "purple",
  },

  {
    title:
      "Scribes Worship",

    /*
     * Legacy:
     * ASSETS_PATH . 'images/scribes-worship.jpg'
     *
     * For Vite, this assumes the image lives in:
     * public/images/scribes-worship.jpg
     */
    image:
      "/images/scribes-worship.jpg",

    description:
      "Overwhelmed by the gift of salvation found in Jesus, we have a heart for authentic worship — making room for believers to intimately fellowship with God through music and song.",

    symbol:
      "WORSHIP",

    tone:
      "gold",
  },

  {
    title:
      "Scribes Khoros",

    /*
     * Legacy:
     * ASSETS_PATH . 'images/scribes-khoros.jpg'
     */
    image:
      "/images/scribes-khoros.jpg",

    description:
      "Movement as a form of worship and expression interpreting Scripture. We seek to raise up a generation of worshippers who will dance before the Lord with all their hearts, souls and minds.",

    symbol:
      "KHOROS",

    tone:
      "blue",
  },
] as const;

/* =========================================================
   CHAPTERS
========================================================= */

const CHAPTERS = [
  {
    name:
      "Scribes KNUST",

    school:
      "Kwame Nkrumah Univ. of Science & Technology",

    logo:
      "/images/logo/scribesKNUST.jpg",

    tone:
      "purple",
  },

  {
    name:
      "Scribes UCC",

    school:
      "University of Cape Coast",

    logo:
      "/images/logo/scribesUCC.jpg",

    tone:
      "blue",
  },

  {
    name:
      "Scribes UHAS",

    school:
      "University of Health and Social Sciences",

    logo:
      "/images/logo/scribesUHAS.jpg",

    tone:
      "coral",
  },

  {
    name:
      "Scribes LEGON",

    school:
      "University of Ghana, UPSA, GIMPA & Wisconsin",

    logo:
      "/images/logo/scribesLEGON.jpg",

    tone:
      "gold",
  },
] as const;

/* =========================================================
   COMPONENT
========================================================= */

export default function About() {
  return (
    <>

      <main className="about-page">
        {/* =================================================
            HERO
        ================================================= */}

        <section className="about-hero">
          <img
            src={HERO_IMAGE}
            alt=""
            className="about-hero__background"
          />

          <div className="about-hero__overlay" />

          <div className="about-hero__grid" />

          <div className="about-hero__orb about-hero__orb--one" />

          <div className="about-hero__orb about-hero__orb--two" />

          <div className="about-container about-hero__inner">
            <motion.div
              className="about-hero__established"
              initial={{
                opacity: 0,
                y: -14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              <span className="about-hero__established-line" />

              <span>
                Established 22nd May, 2017
              </span>
            </motion.div>

            <motion.div
              className="about-hero__title"
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
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
              <span>
                About
              </span>

              <h1>
                SCRIBES
                <strong>
                  GLOBAL.
                </strong>
              </h1>
            </motion.div>

            <motion.div
              className="about-hero__acronym"
              initial={{
                opacity: 0,
                y: 22,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.7,
              }}
            >
              <p>
                <strong>
                  S
                </strong>
                peaking{" "}

                <strong>
                  C
                </strong>
                hrist's{" "}

                <strong>
                  R
                </strong>
                edemption{" "}

                <strong>
                  I
                </strong>
                n{" "}

                <strong>
                  B
                </strong>
                iblically-
                <strong>
                  E
                </strong>
                dified{" "}

                <strong>
                  S
                </strong>
                peech
              </p>
            </motion.div>

            <div className="about-hero__identity">
              <span>
                Restorers of Truth
              </span>

              <span>
                Unashamed to Speak
              </span>

              <span>
                Grace unto us
              </span>
            </div>

            <p className="about-hero__description">
              A non-profit,
              non-denominational
              evangelistic ministry
              preaching the gospel
              through creative arts —
              poetry, music, and spoken
              word.
            </p>

            <Link
              to="/volunteer"
              className="about-hero__cta"
            >
              <span>
                Join / Volunteer
              </span>

              <span>
                ↗
              </span>
            </Link>

            <div className="about-hero__footer">
              <span>
                Restorers of Truth
              </span>

              <span>
                Scroll ↓
              </span>
            </div>
          </div>
        </section>

        {/* =================================================
            WHO WE ARE
        ================================================= */}

        <section className="about-who">
          <div className="about-container about-who__layout">
            <motion.div
              className="about-who__visual"
              initial={{
                opacity: 0,
                x: -35,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                margin:
                  "-10%",
              }}
              transition={{
                duration: 0.7,
              }}
            >
              <img
                src={HERO_IMAGE}
                alt="Scribes Global community"
              />

              <div className="about-who__visual-overlay" />

              <div className="about-who__members">
                <strong>
                  100+
                </strong>

                <span>
                  Members Worldwide
                </span>
              </div>

              <div className="about-who__founded">
                <strong>
                  2017
                </strong>

                <span>
                  Founded
                </span>
              </div>
            </motion.div>

            <motion.div
              className="about-who__content"
              initial={{
                opacity: 0,
                x: 35,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                margin:
                  "-10%",
              }}
              transition={{
                duration: 0.7,
              }}
            >
              <span className="about-eyebrow">
                Who We Are
              </span>

              <h2>
                A COMMUNITY
                <strong>
                  OF CREATIVES
                </strong>
              </h2>

              <div className="about-who__copy">
                <p>
                  Scribes Global is a{" "}
                  <strong>
                    non-profit,
                    non-denominational
                    organization
                  </strong>{" "}
                  set up as an
                  evangelistic ministry
                  to preach the gospel
                  through creative arts
                  — poetry, music, and
                  spoken word.
                </p>

                <p>
                  Established on{" "}
                  <strong>
                    22nd May, 2017
                  </strong>
                  , we have grown from a
                  group of{" "}
                  <strong>
                    8 members
                  </strong>{" "}
                  to over{" "}
                  <strong>
                    100 members
                  </strong>{" "}
                  in different parts of
                  the world, organising
                  events, workshops,
                  conferences and
                  outreach programs.
                </p>

                <p>
                  Scribes Global now has
                  chapters in{" "}
                  <strong>
                    KNUST, University of
                    Cape Coast and
                    University of Ghana
                  </strong>{" "}
                  with a global audience
                  to its events and
                  fellowship meetings.
                </p>

                <p>
                  As a community of
                  creatives, our
                  ministries are
                  commissioned to preach
                  Jesus Christ and
                  inspire hope for
                  purity and holiness.
                  They include{" "}
                  <strong>
                    Scribes Poetry,
                    Scribes Worship and
                    Scribes Kids
                  </strong>
                  .
                </p>
              </div>

              <div className="about-who__stats">
                <div>
                  <strong>
                    3
                  </strong>

                  <span>
                    Ministries
                  </span>
                </div>

                <div>
                  <strong>
                    4
                  </strong>

                  <span>
                    Campuses
                  </span>
                </div>

                <div>
                  <strong>
                    7+
                  </strong>

                  <span>
                    Years Active
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =================================================
            PARTNERS & COMMUNITY

            The legacy source contains this section but no
            actual logos. We preserve the section instead
            of inventing partner brands.
        ================================================= */}

        <section className="about-partners">
          <div className="about-container about-partners__inner">
            <span>
              Partners & Community
            </span>

            <div className="about-partners__line" />

            <p>
              Community, collaboration
              and partnership have
              remained part of the
              Scribes Global journey.
            </p>
          </div>
        </section>

        {/* =================================================
            BIBLICAL PERSPECTIVE
        ================================================= */}

        <section className="about-biblical">
          <div className="about-biblical__quote-mark">
            “
          </div>

          <div className="about-container about-biblical__layout">
            <motion.div
              className="about-biblical__content"
              initial={{
                opacity: 0,
                x: -35,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
            >
              <span className="about-eyebrow about-eyebrow--blue">
                2 Kings 22–23
              </span>

              <h2>
                BIBLICAL
                <strong>
                  PERSPECTIVE.
                </strong>
              </h2>

              <div className="about-biblical__copy">
                <p>
                  Josiah, King of
                  Jerusalem, sent{" "}
                  <strong>
                    Shaphan, a Scribe
                  </strong>
                  , to the high priest
                  — who gave him the
                  Book of the Law.
                  Shaphan read it, saw
                  God's impending
                  wrath, and
                  immediately brought
                  the message to the
                  king. It led to the{" "}
                  <em>
                    deliverance of
                    Jerusalem
                  </em>
                  .
                </p>

                <p>
                  We believe like
                  Shaphan, we have been
                  called as Scribes —{" "}
                  <strong>
                    messengers
                  </strong>{" "}
                  — to bring the
                  message of{" "}
                  <em>
                    REDEMPTION
                  </em>{" "}
                  through our gifts and
                  talents in poetry,
                  music and spoken word
                  to the world.
                </p>
              </div>

              <blockquote>
                <p>
                  "And you shall know
                  the truth, and the
                  truth shall make you
                  free."
                </p>

                <cite>
                  — John 8:32
                </cite>
              </blockquote>
            </motion.div>

            <motion.div
              className="about-biblical__visual"
              initial={{
                opacity: 0,
                x: 35,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
            >
              <img
                src={BIBLICAL_IMAGE}
                alt="Biblical Perspective"
              />

              <div className="about-biblical__image-overlay" />

              <div className="about-biblical__identities">
                <span>
                  Restorers of TRUTH
                </span>

                <span>
                  Unashamed to Speak
                </span>

                <span>
                  Grace unto us
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =================================================
            MISSION & VISION
        ================================================= */}

        <section className="about-direction">
          <div className="about-container">
            <div className="about-direction__heading">
              <span>
                What Drives Us
              </span>

              <h2>
                MISSION &
                <strong>
                  VISION.
                </strong>
              </h2>
            </div>

            <div className="about-direction__grid">
              {/* MISSION */}

              <article className="about-direction-card">
                <div className="about-direction-card__media about-direction-card__media--mission">
                  <img
                    src={MISSION_IMAGE}
                    alt="Mission"
                  />

                  <div className="about-direction-card__media-overlay" />

                  <div className="about-direction-card__label">
                    <span>
                      01
                    </span>

                    <h3>
                      Mission
                    </h3>

                    <p>
                      Matthew 28:19–20
                      · 1 Timothy 2:4
                    </p>
                  </div>
                </div>

                <div className="about-direction-card__body">
                  <p className="about-direction-card__lead">
                    To propagate the
                    message of{" "}
                    <strong>
                      REDEMPTION
                    </strong>{" "}
                    for all to be saved
                    and be prepared for
                    the coming of our
                    Lord and Savior
                    Jesus Christ through
                    the creative arts —
                    poetry, music,
                    spoken word.
                  </p>

                  <div className="about-direction-card__points">
                    <div>
                      <span>
                        LIGHT
                      </span>

                      <p>
                        In this
                        increasingly
                        dark world, we
                        exist to restore
                        light (truth)
                        through the
                        preaching of the
                        Gospel, that men
                        will be redeemed
                        from sin, self
                        and the systems
                        of the world.
                      </p>
                    </div>

                    <div>
                      <span>
                        MESSAGE
                      </span>

                      <p>
                        "Our Lord and
                        Saviour Jesus
                        Christ is coming
                        again! The
                        church must
                        prepare, souls
                        must be saved!"{" "}
                        <strong>
                          THIS IS OUR
                          MESSAGE!
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              {/* VISION */}

              <article className="about-direction-card">
                <div className="about-direction-card__media about-direction-card__media--vision">
                  <img
                    src={VISION_IMAGE}
                    alt="Vision"
                  />

                  <div className="about-direction-card__media-overlay" />

                  <div className="about-direction-card__label">
                    <span>
                      02
                    </span>

                    <h3>
                      Vision
                    </h3>

                    <p>
                      Isaiah 40:3 ·
                      Galatians 4:19
                    </p>
                  </div>
                </div>

                <div className="about-direction-card__body">
                  <p className="about-direction-card__lead">
                    To become a{" "}
                    <strong>
                      voice (Isaiah
                      40:3)
                    </strong>
                    , effectively
                    evangelizing the
                    gospel through
                    discipleship —
                    raising believers
                    to become ministers
                    of redemption,
                    taking the world
                    with the
                    Christ-message
                    through creative
                    arts.
                  </p>

                  <p className="about-direction-card__vision-copy">
                    Through training
                    and instruction, we
                    aim to raise all
                    believers to live
                    the fullness of the
                    Christ-life
                    (Galatians 4:19) —
                    becoming an{" "}
                    <strong>
                      agency of
                      redemption and
                      restoration
                    </strong>
                    , projecting Christ
                    to all men,
                    touching lives and
                    empowering people
                    to lead and impact
                    in every sphere of
                    life.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* =================================================
            MINISTRIES
        ================================================= */}

        <section className="about-ministries">
          <div className="about-container">
            <div className="about-section-heading about-section-heading--center">
              <span>
                Our Creative Arms
              </span>

              <h2>
                OUR
                <strong>
                  MINISTRIES.
                </strong>
              </h2>

              <p>
                As a community of
                creatives, our
                ministries are
                commissioned to preach
                Jesus Christ — the
                salvation of mankind —
                and inspire hope for
                purity and holiness.
              </p>
            </div>

            <div className="about-ministries__grid">
              {MINISTRIES.map(
                (
                  ministry,
                  index,
                ) => (
                  <motion.article
                    key={
                      ministry.title
                    }
                    className={`about-ministry-card about-ministry-card--${ministry.tone}`}
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
                      delay:
                        index *
                        0.08,
                    }}
                  >
                    <div className="about-ministry-card__media">
                      <img
                        src={
                          ministry.image
                        }
                        alt={
                          ministry.title
                        }
                        loading="lazy"
                      />

                      <div className="about-ministry-card__overlay" />

                      <span>
                        {
                          ministry.symbol
                        }
                      </span>
                    </div>

                    <div className="about-ministry-card__body">
                      <span>
                        {String(
                          index +
                            1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <h3>
                        {
                          ministry.title
                        }
                      </h3>

                      <p>
                        {
                          ministry.description
                        }
                      </p>

                      <Link
                        to="/ministries"
                      >
                        Learn more

                        <span>
                          ↗
                        </span>
                      </Link>
                    </div>
                  </motion.article>
                ),
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            CHAPTERS
        ================================================= */}

        <section className="about-chapters">
          <img
            src={CHAPTERS_BACKGROUND}
            alt=""
            className="about-chapters__background"
          />

          <div className="about-chapters__overlay" />

          <div className="about-container about-chapters__inner">
            <div className="about-section-heading about-section-heading--center about-section-heading--dark">
              <span>
                By God's Grace
              </span>

              <h2>
                CAMPUS
                <strong>
                  CHAPTERS.
                </strong>
              </h2>

              <p>
                We have extended our
                ministry to a number
                of universities in
                Ghana. Our campus
                chapters harbour
                several young
                talents, serving as
                a platform to nurture
                their gifts and
                propagate the gospel
                of Christ.
              </p>
            </div>

            <div className="about-chapters__grid">
              {CHAPTERS.map(
                (
                  chapter,
                  index,
                ) => (
                  <motion.article
                    key={
                      chapter.name
                    }
                    className={`about-chapter-card about-chapter-card--${chapter.tone}`}
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay:
                        index *
                        0.07,
                    }}
                  >
                    <div className="about-chapter-card__logo">
                      <img
                        src={
                          chapter.logo
                        }
                        alt={`${chapter.name} logo`}
                        loading="lazy"
                      />
                    </div>

                    <h3>
                      {
                        chapter.name
                      }
                    </h3>

                    <p>
                      {
                        chapter.school
                      }
                    </p>
                  </motion.article>
                ),
              )}
            </div>

            <p className="about-chapters__note">
              We accept members from
              all schools,
              universities or
              campuses.
            </p>

            <Link
              to="/chapters"
              className="about-chapters__cta"
            >
              <span>
                View All Chapters
              </span>

              <span>
                ↗
              </span>
            </Link>
          </div>
        </section>

        {/* =================================================
            FINAL CTA
        ================================================= */}

        <section className="about-final">
          <div className="about-final__grid" />

          <div className="about-final__orb">
            <span />
            <span />
            <span />
          </div>

          <div className="about-container about-final__inner">
            <span>
              Unashamed to Speak
            </span>

            <h2>
              READY TO BE A
              <strong>
                RESTORER OF TRUTH?
              </strong>
            </h2>

            <p>
              Whether you're a poet,
              musician, or simply
              someone who loves the
              Lord — there is a place
              for you in this
              community. Join us as we
              take the Christ-message
              to the world.
            </p>

            <div className="about-final__actions">
              <Link
                to="/volunteer"
                className="about-final__primary"
              >
                <span>
                  Join / Volunteer
                </span>

                <span>
                  ↗
                </span>
              </Link>

              <Link
                to="/invite-us"
                className="about-final__secondary"
              >
                Invite Scribes Global
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}