export default function EventsSkeleton() {
  return (
    <section
      className="events-loading"
      aria-busy="true"
      aria-label="Loading events"
    >
      <div className="events-container">
        <div className="events-loading__heading">
          <span />
          <span />
        </div>

        <div className="events-loading__grid">
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
                className="events-loading__card"
              >
                <div className="events-loading__image" />

                <div className="events-loading__body">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}