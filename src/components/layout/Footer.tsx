import { NavLink } from "react-router-dom";
import { SITE_NAME } from "../../lib/constants";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <p className="footer-eyebrow">
              Creative Arts Ministry
            </p>

            <h2 className="footer-title">
              Create.
              <br />
              Connect.
              <br />
              Impact.
            </h2>
          </div>

          <div className="footer-navigation">
            <NavLink to="/about">About</NavLink>
            <NavLink to="/ministries">Ministries</NavLink>
            <NavLink to="/events">Events</NavLink>
            <NavLink to="/media">Media</NavLink>
            <NavLink to="/invite-us">Invite Us</NavLink>
            <NavLink to="/volunteer">Volunteer</NavLink>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {SITE_NAME}</span>

          <span>
            Faith · Creativity · Purpose · Community
          </span>
        </div>
      </div>
    </footer>
  );
}