import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";
import axiosBase from "../../axiosConfig";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axiosBase.post("/users/login", formData);
      localStorage.setItem("token", response.data.token);
      setError("");
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className={styles.loginCard}>
      <h2 className={styles.title}>Login to your account</h2>

      <p className={styles.signupText}>
        Don&apos;t have an account?{" "}
        <span onClick={() => navigate("/register")}>Create a new account</span>
      </p>

      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
        />

        <div className={styles.passwordGroup}>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <span
            className={styles.eye}
            onClick={() => setShowPassword((prev) => !prev)}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </span>
        </div>
        {/* forgot password */}
        <p
          className={styles.forgot}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot password?
        </p>

        <button type="submit" className={styles.submitBtn}>
          Login
        </button>
      </form>

      <p className={styles.create} onClick={() => navigate("/register")}>
        Create an account?
      </p>
    </div>
  );
};

export default SignIn;
