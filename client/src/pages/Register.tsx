import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Register.module.css";
import googleIcon from "../assets/google.png";
import registerImage from "../assets/reg5.png";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log("Registration successful:", data);

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save user information
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Registration successful!");

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);

      alert("Unable to connect to the server");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.registerCard}>
        {/* ================= LEFT IMAGE SECTION ================= */}

        <div className={styles.leftSection}>
          <img
            src={registerImage}
            alt="Portfolio design"
            className={styles.backgroundImage}
          />

          <div className={styles.imageOverlay}></div>

          {/* Glass Card */}
          <div className={styles.glassCard}>
            <div className={styles.glassBadge}>✦ CREATE YOUR STORY</div>

            <h1>
              Join <span>PortfolioForge</span>
            </h1>

            <p>
              Create your professional portfolio, showcase your work, and build
              your online presence.
            </p>

            <div className={styles.features}>
              <div>
                <span className={styles.check}>✓</span>
                <span>Build a professional portfolio</span>
              </div>

              <div>
                <span className={styles.check}>✓</span>
                <span>Choose from multiple templates</span>
              </div>

              <div>
                <span className={styles.check}>✓</span>
                <span>Share your portfolio with one link</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT FORM SECTION ================= */}

        <div className={styles.rightSection}>
          <h2>Create Account</h2>

          <p className={styles.subtitle}>
            Start building your professional identity
          </p>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Confirm Password</label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className={styles.registerButton}>
              Create Account
            </button>

            <div className={styles.divider}>
              <span>or</span>
            </div>

            <button
              type="button"
              className={styles.googleButton}
              onClick={() => console.log("Google login clicked")}
            >
              <img
                src={googleIcon}
                alt="Google logo"
                className={styles.googleIconImage}
                loading="eager"
              />
              Continue with Google
            </button>
          </form>

          <p className={styles.loginText}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
