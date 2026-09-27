import {
  Link,
} from "react-router-dom";

import {
  motion,
} from "motion/react";

import type {
  EventItem,
} from "../../lib/supabase/queries/events";

import {
  formatEventDate,
  formatEventTime,
  getEventDisplayStatus,
} from "../../lib/supabase/queries/events";

import {
  storageUrl,
} from "../../lib/supabase/storage";

type FeaturedEventProps = {
  event:
    EventItem;
};

export default function FeaturedEvent({
  event,
}: FeaturedEventProps) {
  const hero =
    storageUrl(
      "event-media",
      event.hero_image,
    );

  const status =
    getEventDisplayStatus(
      event,
    );

  return (
    <section className="featured-event">
      <div className="events-container">
        <div className="events-section-heading">
          <div>
            <span>
              01
            </span>

            <p>
              Featured Event
            </p>
          </div>

          <h2>
            NEXT
            <span>
              EXPERIENCE.
            </span>
          </h2>
        </div>

        <motion.article
          className="featured-event__card"
          initial={{
            opacity: 0,
            y: 35,
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
            duration: 0.7,
          }}
        >
          <Link
            to={`/events/${event.slug}`}
            className="featured-event__link"
            data-cursor="VIEW"
          >
            <div className="featured-event__media">
              {hero ? (
                <img
                  src={hero}
                  alt=""
                  loading="lazy"
                />
              ) : (
                <div className="featured-event__fallback">
                  <span>
                    {event.title
                      .charAt(
                        0,
                      )}
                  </span>
                </div>
              )}

              <div className="featured-event__overlay" />

              <div className="featured-event__media-top">
                <span>
                  Featured
                </span>

                <span
                  className={`event-status event-status--${status}`}
                >
                  {status}
                </span>
              </div>

              <div className="featured-event__media-bottom">
                <span>
                  {
                    event.event_type
                  }
                </span>

                <span>
                  View event ↗
                </span>
              </div>
            </div>

            <div className="featured-event__content">
              <div className="featured-event__date">
                <span>
                  Date
                </span>

                <strong>
                  {formatEventDate(
                    event.start_date,
                  )}
                </strong>
              </div>

              <h3>
                {
                  event.title
                }
              </h3>

              {event.description && (
                <p className="featured-event__description">
                  {
                    event.description
                  }
                </p>
              )}

              <div className="featured-event__details">
                <div>
                  <span>
                    Time
                  </span>

                  <strong>
                    {formatEventTime(
                      event.start_date,
                    )}
                  </strong>
                </div>

                {event.location && (
                  <div>
                    <span>
                      Location
                    </span>

                    <strong>
                      {
                        event.location
                      }
                    </strong>
                  </div>
                )}

                <div>
                  <span>
                    Experience
                  </span>

                  <strong>
                    {
                      event.event_type
                    }
                  </strong>
                </div>
              </div>
            </div>
          </Link>
        </motion.article>
      </div>
    </section>
  );
}