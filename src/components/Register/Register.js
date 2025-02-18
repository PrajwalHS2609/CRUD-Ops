import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [registerUserName, setRegisterUserName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    try {
      let payload = {
        username: registerUserName,
        password: registerPassword,
      };
  
      await axios.post("http://localhost:3001/register", payload, {
        withCredentials: true,
      });
  
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };
  

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-title">Register</h2>
        <form onSubmit={register}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              className="form-input"
              type="text"
              id="username"
              required
              onChange={(e) => setRegisterUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input className="form-input" type="email" id="email" required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-input"
              type="password"
              id="password"
              required
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
          </div>
          <button className="submit-button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
