import { useState } from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  NavLink,
  useLocation,
} from "react-router-dom";

import {
  NAVIGATION_ITEMS,
  SITE_NAME,
} from "../../lib/constants";

import { useHaptics } from "../../hooks/useHaptics";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const location = useLocation();

  const { light } = useHaptics();

  const toggleMenu = () => {
    light();
    setOpen((current) => !current);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <motion.header
        className="site-navbar"
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="navbar-inner">
          <NavLink
            to="/"
            className="navbar-logo"
            onClick={closeMenu}
          >
            <span className="navbar-logo-mark">
              S
            </span>

            <span>{SITE_NAME}</span>
          </NavLink>

          <button
            type="button"
            className={`menu-toggle ${
              open ? "is-open" : ""
            }`}
            onClick={toggleMenu}
            aria-label={
              open
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="navigation-overlay"
            initial={{
              clipPath: "inset(0 0 100% 0)",
            }}
            animate={{
              clipPath: "inset(0 0 0% 0)",
            }}
            exit={{
              clipPath: "inset(0 0 100% 0)",
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="navigation-overlay-inner">
              <div className="navigation-header">
                <span>
                  Scribes Global
                </span>

                <span>
                  Navigation
                </span>
              </div>

              <nav className="navigation-menu">
                {NAVIGATION_ITEMS.map(
                  (item, index) => {
                    const active =
                      location.pathname === item.path;

                    return (
                      <motion.div
                        key={item.path}
                        initial={{
                          opacity: 0,
                          y: 40,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: 20,
                        }}
                        transition={{
                          delay:
                            0.2 +
                            index * 0.045,
                          duration: 0.6,
                          ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                          ],
                        }}
                      >
                        <NavLink
                          to={item.path}
                          onClick={() => {
                            light();
                            closeMenu();
                          }}
                          className={
                            active
                              ? "navigation-link is-active"
                              : "navigation-link"
                          }
                        >
                          <span className="navigation-index">
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <span className="navigation-link-text">
                            {item.label}
                          </span>
                        </NavLink>
                      </motion.div>
                    );
                  }
                )}
              </nav>

              <div className="navigation-footer">
                <span>
                  Faith · Creativity · Purpose ·
                  Community
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}