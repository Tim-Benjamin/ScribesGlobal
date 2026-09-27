import {
  motion,
} from "motion/react";

type EventsHeroProps = {
  upcomingCount:
    number;

  totalCount:
    number;
};

export default function EventsHero({
  upcomingCount,
  totalCount,
}: EventsHeroProps) {
  return (
    <section className="events-hero">
      <div
        className="events-hero__grid"
        aria-hidden="true"
      />

      <div
        className="events-hero__orb events-hero__orb--one"
        aria-hidden="true"
      />

      <div
        className="events-hero__orb events-hero__orb--two"
        aria-hidden="true"
      />

      <div className="events-container events-hero__inner">
        <motion.div
          className="events-hero__top"
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
          <span>
            Scribes Global
          </span>

          <span>
            Gather · Worship · Create
          </span>
        </motion.div>

        <div className="events-hero__layout">
          <motion.div
            className="events-hero__title"
            initial={{
              opacity: 0,
              y: 55,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.95,

              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
          >
            <p>
              Events
            </p>

            <h1>
              GATHER.
              <span>
                EXPERIENCE.
              </span>

              <em>
                ENCOUNTER.
              </em>
            </h1>
          </motion.div>

          <motion.div
            className="events-hero__aside"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.25,
            }}
          >
            <p>
              Spaces where faith,
              creativity, worship
              and community come
              together.
            </p>

            <div className="events-hero__stats">
              <div>
                <strong>
                  {String(
                    upcomingCount,
                  ).padStart(
                    2,
                    "0",
                  )}
                </strong>

                <span>
                  Upcoming
                </span>
              </div>

              <div>
                <strong>
                  {String(
                    totalCount,
                  ).padStart(
                    2,
                    "0",
                  )}
                </strong>

                <span>
                  Events
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="events-hero__bottom">
          <span>
            Explore gatherings
          </span>

          <span>
            ↓
          </span>
        </div>
      </div>
    </section>
  );
}