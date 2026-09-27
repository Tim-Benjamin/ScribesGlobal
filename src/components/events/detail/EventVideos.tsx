import {
  useMemo,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  parseYouTubeList,
} from "../../../lib/supabase/youtube";

import type {
  EventItem,
} from "../../../lib/supabase/queries/events";

type EventVideosProps = {
  event:
    EventItem;
};

export default function EventVideos({
  event,
}: EventVideosProps) {
  const videos =
    useMemo(
      () =>
        parseYouTubeList(
          event.videos,
        ),
      [event.videos],
    );

  const [
    activeEmbed,
    setActiveEmbed,
  ] =
    useState<string | null>(
      null,
    );

  if (
    videos.length ===
    0
  ) {
    return null;
  }

  return (
    <>
      <section className="event-videos">
        <div className="event-detail-container">
          <div className="event-detail-heading">
            <div>
              <span>
                03
              </span>

              <p>
                Watch
              </p>
            </div>

            <h2>
              EXPERIENCE
              <strong>
                IT AGAIN.
              </strong>
            </h2>
          </div>

          <div className="event-videos__grid">
            {videos.map(
              (
                video,
                index,
              ) => (
                <button
                  key={
                    `${video.id}-${index}`
                  }
                  type="button"
                  className="event-video-card"
                  onClick={() =>
                    setActiveEmbed(
                      video.embed,
                    )
                  }
                  data-cursor="PLAY"
                >
                  <img
                    src={
                      video.thumbnail
                    }
                    alt=""
                    loading="lazy"
                  />

                  <div className="event-video-card__overlay" />

                  <span className="event-video-card__play">
                    ▶
                  </span>

                  <span className="event-video-card__number">
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
        {activeEmbed && (
          <motion.div
            className="event-video-modal"
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
              setActiveEmbed(
                null,
              )
            }
          >
            <button
              type="button"
              onClick={() =>
                setActiveEmbed(
                  null,
                )
              }
            >
              ×
            </button>

            <motion.div
              className="event-video-modal__frame"
              initial={{
                scale: 0.94,
                y: 25,
              }}
              animate={{
                scale: 1,
                y: 0,
              }}
              exit={{
                scale: 0.96,
              }}
              onClick={(
                event,
              ) =>
                event.stopPropagation()
              }
            >
              <iframe
                src={
                  activeEmbed
                }
                title="Event video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}