import {
  useMemo,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  useMediaPage,
} from "../../hooks/useMediaPage";

import {
  storageUrl,
} from "../../lib/supabase/storage";

import {
  getYouTubeEmbedUrl,
  getYouTubeThumbnail,
} from "../../lib/supabase/youtube";

import type {
  MediaContent,
} from "../../lib/supabase/queries/media";

import "./media.css";

type MediaFilter =
  | "all"
  | "image"
  | "video"
  | "audio"
  | "written";

/* =========================================================
   HELPERS
========================================================= */

function getMediaFile(
  item:
    MediaContent,
) {
  return storageUrl(
    "general-media",
    item.file_path,
  );
}

function getMediaThumbnail(
  item:
    MediaContent,
) {
  return storageUrl(
    "general-media",
    item.thumbnail_path,
  );
}

function formatNumber(
  value:
    number | null,
) {
  const number =
    value ?? 0;

  if (number >= 1_000_000) {
    return `${(
      number /
      1_000_000
    ).toFixed(1)}M`;
  }

  if (number >= 1_000) {
    return `${(
      number /
      1_000
    ).toFixed(1)}K`;
  }

  return String(number);
}

export default function Media() {
  const {
    media,
    featuredVideo,
    hashtags,
    youtube,
    instagram,
    tiktok,
    stats,
    loading,
    error,
    refetch,
  } =
    useMediaPage();

  const [
    filter,
    setFilter,
  ] =
    useState<MediaFilter>(
      "all",
    );

  const [
    lightbox,
    setLightbox,
  ] =
    useState<{
      src: string;
      title: string;
    } | null>(null);

  const [
    activeVideo,
    setActiveVideo,
  ] =
    useState<string | null>(
      null,
    );

  const filteredMedia =
    useMemo(() => {
      if (
        filter ===
        "all"
      ) {
        return media;
      }

      return media.filter(
        (item) =>
          item.media_type ===
          filter,
      );
    }, [
      media,
      filter,
    ]);

  const mediaTypes =
    useMemo(
      () =>
        new Set(
          media.map(
            (item) =>
              item.media_type,
          ),
        ),
      [media],
    );

  const hasContent =
    media.length > 0 ||
    featuredVideo ||
    youtube.length > 0 ||
    instagram.length > 0 ||
    tiktok.length > 0 ||
    stats.length > 0;

  const featuredEmbed =
    featuredVideo
      ? getYouTubeEmbedUrl(
          featuredVideo.video_id,
        )
      : null;

  const featuredThumbnail =
    featuredVideo
      ? getYouTubeThumbnail(
          featuredVideo.video_id,
        )
      : null;

  return (
    <main className="media-page">
      {/* ===================================================
          HERO
      =================================================== */}

      <section className="media-hero">
        <div className="media-hero__grid" />

        <div className="media-hero__glow" />

        <div className="media-container media-hero__inner">
          <motion.div
            className="media-hero__meta"
            initial={{
              opacity: 0,
              y: -12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <span>
              Scribes Global
            </span>

            <span>
              Watch · Listen · Read · Experience
            </span>
          </motion.div>

          <div className="media-hero__layout">
            <motion.div
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
              }}
            >
              <p className="media-hero__eyebrow">
                Media
              </p>

              <h1>
                STORIES
                <span>
                  WORTH
                </span>
                SHARING.
              </h1>
            </motion.div>

            <motion.div
              className="media-hero__aside"
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
            >
              <p>
                Poetry, worship,
                spoken word,
                testimonies,
                photographs and
                moments from the
                Scribes Global
                community.
              </p>

              {hashtags.length >
                0 && (
                <div className="media-hero__hashtags">
                  {hashtags
                    .slice(
                      0,
                      6,
                    )
                    .map(
                      (
                        hashtag,
                      ) => (
                        <span
                          key={
                            hashtag.id
                          }
                        >
                          #
                          {
                            hashtag.tag
                          }
                        </span>
                      ),
                    )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================================================
          LOADING
      =================================================== */}

      {loading && (
        <section className="media-loading">
          <div className="media-container">
            <div className="media-loading__hero" />

            <div className="media-loading__grid">
              {Array.from({
                length: 6,
              }).map(
                (
                  _,
                  index,
                ) => (
                  <div
                    key={
                      index
                    }
                    className="media-loading__card"
                  />
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* ===================================================
          ERROR
      =================================================== */}

      {!loading &&
        error && (
          <section className="media-state">
            <span>
              Connection issue
            </span>

            <h2>
              MEDIA COULDN'T
              <strong>
                BE LOADED.
              </strong>
            </h2>

            <p>
              {error}
            </p>

            <button
              type="button"
              onClick={
                refetch
              }
            >
              Try again ↻
            </button>
          </section>
        )}

      {/* ===================================================
          EMPTY
      =================================================== */}

      {!loading &&
        !error &&
        !hasContent && (
          <section className="media-state">
            <span>
              Media archive
            </span>

            <h2>
              NEW STORIES
              <strong>
                ARE COMING.
              </strong>
            </h2>

            <p>
              There is currently
              no public media
              available.
            </p>
          </section>
        )}

      {/* ===================================================
          SUCCESS
      =================================================== */}

      {!loading &&
        !error &&
        hasContent && (
          <>
            {/* =============================================
                FEATURED VIDEO
            ============================================= */}

            {featuredVideo &&
              featuredEmbed &&
              featuredThumbnail && (
                <section className="media-featured">
                  <div className="media-container">
                    <div className="media-heading">
                      <div>
                        <span>
                          01
                        </span>

                        <p>
                          Featured
                        </p>
                      </div>

                      <h2>
                        PRESS
                        <strong>
                          PLAY.
                        </strong>
                      </h2>
                    </div>

                    <button
                      type="button"
                      className="media-featured__video"
                      onClick={() =>
                        setActiveVideo(
                          featuredEmbed,
                        )
                      }
                      data-cursor="PLAY"
                    >
                      <img
                        src={
                          featuredThumbnail
                        }
                        alt={
                          featuredVideo.title ??
                          "Featured Scribes Global video"
                        }
                      />

                      <div className="media-featured__overlay" />

                      <span className="media-featured__play">
                        ▶
                      </span>

                      <div className="media-featured__bottom">
                        <div>
                          <span>
                            Featured Film
                          </span>

                          <h3>
                            {featuredVideo.title ??
                              "Scribes Global"}
                          </h3>
                        </div>

                        <span>
                          Watch ↗
                        </span>
                      </div>
                    </button>
                  </div>
                </section>
              )}

            {/* =============================================
                YOUTUBE
            ============================================= */}

            {youtube.length >
              0 && (
              <section className="media-youtube">
                <div className="media-container">
                  <div className="media-heading">
                    <div>
                      <span>
                        {featuredVideo
                          ? "02"
                          : "01"}
                      </span>

                      <p>
                        YouTube
                      </p>
                    </div>

                    <h2>
                      WATCH THE
                      <strong>
                        ARCHIVE.
                      </strong>
                    </h2>
                  </div>

                  <div className="media-youtube__grid">
                    {youtube.map(
                      (
                        video,
                        index,
                      ) => {
                        const embed =
                          getYouTubeEmbedUrl(
                            video.video_id,
                          );

                        const thumbnail =
                          video.thumbnail_url ||
                          getYouTubeThumbnail(
                            video.video_id,
                          );

                        if (
                          !embed ||
                          !thumbnail
                        ) {
                          return null;
                        }

                        return (
                          <button
                            key={
                              video.id
                            }
                            type="button"
                            className={`media-youtube-card ${
                              index ===
                              0
                                ? "media-youtube-card--large"
                                : ""
                            }`}
                            onClick={() =>
                              setActiveVideo(
                                embed,
                              )
                            }
                            data-cursor="PLAY"
                          >
                            <div className="media-youtube-card__media">
                              <img
                                src={
                                  thumbnail
                                }
                                alt=""
                                loading="lazy"
                              />

                              <div className="media-youtube-card__overlay" />

                              <span className="media-youtube-card__play">
                                ▶
                              </span>

                              {video.duration && (
                                <span className="media-youtube-card__duration">
                                  {
                                    video.duration
                                  }
                                </span>
                              )}
                            </div>

                            <div className="media-youtube-card__body">
                              <span>
                                YouTube
                              </span>

                              <h3>
                                {
                                  video.title
                                }
                              </h3>

                              <div>
                                <span>
                                  {formatNumber(
                                    video.view_count,
                                  )}{" "}
                                  views
                                </span>

                                <span>
                                  {formatNumber(
                                    video.like_count,
                                  )}{" "}
                                  likes
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      },
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* =============================================
                MEDIA ARCHIVE
            ============================================= */}

            {media.length >
              0 && (
              <section className="media-archive">
                <div className="media-container">
                  <div className="media-heading">
                    <div>
                      <span>
                        03
                      </span>

                      <p>
                        Archive
                      </p>
                    </div>

                    <h2>
                      CREATIVE
                      <strong>
                        EXPRESSIONS.
                      </strong>
                    </h2>
                  </div>

                  <div className="media-filter">
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
                    </button>

                    {(
                      [
                        "image",
                        "video",
                        "audio",
                        "written",
                      ] as const
                    ).map(
                      (
                        type,
                      ) =>
                        mediaTypes.has(
                          type,
                        ) && (
                          <button
                            key={
                              type
                            }
                            type="button"
                            className={
                              filter ===
                              type
                                ? "is-active"
                                : ""
                            }
                            onClick={() =>
                              setFilter(
                                type,
                              )
                            }
                          >
                            {
                              type
                            }
                          </button>
                        ),
                    )}
                  </div>

                  <div className="media-archive__grid">
                    {filteredMedia.map(
                      (
                        item,
                        index,
                      ) => {
                        const file =
                          getMediaFile(
                            item,
                          );

                        const thumbnail =
                          getMediaThumbnail(
                            item,
                          );

                        return (
                          <article
                            key={
                              item.id
                            }
                            className={`media-item media-item--${item.media_type} ${
                              item.featured
                                ? "is-featured"
                                : ""
                            }`}
                          >
                            {item.media_type ===
                              "image" &&
                              file && (
                                <button
                                  type="button"
                                  className="media-item__visual"
                                  onClick={() =>
                                    setLightbox(
                                      {
                                        src:
                                          file,

                                        title:
                                          item.title,
                                      },
                                    )
                                  }
                                  data-cursor="VIEW"
                                >
                                  <img
                                    src={
                                      file
                                    }
                                    alt={
                                      item.title
                                    }
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
                              )}

                            {item.media_type ===
                              "video" &&
                              (thumbnail ||
                                file) && (
                                <div className="media-item__visual">
                                  {thumbnail && (
                                    <img
                                      src={
                                        thumbnail
                                      }
                                      alt=""
                                      loading="lazy"
                                    />
                                  )}

                                  <span className="media-item__type">
                                    Video
                                  </span>
                                </div>
                              )}

                            {item.media_type ===
                              "audio" && (
                                <div className="media-item__audio">
                                  <span>
                                    ◉
                                  </span>

                                  {file && (
                                    <audio
                                      controls
                                      preload="none"
                                      src={
                                        file
                                      }
                                    />
                                  )}
                                </div>
                              )}

                            <div className="media-item__body">
                              <div className="media-item__meta">
                                <span>
                                  {
                                    item.category
                                  }
                                </span>

                                {item.featured && (
                                  <span>
                                    Featured
                                  </span>
                                )}
                              </div>

                              <h3>
                                {
                                  item.title
                                }
                              </h3>

                              {item.description && (
                                <p>
                                  {
                                    item.description
                                  }
                                </p>
                              )}

                              <span className="media-item__views">
                                {formatNumber(
                                  item.view_count,
                                )}{" "}
                                views
                              </span>
                            </div>
                          </article>
                        );
                      },
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* =============================================
                SOCIAL STATS
            ============================================= */}

            {stats.length >
              0 && (
              <section className="media-social">
                <div className="media-container">
                  <div className="media-heading media-heading--dark">
                    <div>
                      <span>
                        04
                      </span>

                      <p>
                        Community
                      </p>
                    </div>

                    <h2>
                      FOLLOW THE
                      <strong>
                        MOVEMENT.
                      </strong>
                    </h2>
                  </div>

                  <div className="media-social__stats">
                    {stats.map(
                      (
                        stat,
                      ) => (
                        <div
                          key={
                            stat.id
                          }
                        >
                          <strong>
                            {formatNumber(
                              stat.follower_count,
                            )}
                          </strong>

                          <span>
                            {
                              stat.platform
                            }
                          </span>
                        </div>
                      ),
                    )}
                  </div>

                  {(instagram.length >
                    0 ||
                    tiktok.length >
                      0) && (
                    <div className="media-social__links">
                      {instagram.map(
                        (
                          post,
                        ) => (
                          <a
                            key={
                              post.id
                            }
                            href={
                              post.post_url!
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>
                              Instagram
                            </span>

                            <strong>
                              {post.caption ||
                                `Post ${post.slot}`}
                            </strong>

                            <i>
                              ↗
                            </i>
                          </a>
                        ),
                      )}

                      {tiktok.map(
                        (
                          post,
                        ) => (
                          <a
                            key={
                              post.id
                            }
                            href={
                              post.video_url!
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>
                              TikTok
                            </span>

                            <strong>
                              Featured
                              video{" "}
                              {
                                post.slot
                              }
                            </strong>

                            <i>
                              ↗
                            </i>
                          </a>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </section>
            )}
          </>
        )}

      {/* ===================================================
          IMAGE LIGHTBOX
      =================================================== */}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="media-lightbox"
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
              setLightbox(
                null,
              )
            }
          >
            <button
              type="button"
              onClick={() =>
                setLightbox(
                  null,
                )
              }
            >
              ×
            </button>

            <motion.figure
              initial={{
                scale: 0.94,
                y: 25,
              }}
              animate={{
                scale: 1,
                y: 0,
              }}
              onClick={(
                event,
              ) =>
                event.stopPropagation()
              }
            >
              <img
                src={
                  lightbox.src
                }
                alt={
                  lightbox.title
                }
              />

              <figcaption>
                {
                  lightbox.title
                }
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================
          VIDEO MODAL
      =================================================== */}

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="media-video-modal"
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
              setActiveVideo(
                null,
              )
            }
          >
            <button
              type="button"
              onClick={() =>
                setActiveVideo(
                  null,
                )
              }
            >
              ×
            </button>

            <motion.div
              className="media-video-modal__frame"
              initial={{
                scale: 0.94,
              }}
              animate={{
                scale: 1,
              }}
              onClick={(
                event,
              ) =>
                event.stopPropagation()
              }
            >
              <iframe
                src={
                  activeVideo
                }
                title="Scribes Global video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}