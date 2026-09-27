import {
  getEventDisplayStatus,
  isEventRegistrationFull,
  type EventItem,
} from "../../../lib/supabase/queries/events";

type EventActionPanelProps = {
  event:
    EventItem;

  onRegister:
    () => void;

  onRsvp:
    () => void;
};

export default function EventActionPanel({
  event,
  onRegister,
  onRsvp,
}: EventActionPanelProps) {
  const status =
    getEventDisplayStatus(
      event,
    );

  const registrationFull =
    isEventRegistrationFull(
      event,
    );

  const eventEnded =
    status === "past" ||
    status === "cancelled";

  if (eventEnded) {
    return null;
  }

  const registrationAvailable =
    Boolean(
      event.registration_enabled,
    ) &&
    !registrationFull;

  const rsvpAvailable =
    Boolean(
      event.rsvp_enabled,
    );

  if (
    !registrationAvailable &&
    !rsvpAvailable
  ) {
    return null;
  }

  return (
    <section className="event-action-panel">
      <div className="event-detail-container event-action-panel__inner">
        <div>
          <span>
            Be There
          </span>

          <h2>
            SAVE YOUR
            <strong>
              PLACE.
            </strong>
          </h2>

          <p>
            {registrationAvailable
              ? "Register for this gathering and reserve your place."
              : "Let us know whether you'll be joining us."}
          </p>
        </div>

        <div className="event-action-panel__actions">
          {registrationAvailable && (
            <button
              type="button"
              className="event-action-panel__primary"
              onClick={
                onRegister
              }
            >
              <span>
                Register
              </span>

              <span>
                ↗
              </span>
            </button>
          )}

          {Boolean(
            event.registration_enabled,
          ) &&
            registrationFull && (
              <span className="event-action-panel__full">
                Registration is
                currently full
              </span>
            )}

          {rsvpAvailable && (
            <button
              type="button"
              className="event-action-panel__secondary"
              onClick={
                onRsvp
              }
            >
              RSVP
            </button>
          )}
        </div>
      </div>
    </section>
  );
}