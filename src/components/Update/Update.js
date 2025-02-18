import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const [updateUserName, setUpdateUserName] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const navigate = useNavigate();

  const update = async (x) => {
    x.preventDefault();
    if (!id) {
      alert("Please provide user ID");
      return;
    }
    try {
      const payload = {
        username: updateUserName,
        password: updatePassword,
      };
      await axios.put(`http://localhost:3001/update-user/${id}`, payload, {
        withCredentials: true,
      });
      alert("User updated successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      // setError("Failed to update user")
    }
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Update</h2>
        <form onSubmit={update}>
          <div className="input-group">
            <label htmlFor="name" className="input-label">
              UserName
            </label>
            <input
              type="name"
              id="name"
              onChange={(e) => setUpdateUserName(e.target.value)}
              className="input-field"
              placeholder="User Name"
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
              onChange={(e) => setUpdatePassword(e.target.value)}
              className="input-field"
              placeholder="********"
              required
            />
          </div>

          {/* {error && <p className="error-message">{error}</p>} */}
          <button type="submit" className="submit-button">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
