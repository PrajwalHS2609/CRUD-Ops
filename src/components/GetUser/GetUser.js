import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GetUser.css";
import { useNavigate } from "react-router-dom";

const GetUser = () => {
  const [users, setUsers] = useState([]); // State to store fetched users
  const navigate = useNavigate();
  // Function to fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/get-user", {
        withCredentials: true,
      });

      setUsers(response.data); // Store fetched data in state
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdate = (userId) => {
    navigate(`/update-user/${userId}`);
    console.log(`Update user with ID: ${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/get-user/${userId}`, {
        withCredentials: true,
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      alert("User deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting");
    }
  };
  return (
    <div className="getUser-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th className="table-header">ID</th>
            <th className="table-header">Username</th>
            <th className="table-header">Password</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>
                  <button onClick={() => handleUpdate(user.id)}>Update</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GetUser;
