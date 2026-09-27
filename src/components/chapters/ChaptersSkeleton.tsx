export default function ChaptersSkeleton() {
  return (
    <section
      className="chapters-loading"
      aria-busy="true"
      aria-label="Loading chapters"
    >
      <div className="chapters-container">
        <div className="chapters-loading__header">
          <span />

          <span />
        </div>

        <div className="chapters-loading__grid">
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
                className="chapters-loading__card"
              >
                <div className="chapters-loading__image" />

                <div className="chapters-loading__content">
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