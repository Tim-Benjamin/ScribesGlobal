import {
  useMemo,
  useState,
  type FormEvent,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  useVolunteerOpportunities,
} from "../../hooks/useVolunteerOpportunities";

import {
  applyVolunteer,
} from "../../lib/supabase/mutations/volunteer";

import type {
  VolunteerOpportunity,
} from "../../lib/supabase/queries/volunteer";

import "./volunteer.css";

/* =========================================================
   TYPES
========================================================= */

type VolunteerForm = {
  firstName: string;

  lastName: string;

  email: string;

  phone: string;

  availability: string;

  skills: string;

  motivation: string;

  chapter: string;

  website: string;
};

type SubmitState =
  | "idle"
  | "submitting"
  | "success"
  | "error";

/* =========================================================
   INITIAL FORM
========================================================= */

const INITIAL_FORM: VolunteerForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  availability: "",
  skills: "",
  motivation: "",
  chapter: "",
  website: "",
};

/* =========================================================
   HELPERS
========================================================= */

function formatOpportunityLabel(
  value?: string | null,
) {
  if (!value) {
    return "";
  }

  return value
    .replace(/_/g, " ")
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase(),
    );
}

/* =========================================================
   PAGE
========================================================= */

export default function Volunteer() {
  const {
    opportunities,
    loading,
    error,
    refetch,
  } =
    useVolunteerOpportunities();

  const [
    selectedOpportunity,
    setSelectedOpportunity,
  ] =
    useState<VolunteerOpportunity | null>(
      null,
    );

  const [
    formOpen,
    setFormOpen,
  ] =
    useState(false);

  const [
    form,
    setForm,
  ] =
    useState<VolunteerForm>(
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
    submitError,
    setSubmitError,
  ] =
    useState<
      string | null
    >(null);

  /* =======================================================
     COUNTS
  ======================================================= */

  const departments =
    useMemo(
      () =>
        new Set(
          opportunities.map(
            (item) =>
              item.department,
          ),
        ).size,
      [opportunities],
    );

  const totalNeeded =
    useMemo(
      () =>
        opportunities.reduce(
          (
            total,
            item,
          ) =>
            total +
            (item.volunteers_needed ??
              0),
          0,
        ),
      [opportunities],
    );

  /* =======================================================
     FORM
  ======================================================= */

  const updateField = (
    field:
      keyof VolunteerForm,
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

  const openApplication = (
    opportunity?:
      VolunteerOpportunity,
  ) => {
    setSelectedOpportunity(
      opportunity ?? null,
    );

    setSubmitState(
      "idle",
    );

    setSubmitError(
      null,
    );

    setFormOpen(
      true,
    );
  };

  const closeApplication =
    () => {
      setFormOpen(
        false,
      );

      setSelectedOpportunity(
        null,
      );

      setSubmitError(
        null,
      );

      setSubmitState(
        "idle",
      );
    };

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

      setSubmitError(
        null,
      );

      if (
        !form.firstName.trim() ||
        !form.lastName.trim() ||
        !form.email.trim() ||
        !form.phone.trim() ||
        !form.availability.trim() ||
        !form.skills.trim() ||
        !form.motivation.trim()
      ) {
        setSubmitState(
          "error",
        );

        setSubmitError(
          "Please complete all required fields.",
        );

        return;
      }

      try {
        setSubmitState(
          "submitting",
        );

        await applyVolunteer({
          opportunity_id:
            selectedOpportunity?.id ??
            null,

          first_name:
            form.firstName,

          last_name:
            form.lastName,

          email:
            form.email,

          phone:
            form.phone,

          availability:
            form.availability,

          skills:
            form.skills,

          motivation:
            form.motivation,

          chapter:
            form.chapter,

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
          "[Volunteer] Application failed:",
          error,
        );

        setSubmitState(
          "error",
        );

        setSubmitError(
          error instanceof
            Error
            ? error.message
            : "Unable to submit your application.",
        );
      }
    };

  return (
    <main className="volunteer-page">
      {/* =================================================
          HERO
      ================================================= */}

      <section className="volunteer-hero">
        <div className="volunteer-hero__grid" />

        <div className="volunteer-hero__orb volunteer-hero__orb--one" />

        <div className="volunteer-hero__orb volunteer-hero__orb--two" />

        <div className="volunteer-container volunteer-hero__inner">
          <motion.div
            className="volunteer-hero__top"
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <span>
              Scribes Global
            </span>

            <span>
              Join / Volunteer
            </span>
          </motion.div>

          <div className="volunteer-hero__layout">
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
              <p className="volunteer-hero__eyebrow">
                Volunteer
              </p>

              <h1>
                BRING
                <span>
                  WHAT YOU
                </span>
                CARRY.
              </h1>
            </motion.div>

            <motion.div
              className="volunteer-hero__aside"
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
                Use your gifts,
                skills, time and
                creativity to serve
                the mission of
                Scribes Global.
              </p>

              <button
                type="button"
                onClick={() =>
                  openApplication()
                }
                className="volunteer-hero__cta"
              >
                <span>
                  Volunteer with us
                </span>

                <span>
                  ↗
                </span>
              </button>
            </motion.div>
          </div>

          <div className="volunteer-hero__bottom">
            <span>
              Discover where you can serve
            </span>

            <span>
              ↓
            </span>
          </div>
        </div>
      </section>

      {/* =================================================
          PURPOSE
      ================================================= */}

      <section className="volunteer-purpose">
        <div className="volunteer-container volunteer-purpose__layout">
          <div className="volunteer-section-label">
            <span>
              01
            </span>

            <p>
              Serve
            </p>
          </div>

          <div className="volunteer-purpose__content">
            <h2>
              THERE IS
              <strong>
                ROOM FOR YOUR GIFT.
              </strong>
            </h2>

            <p>
              Scribes Global is built
              by people who make their
              abilities available for
              ministry — from media and
              writing to prayer,
              worship, events and
              creative expression.
            </p>

            <div className="volunteer-purpose__principles">
              <div>
                <span>
                  01
                </span>

                <strong>
                  Serve with purpose
                </strong>

                <p>
                  Your contribution
                  should strengthen
                  the mission, not
                  simply fill a role.
                </p>
              </div>

              <div>
                <span>
                  02
                </span>

                <strong>
                  Grow in community
                </strong>

                <p>
                  Serving happens
                  alongside people,
                  not in isolation.
                </p>
              </div>

              <div>
                <span>
                  03
                </span>

                <strong>
                  Create with excellence
                </strong>

                <p>
                  Bring your skills,
                  creativity and
                  willingness to learn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          OPPORTUNITIES
      ================================================= */}

      <section className="volunteer-opportunities">
        <div className="volunteer-container">
          <div className="volunteer-heading">
            <div>
              <span>
                02
              </span>

              <p>
                Open Opportunities
              </p>
            </div>

            <h2>
              FIND WHERE
              <strong>
                YOU FIT.
              </strong>
            </h2>
          </div>

          {/* ===============================================
              LOADING
          =============================================== */}

          {loading && (
            <div
              className="volunteer-loading"
              aria-busy="true"
            >
              {Array.from({
                length: 4,
              }).map(
                (
                  _,
                  index,
                ) => (
                  <div
                    key={
                      index
                    }
                    className="volunteer-loading__card"
                  >
                    <span />
                    <span />
                    <span />
                  </div>
                ),
              )}
            </div>
          )}

          {/* ===============================================
              ERROR
          =============================================== */}

          {!loading &&
            error && (
              <div className="volunteer-opportunities__state">
                <span>
                  Connection issue
                </span>

                <h3>
                  Opportunities couldn't
                  be loaded.
                </h3>

                <p>
                  {error}
                </p>

                <button
                  type="button"
                  onClick={
                    refetch
                  }
                >
                  Try again ↻
                </button>
              </div>
            )}

          {/* ===============================================
              EMPTY
          =============================================== */}

          {!loading &&
            !error &&
            opportunities.length ===
              0 && (
              <div className="volunteer-opportunities__state">
                <span>
                  No openings right now
                </span>

                <h3>
                  YOU CAN STILL
                  <strong>
                    RAISE YOUR HAND.
                  </strong>
                </h3>

                <p>
                  There are currently no
                  public volunteer
                  opportunities listed,
                  but you can still send
                  us your skills and
                  availability.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    openApplication()
                  }
                >
                  General volunteer application
                </button>
              </div>
            )}

          {/* ===============================================
              SUCCESS
          =============================================== */}

          {!loading &&
            !error &&
            opportunities.length >
              0 && (
              <>
                <div className="volunteer-opportunities__summary">
                  <div>
                    <strong>
                      {String(
                        opportunities.length,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </strong>

                    <span>
                      Open roles
                    </span>
                  </div>

                  <div>
                    <strong>
                      {String(
                        departments,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </strong>

                    <span>
                      Teams
                    </span>
                  </div>

                  <div>
                    <strong>
                      {String(
                        totalNeeded,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </strong>

                    <span>
                      People needed
                    </span>
                  </div>
                </div>

                <div className="volunteer-opportunities__list">
                  {opportunities.map(
                    (
                      opportunity,
                      index,
                    ) => (
                      <motion.article
                        key={
                          opportunity.id
                        }
                        className="volunteer-role"
                        initial={{
                          opacity: 0,
                          y: 25,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          delay:
                            Math.min(
                              index *
                                0.04,
                              0.2,
                            ),
                        }}
                      >
                        <div className="volunteer-role__number">
                          {String(
                            index +
                              1,
                          ).padStart(
                            2,
                            "0",
                          )}
                        </div>

                        <div className="volunteer-role__main">
                          <div className="volunteer-role__meta">
                            <span>
                              {
                                opportunity.department
                              }
                            </span>

                            {opportunity.urgency && (
                              <span
                                className={`volunteer-role__urgency volunteer-role__urgency--${opportunity.urgency.toLowerCase()}`}
                              >
                                {formatOpportunityLabel(
                                  opportunity.urgency,
                                )}
                              </span>
                            )}
                          </div>

                          <h3>
                            {
                              opportunity.title
                            }
                          </h3>

                          <p>
                            {
                              opportunity.description
                            }
                          </p>

                          {opportunity.requirements && (
                            <div className="volunteer-role__requirements">
                              <span>
                                What helps
                              </span>

                              <p>
                                {
                                  opportunity.requirements
                                }
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="volunteer-role__aside">
                          <div>
                            <span>
                              Commitment
                            </span>

                            <strong>
                              {opportunity.time_commitment ||
                                "Flexible"}
                            </strong>
                          </div>

                          <div>
                            <span>
                              Location
                            </span>

                            <strong>
                              {formatOpportunityLabel(
                                opportunity.location_type,
                              ) ||
                                "Flexible"}
                            </strong>
                          </div>

                          <div>
                            <span>
                              Needed
                            </span>

                            <strong>
                              {opportunity.volunteers_needed ??
                                1}
                            </strong>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              openApplication(
                                opportunity,
                              )
                            }
                          >
                            <span>
                              Apply
                            </span>

                            <span>
                              ↗
                            </span>
                          </button>
                        </div>
                      </motion.article>
                    ),
                  )}
                </div>
              </>
            )}
        </div>
      </section>

      {/* =================================================
          FINAL CTA
      ================================================= */}

      <section className="volunteer-final">
        <div className="volunteer-final__rings">
          <span />
          <span />
          <span />
        </div>

        <div className="volunteer-container volunteer-final__inner">
          <span>
            Join the Family
          </span>

          <h2>
            DON'T JUST
            <strong>
              WATCH THE MOVEMENT.
            </strong>
            BUILD IT.
          </h2>

          <p>
            Whether you already see
            the perfect role or simply
            know you want to serve,
            tell us what you carry.
          </p>

          <button
            type="button"
            onClick={() =>
              openApplication()
            }
          >
            <span>
              Start an application
            </span>

            <span>
              ↗
            </span>
          </button>
        </div>
      </section>

      {/* =================================================
          APPLICATION MODAL
      ================================================= */}

      <AnimatePresence>
        {formOpen && (
          <motion.div
            className="volunteer-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Volunteer application"
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
              closeApplication
            }
          >
            <motion.div
              className="volunteer-modal__panel"
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
              exit={{
                opacity: 0,
                y: 30,
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
                className="volunteer-modal__close"
                onClick={
                  closeApplication
                }
                aria-label="Close"
              >
                ×
              </button>

              {submitState !==
              "success" ? (
                <>
                  <header className="volunteer-modal__header">
                    <span>
                      Volunteer Application
                    </span>

                    <h2>
                      {selectedOpportunity
                        ? selectedOpportunity.title
                        : "Join the Scribes Team"}
                    </h2>

                    {selectedOpportunity ? (
                      <p>
                        {
                          selectedOpportunity.department
                        }
                        {" · "}
                        {formatOpportunityLabel(
                          selectedOpportunity.location_type,
                        )}
                      </p>
                    ) : (
                      <p>
                        Tell us how you
                        would like to
                        serve.
                      </p>
                    )}
                  </header>

                  <form
                    className="volunteer-form"
                    onSubmit={
                      handleSubmit
                    }
                  >
                    {/* Honeypot */}

                    <div className="volunteer-form__honeypot">
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
                    </div>

                    <div className="volunteer-form__row">
                      <label>
                        <span>
                          First name *
                        </span>

                        <input
                          type="text"
                          value={
                            form.firstName
                          }
                          autoComplete="given-name"
                          required
                          onChange={(
                            event,
                          ) =>
                            updateField(
                              "firstName",
                              event.target
                                .value,
                            )
                          }
                        />
                      </label>

                      <label>
                        <span>
                          Last name *
                        </span>

                        <input
                          type="text"
                          value={
                            form.lastName
                          }
                          autoComplete="family-name"
                          required
                          onChange={(
                            event,
                          ) =>
                            updateField(
                              "lastName",
                              event.target
                                .value,
                            )
                          }
                        />
                      </label>
                    </div>

                    <div className="volunteer-form__row">
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
                          Phone *
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
                    </div>

                    <label>
                      <span>
                        Chapter
                      </span>

                      <input
                        type="text"
                        value={
                          form.chapter
                        }
                        placeholder="e.g. Accra / Legon Chapter"
                        onChange={(
                          event,
                        ) =>
                          updateField(
                            "chapter",
                            event.target
                              .value,
                          )
                        }
                      />
                    </label>

                    <label>
                      <span>
                        Availability *
                      </span>

                      <textarea
                        rows={4}
                        value={
                          form.availability
                        }
                        required
                        placeholder="Tell us the days, times or hours you can realistically commit."
                        onChange={(
                          event,
                        ) =>
                          updateField(
                            "availability",
                            event.target
                              .value,
                          )
                        }
                      />
                    </label>

                    <label>
                      <span>
                        Skills *
                      </span>

                      <textarea
                        rows={4}
                        value={
                          form.skills
                        }
                        required
                        placeholder="Tell us the skills, experience or abilities you can bring."
                        onChange={(
                          event,
                        ) =>
                          updateField(
                            "skills",
                            event.target
                              .value,
                          )
                        }
                      />
                    </label>

                    <label>
                      <span>
                        Why do you want to serve? *
                      </span>

                      <textarea
                        rows={5}
                        value={
                          form.motivation
                        }
                        required
                        placeholder="Share your motivation for volunteering with Scribes Global."
                        onChange={(
                          event,
                        ) =>
                          updateField(
                            "motivation",
                            event.target
                              .value,
                          )
                        }
                      />
                    </label>

                    {submitState ===
                      "error" &&
                      submitError && (
                        <div
                          className="volunteer-form__error"
                          role="alert"
                        >
                          {
                            submitError
                          }
                        </div>
                      )}

                    <button
                      type="submit"
                      className="volunteer-form__submit"
                      disabled={
                        submitState ===
                        "submitting"
                      }
                    >
                      <span>
                        {submitState ===
                        "submitting"
                          ? "Sending application..."
                          : "Send application"}
                      </span>

                      <span>
                        {submitState ===
                        "submitting"
                          ? "···"
                          : "↗"}
                      </span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="volunteer-success">
                  <span className="volunteer-success__icon">
                    ✓
                  </span>

                  <p>
                    Application submitted
                  </p>

                  <h2>
                    THANK YOU FOR
                    <strong>
                      RAISING YOUR HAND.
                    </strong>
                  </h2>

                  <p className="volunteer-success__copy">
                    Your volunteer
                    application has
                    been submitted for
                    review.
                  </p>

                  <button
                    type="button"
                    onClick={
                      closeApplication
                    }
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}