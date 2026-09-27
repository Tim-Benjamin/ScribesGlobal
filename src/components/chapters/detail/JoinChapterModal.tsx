import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import type {
  ActiveChapterItem,
} from "../../../lib/supabase/queries/chapters";

import {
  joinChapter,
} from "../../../lib/supabase/mutations/chapters";

type JoinChapterModalProps = {
  chapter:
    ActiveChapterItem;

  open:
    boolean;

  onClose:
    () => void;
};

type FormState = {
  firstName:
    string;

  lastName:
    string;

  email:
    string;

  phone:
    string;

  message:
    string;

  website:
    string;
};

const INITIAL_FORM: FormState =
  {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    website: "",
  };

export default function JoinChapterModal({
  chapter,
  open,
  onClose,
}: JoinChapterModalProps) {
  const [
    form,
    setForm,
  ] =
    useState<FormState>(
      INITIAL_FORM,
    );

  const [
    submitting,
    setSubmitting,
  ] =
    useState(false);

  const [
    error,
    setError,
  ] =
    useState<
      string | null
    >(null);

  const [
    success,
    setSuccess,
  ] =
    useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previous =
      document.body.style
        .overflow;

    document.body.style.overflow =
      "hidden";

    const onKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key ===
        "Escape"
      ) {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      onKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previous;

      window.removeEventListener(
        "keydown",
        onKeyDown,
      );
    };
  }, [
    open,
    onClose,
  ]);

  const updateField = (
    field:
      keyof FormState,
    value:
      string,
  ) => {
    setForm(
      (current) => ({
        ...current,
        [field]: value,
      }),
    );
  };

  const handleSubmit =
    async (
      event:
        FormEvent<HTMLFormElement>,
    ) => {
      event.preventDefault();

      if (
        submitting
      ) {
        return;
      }

      setError(null);

      if (
        !form.firstName.trim() ||
        !form.lastName.trim() ||
        !form.email.trim()
      ) {
        setError(
          "Please enter your first name, last name and email.",
        );

        return;
      }

      try {
        setSubmitting(
          true,
        );

        await joinChapter({
          chapter_id:
            chapter.id,

          first_name:
            form.firstName.trim(),

          last_name:
            form.lastName.trim(),

          email:
            form.email.trim(),

          phone:
            form.phone.trim(),

          message:
            form.message.trim(),

          website:
            form.website,
        });

        setSuccess(
          true,
        );

        setForm(
          INITIAL_FORM,
        );
      } catch (
        error
      ) {
        console.error(
          "[JoinChapter] Submission failed:",
          error,
        );

        setError(
          error instanceof
            Error
            ? error.message
            : "Unable to submit your request.",
        );
      } finally {
        setSubmitting(
          false,
        );
      }
    };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="join-chapter-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`Join ${chapter.name}`}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          onClick={
            onClose
          }
        >
          <motion.div
            className="join-chapter-modal__panel"
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 30,
              scale: 0.98,
            }}
            transition={{
              duration: 0.4,

              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
            onClick={(
              event,
            ) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className="join-chapter-modal__close"
              onClick={
                onClose
              }
              aria-label="Close"
            >
              ×
            </button>

            {!success ? (
              <>
                <div className="join-chapter-modal__heading">
                  <span>
                    Join the Community
                  </span>

                  <h2>
                    {chapter.name}
                  </h2>

                  <p>
                    Send your details
                    and the chapter
                    team can connect
                    with you.
                  </p>
                </div>

                <form
                  onSubmit={
                    handleSubmit
                  }
                  className="join-chapter-form"
                >
                  {/* Honeypot */}
                  <div
                    className="join-chapter-form__honeypot"
                    aria-hidden="true"
                  >
                    <label>
                      Website

                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={
                          form.website
                        }
                        onChange={(
                          event,
                        ) =>
                          updateField(
                            "website",
                            event.target
                              .value,
                          )
                        }
                      />
                    </label>
                  </div>

                  <div className="join-chapter-form__row">
                    <label>
                      <span>
                        First name *
                      </span>

                      <input
                        type="text"
                        autoComplete="given-name"
                        value={
                          form.firstName
                        }
                        onChange={(
                          event,
                        ) =>
                          updateField(
                            "firstName",
                            event.target
                              .value,
                          )
                        }
                        required
                      />
                    </label>

                    <label>
                      <span>
                        Last name *
                      </span>

                      <input
                        type="text"
                        autoComplete="family-name"
                        value={
                          form.lastName
                        }
                        onChange={(
                          event,
                        ) =>
                          updateField(
                            "lastName",
                            event.target
                              .value,
                          )
                        }
                        required
                      />
                    </label>
                  </div>

                  <label>
                    <span>
                      Email *
                    </span>

                    <input
                      type="email"
                      autoComplete="email"
                      value={
                        form.email
                      }
                      onChange={(
                        event,
                      ) =>
                        updateField(
                          "email",
                          event.target
                            .value,
                        )
                      }
                      required
                    />
                  </label>

                  <label>
                    <span>
                      Phone
                    </span>

                    <input
                      type="tel"
                      autoComplete="tel"
                      value={
                        form.phone
                      }
                      onChange={(
                        event,
                      ) =>
                        updateField(
                          "phone",
                          event.target
                            .value,
                        )
                      }
                    />
                  </label>

                  <label>
                    <span>
                      Message
                    </span>

                    <textarea
                      rows={5}
                      value={
                        form.message
                      }
                      onChange={(
                        event,
                      ) =>
                        updateField(
                          "message",
                          event.target
                            .value,
                        )
                      }
                      placeholder="Tell us a little about yourself..."
                    />
                  </label>

                  {error && (
                    <div
                      className="join-chapter-form__error"
                      role="alert"
                    >
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="join-chapter-form__submit"
                    disabled={
                      submitting
                    }
                  >
                    <span>
                      {submitting
                        ? "Sending..."
                        : "Send request"}
                    </span>

                    <span>
                      {submitting
                        ? "···"
                        : "↗"}
                    </span>
                  </button>
                </form>
              </>
            ) : (
              <div className="join-chapter-success">
                <span className="join-chapter-success__icon">
                  ✓
                </span>

                <p>
                  Request sent
                </p>

                <h2>
                  WE'LL SEE YOU
                  <strong>
                    IN THE COMMUNITY.
                  </strong>
                </h2>

                <p className="join-chapter-success__copy">
                  Your request to
                  join{" "}
                  <strong>
                    {
                      chapter.name
                    }
                  </strong>{" "}
                  has been submitted.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSuccess(
                      false,
                    );

                    onClose();
                  }}
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}