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
  rsvpEvent,
  type EventRsvpResponse,
} from "../../../lib/supabase/mutations/events";

import type {
  EventItem,
} from "../../../lib/supabase/queries/events";

type EventRsvpModalProps = {
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

  response:
    EventRsvpResponse;

  guests:
    number;

  message: string;

  website: string;
};

const INITIAL_FORM: FormState =
  {
    name: "",
    email: "",
    phone: "",
    response: "yes",
    guests: 1,
    message: "",
    website: "",
  };

export default function EventRsvpModal({
  event,
  open,
  onClose,
}: EventRsvpModalProps) {
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

    const keydown = (
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
      keydown,
    );

    return () => {
      document.body.style.overflow =
        previous;

      window.removeEventListener(
        "keydown",
        keydown,
      );
    };
  }, [
    open,
    onClose,
  ]);

  const submit =
    async (
      formEvent:
        FormEvent<HTMLFormElement>,
    ) => {
      formEvent.preventDefault();

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

        await rsvpEvent({
          event_id:
            event.id,

          name:
            form.name,

          email:
            form.email,

          phone:
            form.phone,

          response:
            form.response,

          guests_count:
            form.guests,

          message:
            form.message,

          website:
            form.website,
        });

        setSuccess(
          true,
        );
      } catch (
        error
      ) {
        setError(
          error instanceof
            Error
            ? error.message
            : "RSVP failed.",
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
              opacity: 0,
              y: 45,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
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
                    RSVP
                  </span>

                  <h2>
                    {
                      event.title
                    }
                  </h2>

                  <p>
                    Let the team
                    know whether
                    you'll be there.
                  </p>
                </header>

                <form
                  className="event-form"
                  onSubmit={
                    submit
                  }
                >
                  <div className="event-form__honeypot">
                    <input
                      value={
                        form.website
                      }
                      tabIndex={-1}
                      autoComplete="off"
                      onChange={(
                        e,
                      ) =>
                        setForm(
                          (
                            current,
                          ) => ({
                            ...current,
                            website:
                              e.target
                                .value,
                          }),
                        )
                      }
                    />
                  </div>

                  <label>
                    <span>
                      Full name *
                    </span>

                    <input
                      type="text"
                      required
                      value={
                        form.name
                      }
                      onChange={(
                        e,
                      ) =>
                        setForm(
                          (
                            current,
                          ) => ({
                            ...current,
                            name:
                              e.target
                                .value,
                          }),
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
                      required
                      value={
                        form.email
                      }
                      onChange={(
                        e,
                      ) =>
                        setForm(
                          (
                            current,
                          ) => ({
                            ...current,
                            email:
                              e.target
                                .value,
                          }),
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
                      onChange={(
                        e,
                      ) =>
                        setForm(
                          (
                            current,
                          ) => ({
                            ...current,
                            phone:
                              e.target
                                .value,
                          }),
                        )
                      }
                    />
                  </label>

                  <fieldset className="event-rsvp-options">
                    <legend>
                      Your response
                    </legend>

                    {(
                      [
                        "yes",
                        "maybe",
                        "no",
                      ] as EventRsvpResponse[]
                    ).map(
                      (
                        response,
                      ) => (
                        <label
                          key={
                            response
                          }
                        >
                          <input
                            type="radio"
                            name="response"
                            value={
                              response
                            }
                            checked={
                              form.response ===
                              response
                            }
                            onChange={() =>
                              setForm(
                                (
                                  current,
                                ) => ({
                                  ...current,
                                  response,
                                }),
                              )
                            }
                          />

                          <span>
                            {response ===
                            "yes"
                              ? "Yes, I'll be there"
                              : response ===
                                  "maybe"
                                ? "Maybe"
                                : "No, I can't attend"}
                          </span>
                        </label>
                      ),
                    )}
                  </fieldset>

                  <label>
                    <span>
                      Number of guests
                    </span>

                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={
                        form.guests
                      }
                      onChange={(
                        e,
                      ) =>
                        setForm(
                          (
                            current,
                          ) => ({
                            ...current,

                            guests:
                              Math.max(
                                1,
                                Number(
                                  e.target
                                    .value,
                                ) ||
                                  1,
                              ),
                          }),
                        )
                      }
                    />
                  </label>

                  <label>
                    <span>
                      Message
                    </span>

                    <textarea
                      rows={4}
                      value={
                        form.message
                      }
                      onChange={(
                        e,
                      ) =>
                        setForm(
                          (
                            current,
                          ) => ({
                            ...current,

                            message:
                              e.target
                                .value,
                          }),
                        )
                      }
                    />
                  </label>

                  {error && (
                    <div className="event-form__error">
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
                        ? "Sending..."
                        : "Send RSVP"}
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
                  RSVP received
                </p>

                <h2>
                  THANK YOU FOR
                  <strong>
                    RESPONDING.
                  </strong>
                </h2>

                <button
                  type="button"
                  onClick={() => {
                    setSuccess(
                      false,
                    );

                    setForm(
                      INITIAL_FORM,
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