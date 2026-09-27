import {
  Link,
} from "react-router-dom";

import {
  motion,
} from "motion/react";

import type {
  ActiveChapterItem,
} from "../../../lib/supabase/queries/chapters";

import {
  storageUrl,
} from "../../../lib/supabase/storage";

type ChapterHeroProps = {
  chapter:
    ActiveChapterItem;
};

function getHero(
  chapter:
    ActiveChapterItem,
) {
  return storageUrl(
    "chapter-media",
    chapter.hero_image ??
      chapter.chapter_image ??
      chapter.image,
  );
}

function getLogo(
  chapter:
    ActiveChapterItem,
) {
  return storageUrl(
    "chapter-media",
    chapter.chapter_logo ??
      chapter.logo_image ??
      chapter.logo_path,
  );
}

export default function ChapterHero({
  chapter,
}: ChapterHeroProps) {
  const hero =
    getHero(chapter);

  const logo =
    getLogo(chapter);

  return (
    <section className="chapter-detail-hero">
      {hero ? (
        <img
          className="chapter-detail-hero__image"
          src={hero}
          alt=""
        />
      ) : (
        <div className="chapter-detail-hero__fallback">
          <span>
            {chapter.name
              .charAt(0)}
          </span>
        </div>
      )}

      <div className="chapter-detail-hero__overlay" />

      <div className="chapter-detail-hero__grid" />

      <div className="chapter-detail-container chapter-detail-hero__inner">
        <motion.div
          className="chapter-detail-hero__top"
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <Link to="/chapters">
            ← Chapters
          </Link>

          <span>
            {chapter.is_campus
              ? "Campus Chapter"
              : "Scribes Chapter"}
          </span>
        </motion.div>

        <div className="chapter-detail-hero__content">
          {logo && (
            <motion.div
              className="chapter-detail-hero__logo"
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              <img
                src={logo}
                alt={`${chapter.name} logo`}
              />
            </motion.div>
          )}

          <motion.p
            className="chapter-detail-hero__location"
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.12,
            }}
          >
            {chapter.location}
          </motion.p>

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
            {chapter.name}
          </motion.h1>

          {chapter.campus_university && (
            <motion.p
              className="chapter-detail-hero__university"
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
              {
                chapter.campus_university
              }
            </motion.p>
          )}
        </div>

        <div className="chapter-detail-hero__footer">
          <span>
            Community · Creativity · Faith
          </span>

          <span>
            Scroll ↓
          </span>
        </div>
      </div>
    </section>
  );
}