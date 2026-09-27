import {
  useMemo,
  useState,
} from "react";

import EventsHero from "../../components/events/EventsHero";

import FeaturedEvent from "../../components/events/FeaturedEvent";

import EventCard from "../../components/events/EventCard";

import EventsSkeleton from "../../components/events/EventsSkeleton";

import EventsEmptyState from "../../components/events/EventsEmptyState";

import EventsErrorState from "../../components/events/EventsErrorState";

import {
useEvents,
} from "../../hooks/useEvents";

import {
  getEventDisplayStatus,
  type EventDisplayStatus,
} from "../../lib/supabase/queries/events";

import "./events.css";

type EventsFilter =
  | "all"
  | EventDisplayStatus;

export default function Events() {
  const {
    events,
    loading,
    error,
    refetch,
  } =
    useEvents();

  const [
    filter,
    setFilter,
  ] =
    useState<EventsFilter>(
      "all",
    );

  /* =======================================================
     DERIVED EVENT GROUPS
  ======================================================= */

  const eventGroups =
    useMemo(() => {
      const now =
        new Date();

      const upcoming =
        events
          .filter(
            (event) =>
              getEventDisplayStatus(
                event,
                now,
              ) ===
              "upcoming",
          )
          .sort(
            (
              a,
              b,
            ) =>
              new Date(
                a.start_date,
              ).getTime() -
              new Date(
                b.start_date,
              ).getTime(),
          );

      const ongoing =
        events.filter(
          (event) =>
            getEventDisplayStatus(
              event,
              now,
            ) ===
            "ongoing",
        );

      const past =
        events
          .filter(
            (event) =>
              getEventDisplayStatus(
                event,
                now,
              ) ===
              "past",
          )
          .sort(
            (
              a,
              b,
            ) =>
              new Date(
                b.start_date,
              ).getTime() -
              new Date(
                a.start_date,
              ).getTime(),
          );

      const cancelled =
        events.filter(
          (event) =>
            getEventDisplayStatus(
              event,
              now,
            ) ===
            "cancelled",
        );

      return {
        upcoming,
        ongoing,
        past,
        cancelled,
      };
    }, [events]);

  /* =======================================================
     FEATURED
  ======================================================= */

  const featuredEvent =
    useMemo(() => {
      /*
       * Priority:
       * 1. ongoing featured
       * 2. upcoming featured
       * 3. nearest ongoing
       * 4. nearest upcoming
       */

      const featured =
        events.filter(
          (event) =>
            Boolean(
              event.featured,
            ),
        );

      const activeFeatured =
        featured.find(
          (event) =>
            getEventDisplayStatus(
              event,
            ) ===
            "ongoing",
        );

      if (
        activeFeatured
      ) {
        return activeFeatured;
      }

      const upcomingFeatured =
        featured
          .filter(
            (event) =>
              getEventDisplayStatus(
                event,
              ) ===
              "upcoming",
          )
          .sort(
            (
              a,
              b,
            ) =>
              new Date(
                a.start_date,
              ).getTime() -
              new Date(
                b.start_date,
              ).getTime(),
          )[0];

      if (
        upcomingFeatured
      ) {
        return upcomingFeatured;
      }

      return (
        eventGroups.ongoing[0] ??
        eventGroups.upcoming[0] ??
        null
      );
    }, [
      events,
      eventGroups,
    ]);

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredEvents =
    useMemo(() => {
      if (
        filter ===
        "all"
      ) {
        return [
          ...eventGroups.ongoing,
          ...eventGroups.upcoming,
          ...eventGroups.past,
          ...eventGroups.cancelled,
        ];
      }

      return events.filter(
        (event) =>
          getEventDisplayStatus(
            event,
          ) === filter,
      );
    }, [
      events,
      eventGroups,
      filter,
    ]);

  const countFor = (
    status:
      EventDisplayStatus,
  ) =>
    eventGroups[
      status
    ].length;

  return (
    <main className="events-page">
      <EventsHero
        upcomingCount={
          eventGroups.upcoming
            .length +
          eventGroups.ongoing
            .length
        }
        totalCount={
          events.length
        }
      />

      {/* =================================================
          LOADING
      ================================================= */}

      {loading && (
        <EventsSkeleton />
      )}

      {/* =================================================
          ERROR
      ================================================= */}

      {!loading &&
        error && (
          <EventsErrorState
            message={
              error
            }
            onRetry={
              refetch
            }
          />
        )}

      {/* =================================================
          EMPTY
      ================================================= */}

      {!loading &&
        !error &&
        events.length ===
          0 && (
          <EventsEmptyState />
        )}

      {/* =================================================
          SUCCESS
      ================================================= */}

      {!loading &&
        !error &&
        events.length >
          0 && (
          <>
            {featuredEvent && (
              <FeaturedEvent
                event={
                  featuredEvent
                }
              />
            )}

            <section className="events-explorer">
              <div className="events-container">
                <div className="events-section-heading">
                  <div>
                    <span>
                      {featuredEvent
                        ? "02"
                        : "01"}
                    </span>

                    <p>
                      Event Archive
                    </p>
                  </div>

                  <h2>
                    ALL
                    <span>
                      GATHERINGS.
                    </span>
                  </h2>
                </div>

                {/* ===============================
                    FILTER
                =============================== */}

                <div className="events-filter">
                  <div className="events-filter__intro">
                    <span>
                      Browse
                    </span>

                    <strong>
                      {
                        filteredEvents.length
                      }{" "}
                      {filteredEvents.length ===
                      1
                        ? "event"
                        : "events"}
                    </strong>
                  </div>

                  <div
                    className="events-filter__buttons"
                    role="group"
                    aria-label="Filter events"
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
                          events.length
                        }
                      </span>
                    </button>

                    {(countFor(
                      "ongoing",
                    ) >
                      0 ||
                      countFor(
                        "upcoming",
                      ) >
                        0) && (
                      <button
                        type="button"
                        className={
                          filter ===
                          "upcoming"
                            ? "is-active"
                            : ""
                        }
                        onClick={() =>
                          setFilter(
                            "upcoming",
                          )
                        }
                      >
                        Upcoming

                        <span>
                          {countFor(
                            "upcoming",
                          )}
                        </span>
                      </button>
                    )}

                    {countFor(
                      "ongoing",
                    ) > 0 && (
                      <button
                        type="button"
                        className={
                          filter ===
                          "ongoing"
                            ? "is-active"
                            : ""
                        }
                        onClick={() =>
                          setFilter(
                            "ongoing",
                          )
                        }
                      >
                        Live Now

                        <span>
                          {countFor(
                            "ongoing",
                          )}
                        </span>
                      </button>
                    )}

                    {countFor(
                      "past",
                    ) > 0 && (
                      <button
                        type="button"
                        className={
                          filter ===
                          "past"
                            ? "is-active"
                            : ""
                        }
                        onClick={() =>
                          setFilter(
                            "past",
                          )
                        }
                      >
                        Past

                        <span>
                          {countFor(
                            "past",
                          )}
                        </span>
                      </button>
                    )}

                    {countFor(
                      "cancelled",
                    ) > 0 && (
                      <button
                        type="button"
                        className={
                          filter ===
                          "cancelled"
                            ? "is-active"
                            : ""
                        }
                        onClick={() =>
                          setFilter(
                            "cancelled",
                          )
                        }
                      >
                        Cancelled

                        <span>
                          {countFor(
                            "cancelled",
                          )}
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                {/* ===============================
                    EVENTS
                =============================== */}

                {filteredEvents.length >
                0 ? (
                  <div className="events-grid">
                    {filteredEvents.map(
                      (
                        event,
                        index,
                      ) => (
                        <EventCard
                          key={
                            event.id
                          }
                          event={
                            event
                          }
                          index={
                            index
                          }
                        />
                      ),
                    )}
                  </div>
                ) : (
                  <div className="events-filter-empty">
                    <span>
                      Nothing here yet
                    </span>

                    <h3>
                      No events match
                      this view.
                    </h3>

                    <button
                      type="button"
                      onClick={() =>
                        setFilter(
                          "all",
                        )
                      }
                    >
                      Show all events
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* =================================================
                CTA
            ================================================= */}

            <section className="events-cta">
              <div
                className="events-cta__grid"
                aria-hidden="true"
              />

              <div
                className="events-cta__circle events-cta__circle--one"
                aria-hidden="true"
              />

              <div
                className="events-cta__circle events-cta__circle--two"
                aria-hidden="true"
              />

              <div className="events-container events-cta__inner">
                <span>
                  There's More to Come
                </span>

                <h2>
                  COME FOR THE
                  <strong>
                    EXPERIENCE.
                  </strong>

                  LEAVE
                  <em>
                    CHANGED.
                  </em>
                </h2>

                <p>
                  Keep exploring
                  Scribes Global and
                  stay connected for
                  upcoming gatherings,
                  worship experiences,
                  creative sessions
                  and outreach.
                </p>
              </div>
            </section>
          </>
        )}
    </main>
  );
}