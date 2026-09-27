import {
  formatEventDate,
  formatEventTime,
  getEventCapacityLeft,
  getEventDisplayStatus,
  isEventRegistrationFull,
  type EventItem,
} from "../../../lib/supabase/queries/events";

type EventOverviewProps = {
  event:
    EventItem;
};

export default function EventOverview({
  event,
}: EventOverviewProps) {
  const status =
    getEventDisplayStatus(
      event,
    );

  const capacity =
    getEventCapacityLeft(
      event,
    );

  const full =
    isEventRegistrationFull(
      event,
    );

  return (
    <section className="event-overview">
      <div className="event-detail-container event-overview__layout">
        <div className="event-overview__heading">
          <span>
            01 / Event
          </span>

          <h2>
            ABOUT THE
            <strong>
              GATHERING.
            </strong>
          </h2>
        </div>

        <div className="event-overview__content">
          {event.description ? (
            <p className="event-overview__description">
              {
                event.description
              }
            </p>
          ) : (
            <p className="event-overview__description event-overview__description--muted">
              More information about
              this event will be
              available soon.
            </p>
          )}

          <div className="event-overview__facts">
            <div>
              <span>
                Date
              </span>

              <strong>
                {formatEventDate(
                  event.start_date,
                )}
              </strong>
            </div>

            <div>
              <span>
                Start time
              </span>

              <strong>
                {formatEventTime(
                  event.start_date,
                )}
              </strong>
            </div>

            {event.end_date && (
              <div>
                <span>
                  End time
                </span>

                <strong>
                  {formatEventTime(
                    event.end_date,
                  )}
                </strong>
              </div>
            )}

            <div>
              <span>
                Type
              </span>

              <strong>
                {
                  event.event_type
                }
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
                Status
              </span>

              <strong>
                {status}
              </strong>
            </div>
          </div>

          {event.registration_enabled &&
            event.registration_limit !==
              null && (
              <div className="event-overview__capacity">
                <div>
                  <span>
                    Registration
                  </span>

                  <strong>
                    {full
                      ? "Full"
                      : `${capacity ?? 0} spaces remaining`}
                  </strong>
                </div>

                <div className="event-overview__capacity-track">
                  <span
                    style={{
                      width:
                        `${
                          event.registration_limit >
                          0
                            ? Math.min(
                                100,
                                ((event.registration_count ??
                                  0) /
                                  event.registration_limit) *
                                  100,
                              )
                            : 0
                        }%`,
                    }}
                  />
                </div>
              </div>
            )}

          {(event.event_type ===
            "virtual" ||
            event.event_type ===
              "hybrid") &&
            event.virtual_link && (
              <a
                href={
                  event.virtual_link
                }
                target="_blank"
                rel="noopener noreferrer"
                className="event-overview__virtual"
              >
                <span>
                  Join virtual event
                </span>

                <span>
                  ↗
                </span>
              </a>
            )}
        </div>
      </div>
    </section>
  );
}