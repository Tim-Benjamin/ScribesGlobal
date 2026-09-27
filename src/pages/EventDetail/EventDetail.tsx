import {
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import EventDetailHero from "../../components/events/detail/EventDetailHero";

import EventOverview from "../../components/events/detail/EventOverview";

import EventGallery from "../../components/events/detail/EventGallery";

import EventVideos from "../../components/events/detail/EventVideos";

import EventActionPanel from "../../components/events/detail/EventActionPanel";

import EventRegistrationModal from "../../components/events/detail/EventRegistrationModal";

import EventRsvpModal from "../../components/events/detail/EventRsvpModal";

import EventNotFound from "../../components/events/detail/EventNotFound";

import {
  useEvent,
} from "../../hooks/useEvent";

import "./event-detail.css";

export default function EventDetail() {
  const {
    slug,
  } =
    useParams<{
      slug: string;
    }>();

  const {
    event,
    loading,
    error,
    refetch,
  } =
    useEvent(slug);

  const [
    registrationOpen,
    setRegistrationOpen,
  ] =
    useState(false);

  const [
    rsvpOpen,
    setRsvpOpen,
  ] =
    useState(false);

  if (loading) {
    return (
      <main className="event-detail-page">
        <section className="event-detail-loading">
          <div className="event-detail-loading__hero" />

          <div className="event-detail-container event-detail-loading__body">
            <span />
            <span />
            <span />
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="event-detail-page">
        <EventNotFound
          error={error}
          onRetry={
            refetch
          }
        />
      </main>
    );
  }

  if (!event) {
    return (
      <main className="event-detail-page">
        <EventNotFound />
      </main>
    );
  }

  return (
    <main className="event-detail-page">
      <EventDetailHero
        event={event}
      />

      <EventOverview
        event={event}
      />

      <EventGallery
        event={event}
      />

      <EventVideos
        event={event}
      />

      <EventActionPanel
        event={event}
        onRegister={() =>
          setRegistrationOpen(
            true,
          )
        }
        onRsvp={() =>
          setRsvpOpen(
            true,
          )
        }
      />

      <section className="event-detail-final">
        <div
          className="event-detail-final__halo"
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </div>

        <div className="event-detail-container event-detail-final__inner">
          <span>
            Scribes Global
          </span>

          <h2>
            MORE THAN
            <strong>
              AN EVENT.
            </strong>
          </h2>

          <p>
            A place to encounter
            Christ, experience
            community and express
            faith through
            creativity.
          </p>

          <Link
            to="/events"
            data-cursor="VIEW"
          >
            <span>
              Explore all events
            </span>

            <span>
              ↗
            </span>
          </Link>
        </div>
      </section>

      <EventRegistrationModal
        event={event}
        open={
          registrationOpen
        }
        onClose={() =>
          setRegistrationOpen(
            false,
          )
        }
      />

      <EventRsvpModal
        event={event}
        open={
          rsvpOpen
        }
        onClose={() =>
          setRsvpOpen(
            false,
          )
        }
      />
    </main>
  );
}