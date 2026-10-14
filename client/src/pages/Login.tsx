import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Login.module.css";
import googleIcon from "../assets/google.png";
import headerBg from "../assets/reg5.png";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Invalid email or password");
        return;
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save complete user information
      localStorage.setItem("user", JSON.stringify(data.user));

      // Save user's name separately
      localStorage.setItem("userName", data.user.name);

      console.log("Login successful:", data);

      alert("Login successful!");

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      alert("Unable to connect to the server");
    }
  };
  return (
    <div className={styles.page}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          {/* Blurred Background Image Container */}
          <div className={styles.blurImageWrapper}>
            <img
              src={headerBg}
              alt="Header Background"
              className={styles.blurImage}
            />
          </div>

          {/* Foreground Text Content */}
          <div className={styles.headerContent}>
            <div className={styles.logo}>
              Portfolio<span>Forge</span>
            </div>

            <h1>Welcome Back</h1>

            <p>Login to continue building your professional portfolio.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
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
            <div className={styles.passwordLabel}>
              <label>Password</label>
              <a href="#">Forgot password?</a>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            Login
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

        <p className={styles.registerText}>
          Don't have an account? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
