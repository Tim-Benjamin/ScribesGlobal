type ChaptersErrorStateProps = {
  message?:
    string | null;

  onRetry:
    () => void;
};

export default function ChaptersErrorState({
  message,
  onRetry,
}: ChaptersErrorStateProps) {
  return (
    <section className="chapters-state chapters-state--error">
      <div className="chapters-state__content">
        <span>
          Connection issue
        </span>

        <h2>
          WE COULDN'T LOAD
          <strong>
            THE CHAPTERS.
          </strong>
        </h2>

        <p>
          {message ||
            "Something interrupted the chapter request."}
        </p>

        <button
          type="button"
          className="chapters-state__button"
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