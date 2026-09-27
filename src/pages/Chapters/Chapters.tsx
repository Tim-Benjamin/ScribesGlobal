import {
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import ChaptersHero from "../../components/chapters/ChaptersHero";

import ChaptersExplorer from "../../components/chapters/ChaptersExplorer";

import ChaptersGrid from "../../components/chapters/ChaptersGrid";

import ChaptersSkeleton from "../../components/chapters/ChaptersSkeleton";

import ChaptersEmptyState from "../../components/chapters/ChaptersEmptyState";

import ChaptersErrorState from "../../components/chapters/ChaptersErrorState";

import {
  useChapters,
} from "../../hooks/useChapters";

import type {
  ActiveChapterItem,
} from "../../lib/supabase/queries/chapters";

import "./chapters.css";

type ChapterFilter =
  | "all"
  | "campus"
  | "community";

export default function Chapters() {
  const {
    chapters,
    loading,
    error,
    refetch,
  } =
    useChapters();

  const [
    selectedId,
    setSelectedId,
  ] =
    useState<
      ActiveChapterItem["id"] |
      null
    >(null);

  const [
    filter,
    setFilter,
  ] =
    useState<ChapterFilter>(
      "all",
    );

  const filteredChapters =
    useMemo(
      () => {
        if (
          filter ===
          "campus"
        ) {
          return chapters.filter(
            (
              chapter,
            ) =>
              Boolean(
                chapter.is_campus,
              ),
          );
        }

        if (
          filter ===
          "community"
        ) {
          return chapters.filter(
            (
              chapter,
            ) =>
              !chapter.is_campus,
          );
        }

        return chapters;
      },
      [
        chapters,
        filter,
      ],
    );

  const handleSelect = (
    chapter: ActiveChapterItem,
  ) => {
    setSelectedId(
      chapter.id,
    );
  };

  const hasCampus =
    chapters.some(
      (
        chapter,
      ) =>
        Boolean(
          chapter.is_campus,
        ),
    );

  const hasCommunity =
    chapters.some(
      (
        chapter,
      ) =>
        !chapter.is_campus,
    );

  return (
    <main className="chapters-page">
      <ChaptersHero
        count={
          chapters.length
        }
      />

      {loading && (
        <ChaptersSkeleton />
      )}

      {!loading &&
        error && (
          <ChaptersErrorState
            message={
              error
            }
            onRetry={
              refetch
            }
          />
        )}

      {!loading &&
        !error &&
        chapters.length ===
        0 && (
          <ChaptersEmptyState />
        )}

      {!loading &&
        !error &&
        chapters.length >
        0 && (
          <>
            <ChaptersExplorer
              chapters={
                filteredChapters
              }
              selectedId={
                selectedId
              }
              onSelect={
                handleSelect
              }
            />

            <section className="chapters-filter">
              <div className="chapters-container">
                <div className="chapters-filter__inner">
                  <span>
                    Explore
                  </span>

                  <div
                    className="chapters-filter__buttons"
                    role="group"
                    aria-label="Filter chapters"
                  >
                    <button
                      type="button"
                      className={
                        filter ===
                          "all"
                          ? "is-active"
                          : ""
                      }
                      onClick={() =>
                        setFilter(
                          "all",
                        )
                      }
                    >
                      All

                      <span>
                        {
                          chapters.length
                        }
                      </span>
                    </button>

                    {hasCampus && (
                      <button
                        type="button"
                        className={
                          filter ===
                            "campus"
                            ? "is-active"
                            : ""
                        }
                        onClick={() =>
                          setFilter(
                            "campus",
                          )
                        }
                      >
                        Campus

                        <span>
                          {
                            chapters.filter(
                              (
                                chapter,
                              ) =>
                                Boolean(
                                  chapter.is_campus,
                                ),
                            )
                              .length
                          }
                        </span>
                      </button>
                    )}

                    {hasCommunity && (
                      <button
                        type="button"
                        className={
                          filter ===
                            "community"
                            ? "is-active"
                            : ""
                        }
                        onClick={() =>
                          setFilter(
                            "community",
                          )
                        }
                      >
                        Community

                        <span>
                          {
                            chapters.filter(
                              (
                                chapter,
                              ) =>
                                !chapter.is_campus,
                            )
                              .length
                          }
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {filteredChapters.length >
              0 ? (
              <ChaptersGrid
                chapters={
                  filteredChapters
                }
                selectedId={
                  selectedId
                }
                onSelect={
                  setSelectedId
                    ? (
                      chapter,
                    ) =>
                      setSelectedId(
                        chapter.id,
                      )
                    : () => { }
                }
              />
            ) : (
              <section className="chapters-filter-empty">
                <p>
                  No chapters match
                  this filter.
                </p>
              </section>
            )}

            <section className="chapters-cta">
              <div className="chapters-cta__rings">
                <span />
                <span />
                <span />
              </div>

              <div className="chapters-container chapters-cta__inner">
                <span className="chapters-cta__eyebrow">
                  The Movement Continues
                </span>

                <h2>
                  DON'T SEE A
                  <span>
                    CHAPTER NEAR YOU?
                  </span>
                </h2>

                <p>
                  Connect with Scribes
                  Global and discover
                  how you can become
                  part of the movement.
                </p>

                <div className="chapters-cta__actions">
                  <Link
                    to="/volunteer"
                    className="chapters-cta__primary"
                    data-cursor="VIEW"
                  >
                    <span>
                      Get Involved
                    </span>

                    <span>
                      ↗
                    </span>
                  </Link>

                  <a
                    href="#chapters-list"
                    className="chapters-cta__secondary"
                  >
                    Explore chapters
                  </a>
                </div>
              </div>
            </section>
          </>
        )}
    </main>
  );
}