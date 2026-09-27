type EventsErrorStateProps = {
  message?:
    string | null;

  onRetry:
    () => void;
};

export default function EventsErrorState({
  message,
  onRetry,
}: EventsErrorStateProps) {
  return (
    <section className="events-state events-state--error">
      <div className="events-state__content">
        <span>
          Connection issue
        </span>

        <h2>
          EVENTS COULDN'T
          <strong>
            BE LOADED.
          </strong>
        </h2>

        <p>
          {message ||
            "Something interrupted the events request."}
        </p>

        <button
          type="button"
          className="events-state__button"
          onClick={
            onRetry
          }
        >
          Try again

          <span>
            ↻
          </span>
        </button>
      </div>
    </section>
  );
}