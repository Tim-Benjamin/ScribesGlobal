import {
  useMemo,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  parseEventGallery,
} from "../../../lib/events/gallery";

import {
  storageUrl,
} from "../../../lib/supabase/storage";

import type {
  EventItem,
} from "../../../lib/supabase/queries/events";

type EventGalleryProps = {
  event:
    EventItem;
};

export default function EventGallery({
  event,
}: EventGalleryProps) {
  const [
    active,
    setActive,
  ] =
    useState<string | null>(
      null,
    );

  const images =
    useMemo(
      () =>
        parseEventGallery(
          event.gallery,
        )
          .map(
            (path) =>
              storageUrl(
                "event-media",
                path,
              ),
          )
          .filter(
            (
              url,
            ): url is string =>
              Boolean(url),
          ),
      [event.gallery],
    );

  if (
    images.length ===
    0
  ) {
    return null;
  }

  return (
    <>
      <section className="event-gallery">
        <div className="event-detail-container">
          <div className="event-detail-heading event-detail-heading--dark">
            <div>
              <span>
                02
              </span>

              <p>
                Gallery
              </p>
            </div>

            <h2>
              MOMENTS FROM
              <strong>
                THE EXPERIENCE.
              </strong>
            </h2>
          </div>

          <div className="event-gallery__grid">
            {images.map(
              (
                image,
                index,
              ) => (
                <button
                  key={image}
                  type="button"
                  className={`event-gallery__item ${
                    index %
                      5 ===
                    0
                      ? "event-gallery__item--large"
                      : ""
                  }`}
                  onClick={() =>
                    setActive(
                      image,
                    )
                  }
                  data-cursor="VIEW"
                >
                  <img
                    src={image}
                    alt={`${event.title} ${index + 1}`}
                    loading="lazy"
                  />

                  <span>
                    {String(
                      index +
                        1,
                    ).padStart(
                      2,
                      "0",
                    )}
                  </span>
                </button>
              ),
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            className="event-gallery-lightbox"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() =>
              setActive(
                null,
              )
            }
          >
            <button
              type="button"
              onClick={() =>
                setActive(
                  null,
                )
              }
              aria-label="Close image"
            >
              ×
            </button>

            <motion.img
              src={active}
              alt=""
              initial={{
                scale: 0.92,
              }}
              animate={{
                scale: 1,
              }}
              exit={{
                scale: 0.95,
              }}
              onClick={(
                event,
              ) =>
                event.stopPropagation()
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}