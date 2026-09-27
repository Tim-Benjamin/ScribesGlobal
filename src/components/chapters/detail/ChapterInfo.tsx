import type {
  ActiveChapterItem,
} from "../../../lib/supabase/queries/chapters";

type ChapterInfoProps = {
  chapter:
    ActiveChapterItem;

  onJoin:
    () => void;
};

export default function ChapterInfo({
  chapter,
  onJoin,
}: ChapterInfoProps) {
  const about =
    chapter.about_text ??
    chapter.description;

  return (
    <section className="chapter-detail-info">
      <div className="chapter-detail-container chapter-detail-info__layout">
        <div className="chapter-detail-info__intro">
          <span>
            01 / About
          </span>

          <h2>
            THIS IS
            <strong>
              {chapter.name}.
            </strong>
          </h2>
        </div>

        <div className="chapter-detail-info__content">
          {about ? (
            <p className="chapter-detail-info__about">
              {about}
            </p>
          ) : (
            <p className="chapter-detail-info__about chapter-detail-info__about--muted">
              More information about
              this chapter will be
              available soon.
            </p>
          )}

          <div className="chapter-detail-info__facts">
            {chapter.location && (
              <div>
                <span>
                  Location
                </span>

                <strong>
                  {
                    chapter.location
                  }
                </strong>
              </div>
            )}

            {chapter.meeting_schedule && (
              <div>
                <span>
                  Meeting
                </span>

                <strong>
                  {
                    chapter.meeting_schedule
                  }
                </strong>
              </div>
            )}

            {chapter.campus_university && (
              <div>
                <span>
                  Campus
                </span>

                <strong>
                  {
                    chapter.campus_university
                  }
                </strong>
              </div>
            )}

            <div>
              <span>
                Status
              </span>

              <strong className="chapter-detail-info__active">
                ● Active
              </strong>
            </div>
          </div>

          <button
            type="button"
            className="chapter-detail-info__join"
            onClick={
              onJoin
            }
          >
            <span>
              Join this chapter
            </span>

            <span>
              ↗
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}