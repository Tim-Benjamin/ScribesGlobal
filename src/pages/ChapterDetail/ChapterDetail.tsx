import {
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import ChapterHero from "../../components/chapters/detail/ChapterHero";

import ChapterInfo from "../../components/chapters/detail/ChapterInfo";

import ChapterContact from "../../components/chapters/detail/ChapterContact";

import ChapterGallery from "../../components/chapters/detail/ChapterGallery";

import JoinChapterModal from "../../components/chapters/detail/JoinChapterModal";

import ChapterNotFound from "../../components/chapters/detail/ChapterNotFound";

import {
  useChapter,
} from "../../hooks/useChapter";

import "./chapter-detail.css";

export default function ChapterDetail() {
  const {
    slug,
  } =
    useParams<{
      slug: string;
    }>();

  const {
    chapter,
    loading,
    error,
    refetch,
  } =
    useChapter(slug);

  const [
    joinOpen,
    setJoinOpen,
  ] =
    useState(false);

  if (loading) {
    return (
      <main className="chapter-detail-page">
        <section className="chapter-detail-loading">
          <div className="chapter-detail-loading__hero" />

          <div className="chapter-detail-container chapter-detail-loading__body">
            <span />
            <span />
            <span />
          </div>
        </section>
      </main>
    );
  }

  if (
    error
  ) {
    return (
      <main className="chapter-detail-page">
        <ChapterNotFound
          error={error}
          onRetry={
            refetch
          }
        />
      </main>
    );
  }

  if (!chapter) {
    return (
      <main className="chapter-detail-page">
        <ChapterNotFound />
      </main>
    );
  }

  return (
    <main className="chapter-detail-page">
      <ChapterHero
        chapter={chapter}
      />

      <ChapterInfo
        chapter={chapter}
        onJoin={() =>
          setJoinOpen(
            true,
          )
        }
      />

      <ChapterContact
        chapter={chapter}
      />

      <ChapterGallery
        chapter={chapter}
      />

      <section className="chapter-detail-cta">
        <div className="chapter-detail-cta__network">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="chapter-detail-container chapter-detail-cta__inner">
          <p>
            Become Part of the
            Community
          </p>

          <h2>
            YOUR PLACE
            <strong>
              COULD BE HERE.
            </strong>
          </h2>

          <p className="chapter-detail-cta__copy">
            Connect with{" "}
            <strong>
              {chapter.name}
            </strong>{" "}
            and grow in faith,
            creativity and
            community.
          </p>

          <div className="chapter-detail-cta__actions">
            <button
              type="button"
              onClick={() =>
                setJoinOpen(
                  true,
                )
              }
            >
              <span>
                Join{" "}
                {chapter.name}
              </span>

              <span>
                ↗
              </span>
            </button>

            <Link to="/chapters">
              Explore other
              chapters
            </Link>
          </div>
        </div>
      </section>

      <JoinChapterModal
        chapter={chapter}
        open={joinOpen}
        onClose={() =>
          setJoinOpen(
            false,
          )
        }
      />
    </main>
  );
}