import {
  Link,
} from "react-router-dom";

import {
  motion,
} from "motion/react";

import {
  formatEventDate,
  formatEventTime,
  getEventDisplayStatus,
  type EventItem,
} from "../../../lib/supabase/queries/events";

import {
  storageUrl,
} from "../../../lib/supabase/storage";

type EventDetailHeroProps = {
  event:
    EventItem;
};

export default function EventDetailHero({
  event,
}: EventDetailHeroProps) {
  const image =
    storageUrl(
      "event-media",
      event.hero_image,
    );

  const status =
    getEventDisplayStatus(
      event,
    );

  return (
    <section className="event-detail-hero">
      {image ? (
        <img
          className="event-detail-hero__image"
          src={image}
          alt=""
        />
      ) : (
        <div className="event-detail-hero__fallback">
          <span>
            {event.title
              .charAt(0)}
          </span>
        </div>
      )}

      <div className="event-detail-hero__overlay" />

      <div className="event-detail-hero__grid" />

      <div className="event-detail-container event-detail-hero__inner">
        <motion.div
          className="event-detail-hero__top"
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <Link to="/events">
            ← Events
          </Link>

          <span
            className={`event-detail-status event-detail-status--${status}`}
          >
            {status}
          </span>
        </motion.div>

        <div className="event-detail-hero__content">
          <motion.div
            className="event-detail-hero__meta"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
            }}
          >
            <span>
              {
                event.event_type
              }
            </span>

            <i>·</i>

            <span>
              {formatEventDate(
                event.start_date,
              )}
            </span>

            <i>·</i>

            <span>
              {formatEventTime(
                event.start_date,
              )}
            </span>
          </motion.div>

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
              duration: 0.9,

              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
          >
            {event.title}
          </motion.h1>

          {event.location && (
            <motion.p
              className="event-detail-hero__location"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.4,
              }}
            >
              {event.location}
            </motion.p>
          )}
        </div>

        <div className="event-detail-hero__footer">
          <span>
            Scribes Global
          </span>

          <span>
            Scroll to explore ↓
          </span>
        </div>
      </div>
    </section>
  );
}