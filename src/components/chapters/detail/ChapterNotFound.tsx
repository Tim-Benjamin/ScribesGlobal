import {
  Link,
} from "react-router-dom";

type ChapterNotFoundProps = {
  error?:
    string | null;

  onRetry?:
    () => void;
};

export default function ChapterNotFound({
  error,
  onRetry,
}: ChapterNotFoundProps) {
  return (
    <section className="chapter-not-found">
      <div>
        <span>
          Chapter unavailable
        </span>

        <h1>
          THIS CHAPTER
          <strong>
            COULDN'T BE FOUND.
          </strong>
        </h1>

        {error && (
          <p>
            {error}
          </p>
        )}

        <div className="chapter-not-found__actions">
          <Link to="/chapters">
            ← View all chapters
          </Link>

          {onRetry && (
            <button
              type="button"
              onClick={
                onRetry
              }
            >
              Try again ↻
            </button>
          )}
        </div>
      </div>
    </section>
  );
}