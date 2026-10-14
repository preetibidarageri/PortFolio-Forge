import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Nav.module.css";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check whether user is logged in
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    closeMenu();
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          Portfolio<span>Forge</span>
        </Link>

        {/* Navigation */}
        <div
          className={`${styles.navLinks} ${
            menuOpen ? styles.navLinksOpen : ""
          }`}
        >
          <Link to="/" className={styles.navLink} onClick={closeMenu}>
            Home
          </Link>

          <Link to="/templates" className={styles.navLink} onClick={closeMenu}>
            Templates
          </Link>

          {isLoggedIn ? (
            <>
              {/* Dashboard */}
              <Link
                to="/dashboard"
                className={styles.navLink}
                onClick={closeMenu}
              >
                Dashboard
              </Link>

              {/* Profile */}
              <Link
                to="/profile"
                className={styles.navLink}
                onClick={closeMenu}
              >
                Profile
              </Link>

              {/* Logout */}
              <button
                className={`${styles.navLink} ${styles.loginBtn}`}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                to="/login"
                className={`${styles.navLink} ${styles.loginBtn}`}
                onClick={closeMenu}
              >
                Login
              </Link>

              {/* Register */}
              <Link
                to="/register"
                className={`${styles.navLink} ${styles.registerBtn}`}
                onClick={closeMenu}
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className={menuOpen ? styles.line1Open : ""}></span>
          <span className={menuOpen ? styles.line2Open : ""}></span>
          <span className={menuOpen ? styles.line3Open : ""}></span>
        </button>
      </div>
    </nav>
  );
}

export default Nav;
