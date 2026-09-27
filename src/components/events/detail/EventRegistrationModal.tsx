import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  registerEvent,
} from "../../../lib/supabase/mutations/events";

import type {
  EventItem,
} from "../../../lib/supabase/queries/events";

type EventRegistrationModalProps = {
  event:
    EventItem;

  open:
    boolean;

  onClose:
    () => void;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  chapter: string;
  dietaryNeeds: string;
  additionalInfo: string;
  website: string;
};

const INITIAL_FORM: FormState =
  {
    name: "",
    email: "",
    phone: "",
    chapter: "",
    dietaryNeeds: "",
    additionalInfo: "",
    website: "",
  };

export default function EventRegistrationModal({
  event,
  open,
  onClose,
}: EventRegistrationModalProps) {
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
      event:
        KeyboardEvent,
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

  const update = (
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

  const submit =
    async (
      eventObject:
        FormEvent<HTMLFormElement>,
    ) => {
      eventObject.preventDefault();

      if (submitting) {
        return;
      }

      setError(null);

      if (
        !form.name.trim() ||
        !form.email.trim()
      ) {
        setError(
          "Please enter your name and email.",
        );

        return;
      }

      try {
        setSubmitting(
          true,
        );

        await registerEvent({
          event_id:
            event.id,

          name:
            form.name,

          email:
            form.email,

          phone:
            form.phone,

          chapter:
            form.chapter,

          dietary_needs:
            form.dietaryNeeds,

          additional_info:
            form.additionalInfo,

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
        setError(
          error instanceof
            Error
            ? error.message
            : "Registration failed.",
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
          className="event-form-modal"
          role="dialog"
          aria-modal="true"
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
            className="event-form-modal__panel"
            initial={{
              y: 45,
              opacity: 0,
              scale: 0.97,
            }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
            }}
            exit={{
              y: 30,
              opacity: 0,
            }}
            onClick={(
              event,
            ) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className="event-form-modal__close"
              onClick={
                onClose
              }
            >
              ×
            </button>

            {!success ? (
              <>
                <header className="event-form-modal__header">
                  <span>
                    Registration
                  </span>

                  <h2>
                    {
                      event.title
                    }
                  </h2>

                  <p>
                    Reserve your
                    place for this
                    gathering.
                  </p>
                </header>

                <form
                  className="event-form"
                  onSubmit={
                    submit
                  }
                >
                  <div className="event-form__honeypot">
                    <label>
                      Website

                      <input
                        type="text"
                        value={
                          form.website
                        }
                        tabIndex={-1}
                        autoComplete="off"
                        onChange={(
                          e,
                        ) =>
                          update(
                            "website",
                            e.target
                              .value,
                          )
                        }
                      />
                    </label>
                  </div>

                  <label>
                    <span>
                      Full name *
                    </span>

                    <input
                      type="text"
                      value={
                        form.name
                      }
                      autoComplete="name"
                      required
                      onChange={(
                        e,
                      ) =>
                        update(
                          "name",
                          e.target
                            .value,
                        )
                      }
                    />
                  </label>

                  <label>
                    <span>
                      Email *
                    </span>

                    <input
                      type="email"
                      value={
                        form.email
                      }
                      autoComplete="email"
                      required
                      onChange={(
                        e,
                      ) =>
                        update(
                          "email",
                          e.target
                            .value,
                        )
                      }
                    />
                  </label>

                  <label>
                    <span>
                      Phone
                    </span>

                    <input
                      type="tel"
                      value={
                        form.phone
                      }
                      autoComplete="tel"
                      onChange={(
                        e,
                      ) =>
                        update(
                          "phone",
                          e.target
                            .value,
                        )
                      }
                    />
                  </label>

                  <label>
                    <span>
                      Chapter
                    </span>

                    <input
                      type="text"
                      value={
                        form.chapter
                      }
                      placeholder="e.g. Scribes Legon"
                      onChange={(
                        e,
                      ) =>
                        update(
                          "chapter",
                          e.target
                            .value,
                        )
                      }
                    />
                  </label>

                  <label>
                    <span>
                      Dietary needs
                    </span>

                    <textarea
                      rows={3}
                      value={
                        form.dietaryNeeds
                      }
                      onChange={(
                        e,
                      ) =>
                        update(
                          "dietaryNeeds",
                          e.target
                            .value,
                        )
                      }
                    />
                  </label>

                  <label>
                    <span>
                      Additional information
                    </span>

                    <textarea
                      rows={4}
                      value={
                        form.additionalInfo
                      }
                      onChange={(
                        e,
                      ) =>
                        update(
                          "additionalInfo",
                          e.target
                            .value,
                        )
                      }
                    />
                  </label>

                  {error && (
                    <div
                      className="event-form__error"
                      role="alert"
                    >
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="event-form__submit"
                    disabled={
                      submitting
                    }
                  >
                    <span>
                      {submitting
                        ? "Registering..."
                        : "Complete registration"}
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
              <div className="event-form-success">
                <span>
                  ✓
                </span>

                <p>
                  Registration sent
                </p>

                <h2>
                  YOUR PLACE
                  <strong>
                    IS REQUESTED.
                  </strong>
                </h2>

                <p>
                  Your registration
                  for{" "}
                  <strong>
                    {
                      event.title
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