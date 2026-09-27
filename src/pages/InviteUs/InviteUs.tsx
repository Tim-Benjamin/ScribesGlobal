import {
  useState,
  type FormEvent,
} from "react";

import {
  motion,
} from "motion/react";

import {
  submitInvitation,
} from "../../lib/supabase/mutations/invitations";

import "./invite-us.css";

/* =========================================================
   TYPES
========================================================= */

type InvitationForm = {
  name: string;

  email: string;

  phone: string;

  organization: string;

  eventType: string;

  eventDate: string;

  eventTime: string;

  venue: string;

  audienceSize: string;

  duration: string;

  performanceType: string;

  budgetRange: string;

  additionalDetails: string;

  website: string;
};

type SubmitState =
  | "idle"
  | "submitting"
  | "success"
  | "error";

/* =========================================================
   OPTIONS
========================================================= */

const EVENT_TYPES = [
  "Church Service",
  "Conference",
  "Youth Event",
  "Campus Event",
  "Worship Experience",
  "Poetry / Creative Arts Event",
  "Outreach",
  "Corporate Event",
  "Private Event",
  "Other",
];

const PERFORMANCE_TYPES = [
  "Spoken Word",
  "Poetry",
  "Worship",
  "Music",
  "Dance / Khoros",
  "Creative Arts",
  "Full Scribes Experience",
  "Other",
];

const AUDIENCE_SIZES = [
  "Under 50",
  "50 – 100",
  "100 – 250",
  "250 – 500",
  "500 – 1,000",
  "1,000+",
];

const DURATIONS = [
  "Under 15 minutes",
  "15 – 30 minutes",
  "30 – 60 minutes",
  "1 – 2 hours",
  "Full programme",
  "To be discussed",
];

const BUDGET_RANGES = [
  "To be discussed",
  "Below GHS 1,000",
  "GHS 1,000 – 2,500",
  "GHS 2,500 – 5,000",
  "GHS 5,000 – 10,000",
  "Above GHS 10,000",
];

/* =========================================================
   INITIAL FORM
========================================================= */

const INITIAL_FORM: InvitationForm = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  eventType: "",
  eventDate: "",
  eventTime: "",
  venue: "",
  audienceSize: "",
  duration: "",
  performanceType: "",
  budgetRange: "",
  additionalDetails: "",
  website: "",
};

/* =========================================================
   COMPONENT
========================================================= */

export default function InviteUs() {
  const [
    form,
    setForm,
  ] =
    useState<InvitationForm>(
      INITIAL_FORM,
    );

  const [
    submitState,
    setSubmitState,
  ] =
    useState<SubmitState>(
      "idle",
    );

  const [
    error,
    setError,
  ] =
    useState<
      string | null
    >(null);

  /* =======================================================
     UPDATE FIELD
  ======================================================= */

  const updateField = (
    field:
      keyof InvitationForm,

    value:
      string,
  ) => {
    setForm(
      (current) => ({
        ...current,

        [field]:
          value,
      }),
    );
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit =
    async (
      event:
        FormEvent<HTMLFormElement>,
    ) => {
      event.preventDefault();

      if (
        submitState ===
        "submitting"
      ) {
        return;
      }

      setError(null);

      /* ---------------------------------------------------
         VALIDATION
      --------------------------------------------------- */

      if (
        !form.name.trim() ||
        !form.email.trim() ||
        !form.phone.trim() ||
        !form.eventType.trim() ||
        !form.eventDate ||
        !form.venue.trim()
      ) {
        setSubmitState(
          "error",
        );

        setError(
          "Please complete all required fields.",
        );

        return;
      }

      try {
        setSubmitState(
          "submitting",
        );

        await submitInvitation({
          name:
            form.name,

          email:
            form.email,

          phone:
            form.phone,

          organization:
            form.organization,

          event_type:
            form.eventType,

          event_date:
            form.eventDate,

          event_time:
            form.eventTime,

          venue:
            form.venue,

          audience_size:
            form.audienceSize,

          duration:
            form.duration,

          performance_type:
            form.performanceType,

          budget_range:
            form.budgetRange,

          additional_details:
            form.additionalDetails,

          website:
            form.website,
        });

        setSubmitState(
          "success",
        );

        setForm(
          INITIAL_FORM,
        );
      } catch (
        error
      ) {
        console.error(
          "[InviteUs] Submission failed:",
          error,
        );

        setSubmitState(
          "error",
        );

        setError(
          error instanceof
            Error
            ? error.message
            : "Unable to send your invitation request.",
        );
      }
    };

  return (
    <main className="invite-page">
      {/* =================================================
          HERO
      ================================================= */}

      <section className="invite-hero">
        <div className="invite-hero__grid" />

        <div className="invite-hero__signal invite-hero__signal--one" />

        <div className="invite-hero__signal invite-hero__signal--two" />

        <div className="invite-container invite-hero__inner">
          <motion.div
            className="invite-hero__top"
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <span>
              Scribes Global
            </span>

            <span>
              Invitation Request
            </span>
          </motion.div>

          <div className="invite-hero__layout">
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,

                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
            >
              <p className="invite-hero__eyebrow">
                Invite Us
              </p>

              <h1>
                BRING
                <span>
                  SCRIBES
                </span>
                TO YOUR
                <em>
                  SPACE.
                </em>
              </h1>
            </motion.div>

            <motion.div
              className="invite-hero__aside"
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
            >
              <p>
                Planning a church
                service, conference,
                campus gathering or
                creative experience?
                Send us the details
                and tell us how you
                would like Scribes
                Global to be part of
                it.
              </p>

              <div className="invite-hero__steps">
                <div>
                  <span>
                    01
                  </span>

                  <strong>
                    Tell us about
                    the event
                  </strong>
                </div>

                <div>
                  <span>
                    02
                  </span>

                  <strong>
                    Share what you
                    need
                  </strong>
                </div>

                <div>
                  <span>
                    03
                  </span>

                  <strong>
                    We connect with
                    you
                  </strong>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="invite-hero__bottom">
            <span>
              Start your invitation
            </span>

            <span>
              ↓
            </span>
          </div>
        </div>
      </section>

      {/* =================================================
          INTRO
      ================================================= */}

      <section className="invite-intro">
        <div className="invite-container invite-intro__layout">
          <div className="invite-section-label">
            <span>
              01
            </span>

            <p>
              The Invitation
            </p>
          </div>

          <div className="invite-intro__content">
            <h2>
              LET'S CREATE
              <strong>
                SOMETHING MEANINGFUL.
              </strong>
            </h2>

            <p>
              Give us enough
              information to
              understand your event,
              the audience and the
              kind of creative
              ministry experience
              you are looking for.
            </p>
          </div>
        </div>
      </section>

      {/* =================================================
          FORM
      ================================================= */}

      <section
        className="invite-form-section"
        id="invitation-form"
      >
        <div className="invite-container">
          <div className="invite-form-heading">
            <div>
              <span>
                02
              </span>

              <p>
                Event Details
              </p>
            </div>

            <h2>
              TELL US
              <strong>
                EVERYTHING.
              </strong>
            </h2>
          </div>

          {submitState !==
          "success" ? (
            <form
              className="invite-form"
              onSubmit={
                handleSubmit
              }
            >
              {/* ==========================================
                  HONEYPOT
              ========================================== */}

              <div className="invite-form__honeypot">
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

              {/* ==========================================
                  CONTACT
              ========================================== */}

              <fieldset className="invite-form__group">
                <legend>
                  <span>
                    01
                  </span>

                  Your details
                </legend>

                <div className="invite-form__grid">
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
                        event,
                      ) =>
                        updateField(
                          "name",
                          event.target
                            .value,
                        )
                      }
                    />
                  </label>

                  <label>
                    <span>
                      Email address *
                    </span>

                    <input
                      type="email"
                      value={
                        form.email
                      }
                      autoComplete="email"
                      required
                      onChange={(
                        event,
                      ) =>
                        updateField(
                          "email",
                          event.target
                            .value,
                        )
                      }
                    />
                  </label>

                  <label>
                    <span>
                      Phone number *
                    </span>

                    <input
                      type="tel"
                      value={
                        form.phone
                      }
                      autoComplete="tel"
                      required
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
                      Organization
                    </span>

                    <input
                      type="text"
                      value={
                        form.organization
                      }
                      placeholder="Church, school, ministry..."
                      onChange={(
                        event,
                      ) =>
                        updateField(
                          "organization",
                          event.target
                            .value,
                        )
                      }
                    />
                  </label>
                </div>
              </fieldset>

              {/* ==========================================
                  EVENT
              ========================================== */}

              <fieldset className="invite-form__group">
                <legend>
                  <span>
                    02
                  </span>

                  About the event
                </legend>

                <div className="invite-form__grid">
                  <label>
                    <span>
                      Event type *
                    </span>

                    <select
                      value={
                        form.eventType
                      }
                      required
                      onChange={(
                        event,
                      ) =>
                        updateField(
                          "eventType",
                          event.target
                            .value,
                        )
                      }
                    >
                      <option value="">
                        Select event type
                      </option>

                      {EVENT_TYPES.map(
                        (
                          item,
                        ) => (
                          <option
                            key={
                              item
                            }
                            value={
                              item
                            }
                          >
                            {
                              item
                            }
                          </option>
                        ),
                      )}
                    </select>
                  </label>

                  <label>
                    <span>
                      Event date *
                    </span>

                    <input
                      type="date"
                      value={
                        form.eventDate
                      }
                      required
                      onChange={(
                        event,
                      ) =>
                        updateField(
                          "eventDate",
                          event.target
                            .value,
                        )
                      }
                    />
                  </label>

                  <label>
                    <span>
                      Event time
                    </span>

                    <input
                      type="time"
                      value={
                        form.eventTime
                      }
                      onChange={(
                        event,
                      ) =>
                        updateField(
                          "eventTime",
                          event.target
                            .value,
                        )
                      }
                    />
                  </label>

                  <label>
                    <span>
                      Venue *
                    </span>

                    <input
                      type="text"
                      value={
                        form.venue
                      }
                      required
                      placeholder="Venue / city / campus"
                      onChange={(
                        event,
                      ) =>
                        updateField(
                          "venue",
                          event.target
                            .value,
                        )
                      }
                    />
                  </label>

                  <label>
                    <span>
                      Audience size
                    </span>

                    <select
                      value={
                        form.audienceSize
                      }
                      onChange={(
                        event,
                      ) =>
                        updateField(
                          "audienceSize",
                          event.target
                            .value,
                        )
                      }
                    >
                      <option value="">
                        Select audience size
                      </option>

                      {AUDIENCE_SIZES.map(
                        (
                          item,
                        ) => (
                          <option
                            key={
                              item
                            }
                            value={
                              item
                            }
                          >
                            {
                              item
                            }
                          </option>
                        ),
                      )}
                    </select>
                  </label>

                  <label>
                    <span>
                      Expected duration
                    </span>

                    <select
                      value={
                        form.duration
                      }
                      onChange={(
                        event,
                      ) =>
                        updateField(
                          "duration",
                          event.target
                            .value,
                        )
                      }
                    >
                      <option value="">
                        Select duration
                      </option>

                      {DURATIONS.map(
                        (
                          item,
                        ) => (
                          <option
                            key={
                              item
                            }
                            value={
                              item
                            }
                          >
                            {
                              item
                            }
                          </option>
                        ),
                      )}
                    </select>
                  </label>
                </div>
              </fieldset>

              {/* ==========================================
                  EXPERIENCE
              ========================================== */}

              <fieldset className="invite-form__group">
                <legend>
                  <span>
                    03
                  </span>

                  The experience
                </legend>

                <div className="invite-form__grid">
                  <label>
                    <span>
                      Performance type
                    </span>

                    <select
                      value={
                        form.performanceType
                      }
                      onChange={(
                        event,
                      ) =>
                        updateField(
                          "performanceType",
                          event.target
                            .value,
                        )
                      }
                    >
                      <option value="">
                        Select experience
                      </option>

                      {PERFORMANCE_TYPES.map(
                        (
                          item,
                        ) => (
                          <option
                            key={
                              item
                            }
                            value={
                              item
                            }
                          >
                            {
                              item
                            }
                          </option>
                        ),
                      )}
                    </select>
                  </label>

                  <label>
                    <span>
                      Budget range
                    </span>

                    <select
                      value={
                        form.budgetRange
                      }
                      onChange={(
                        event,
                      ) =>
                        updateField(
                          "budgetRange",
                          event.target
                            .value,
                        )
                      }
                    >
                      <option value="">
                        Select budget
                      </option>

                      {BUDGET_RANGES.map(
                        (
                          item,
                        ) => (
                          <option
                            key={
                              item
                            }
                            value={
                              item
                            }
                          >
                            {
                              item
                            }
                          </option>
                        ),
                      )}
                    </select>
                  </label>
                </div>

                <label className="invite-form__textarea">
                  <span>
                    Additional details
                  </span>

                  <textarea
                    rows={7}
                    value={
                      form.additionalDetails
                    }
                    placeholder="Tell us about the programme, theme, expectations, audience and anything else we should know."
                    onChange={(
                      event,
                    ) =>
                      updateField(
                        "additionalDetails",
                        event.target
                          .value,
                      )
                    }
                  />
                </label>
              </fieldset>

              {/* ==========================================
                  ERROR
              ========================================== */}

              {submitState ===
                "error" &&
                error && (
                  <div
                    className="invite-form__error"
                    role="alert"
                  >
                    {error}
                  </div>
                )}

              {/* ==========================================
                  SUBMIT
              ========================================== */}

              <div className="invite-form__footer">
                <p>
                  By submitting this
                  request, you are
                  sharing the event
                  details needed for
                  the Scribes Global
                  team to review your
                  invitation.
                </p>

                <button
                  type="submit"
                  disabled={
                    submitState ===
                    "submitting"
                  }
                >
                  <span>
                    {submitState ===
                    "submitting"
                      ? "Sending invitation..."
                      : "Send invitation"}
                  </span>

                  <span>
                    {submitState ===
                    "submitting"
                      ? "···"
                      : "↗"}
                  </span>
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              className="invite-success"
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <span className="invite-success__icon">
                ✓
              </span>

              <p>
                Invitation submitted
              </p>

              <h2>
                THANK YOU FOR
                <strong>
                  INVITING US.
                </strong>
              </h2>

              <p className="invite-success__copy">
                Your event details
                have been sent to
                Scribes Global for
                review.
              </p>

              <button
                type="button"
                onClick={() =>
                  setSubmitState(
                    "idle",
                  )
                }
              >
                Send another invitation
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* =================================================
          FINAL
      ================================================= */}

      <section className="invite-final">
        <div className="invite-final__rings">
          <span />
          <span />
          <span />
        </div>

        <div className="invite-container invite-final__inner">
          <span>
            Faith Through Creativity
          </span>

          <h2>
            YOUR STAGE.
            <strong>
              HIS MESSAGE.
            </strong>
          </h2>

          <p>
            Whatever the space,
            our desire remains the
            same — to communicate
            Jesus Christ through
            creative expression.
          </p>
        </div>
      </section>
    </main>
  );
}