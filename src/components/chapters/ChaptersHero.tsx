import {
  motion,
} from "motion/react";

type ChaptersHeroProps = {
  count: number;
};

export default function ChaptersHero({
  count,
}: ChaptersHeroProps) {
  return (
    <section className="chapters-hero">
      <div className="chapters-hero__grid" />

      <div
        className="chapters-hero__orb chapters-hero__orb--one"
        aria-hidden="true"
      />

      <div
        className="chapters-hero__orb chapters-hero__orb--two"
        aria-hidden="true"
      />

      <div className="chapters-container chapters-hero__inner">
        <motion.div
          className="chapters-hero__eyebrow"
          initial={{
            opacity: 0,
            y: 16,
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
            Global Chapters
          </span>
        </motion.div>

        <div className="chapters-hero__main">
          <motion.h1
            initial={{
              opacity: 0,
              y: 50,
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
            ONE
            <span>
              MOVEMENT.
            </span>

            <em>
              MANY
              PLACES.
            </em>
          </motion.h1>

          <motion.div
            className="chapters-hero__copy"
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
              Discover Scribes
              communities creating,
              worshipping and
              carrying the gospel
              through creative
              expression.
            </p>

            <div className="chapters-hero__count">
              <strong>
                {String(
                  count,
                ).padStart(
                  2,
                  "0",
                )}
              </strong>

              <span>
                Active
                <br />
                Chapters
              </span>
            </div>
          </motion.div>
        </div>

        <div className="chapters-hero__footer">
          <span>
            Explore the network
          </span>

          <span>
            ↓
          </span>
        </div>
      </div>
    </section>
  );
}