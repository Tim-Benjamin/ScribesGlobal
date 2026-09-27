import type {
  ActiveChapterItem,
} from "../../../lib/supabase/queries/chapters";

type ChapterContactProps = {
  chapter:
    ActiveChapterItem;
};

export default function ChapterContact({
  chapter,
}: ChapterContactProps) {
  const hasContact =
    Boolean(
      chapter.contact_email ||
        chapter.contact_phone ||
        chapter.contact_person,
    );

  if (!hasContact) {
    return null;
  }

  return (
    <section className="chapter-contact">
      <div className="chapter-detail-container">
        <div className="chapter-detail-heading">
          <div>
            <span>
              02
            </span>

            <p>
              Connect
            </p>
          </div>

          <h2>
            REACH THE
            <strong>
              CHAPTER.
            </strong>
          </h2>
        </div>

        <div className="chapter-contact__grid">
          {chapter.contact_person && (
            <div className="chapter-contact__item">
              <span>
                Contact Person
              </span>

              <strong>
                {
                  chapter.contact_person
                }
              </strong>
            </div>
          )}

          {chapter.contact_email && (
            <a
              href={`mailto:${chapter.contact_email}`}
              className="chapter-contact__item"
            >
              <span>
                Email
              </span>

              <strong>
                {
                  chapter.contact_email
                }
              </strong>

              <i>
                ↗
              </i>
            </a>
          )}

          {chapter.contact_phone && (
            <a
              href={`tel:${chapter.contact_phone.replace(/\s+/g, "")}`}
              className="chapter-contact__item"
            >
              <span>
                Phone
              </span>

              <strong>
                {
                  chapter.contact_phone
                }
              </strong>

              <i>
                ↗
              </i>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}