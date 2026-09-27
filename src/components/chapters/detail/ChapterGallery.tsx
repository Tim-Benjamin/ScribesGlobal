import {
  useMemo,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import type {
  ActiveChapterItem,
} from "../../../lib/supabase/queries/chapters";

import {
  storageUrl,
} from "../../../lib/supabase/storage";

import {
  parseChapterGallery,
} from "../../../lib/chapters/gallery";

type ChapterGalleryProps = {
  chapter:
    ActiveChapterItem;
};

export default function ChapterGallery({
  chapter,
}: ChapterGalleryProps) {
  const [
    activeImage,
    setActiveImage,
  ] =
    useState<string | null>(
      null,
    );

  const images =
    useMemo(
      () =>
        parseChapterGallery(
          chapter.gallery as
            | string
            | string[]
            | null,
        )
          .map(
            (path) =>
              storageUrl(
                "chapter-media",
                path,
              ),
          )
          .filter(
            (
              url,
            ): url is string =>
              Boolean(url),
          ),
      [chapter.gallery],
    );

  if (
    images.length ===
    0
  ) {
    return null;
  }

  return (
    <>
      <section className="chapter-gallery">
        <div className="chapter-detail-container">
          <div className="chapter-detail-heading chapter-detail-heading--dark">
            <div>
              <span>
                03
              </span>

              <p>
                Gallery
              </p>
            </div>

            <h2>
              LIFE IN THE
              <strong>
                CHAPTER.
              </strong>
            </h2>
          </div>

          <div className="chapter-gallery__grid">
            {images.map(
              (
                image,
                index,
              ) => (
                <button
                  key={image}
                  type="button"
                  className={`chapter-gallery__item ${
                    index %
                      5 ===
                    0
                      ? "chapter-gallery__item--large"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveImage(
                      image,
                    )
                  }
                  data-cursor="VIEW"
                >
                  <img
                    src={image}
                    alt={`${chapter.name} gallery ${index + 1}`}
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
        {activeImage && (
          <motion.div
            className="chapter-gallery-lightbox"
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
              setActiveImage(
                null,
              )
            }
          >
            <button
              type="button"
              onClick={() =>
                setActiveImage(
                  null,
                )
              }
              aria-label="Close image"
            >
              ×
            </button>

            <motion.img
              src={activeImage}
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