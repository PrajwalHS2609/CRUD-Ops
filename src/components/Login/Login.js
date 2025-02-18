import axios from "axios";
import React, { useState } from "react";
import "./../styles/style.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // const [error, setError] = useState("");
  // const [captchaValue, setCaptchaValue] = useState("");
  // const [generatedCaptcha, setGeneratedCaptcha] = useState("");

  const login = async (e) => {
    e.preventDefault();
    const payload = {
      username: loginUserName,
      password: loginPassword,
    };
    await axios
      .post("http://localhost:3001/login", payload, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data === "User not found") {
          alert("Invalid username or password.");
        } else {
          console.log(res);
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Login error:", err.message);
        alert("Login failed. Please check your connection and try again.");
      });
  };

  // Generate captcha when the component mounts
  // React.useEffect(() => {
  //   generateCaptcha();
  // }, []);

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={login}>
          <div className="input-group">
            <label htmlFor="name" className="input-label">
              UserName
            </label>
            <input
              type="name"
              id="name"
              onChange={(e) => setLoginUserName(e.target.value)}
              className="input-field"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setLoginPassword(e.target.value)}
              className="input-field"
              placeholder="********"
              required
            />
          </div>

          {/* {error && <p className="error-message">{error}</p>} */}
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
        <p className="signup-prompt">
          Don't have an account?{" "}
          <a href="/signup" className="signup-link">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
