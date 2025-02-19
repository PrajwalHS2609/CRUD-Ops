import axios from "axios";
import { useEffect, useState } from "react";
import "./../styles/style.css";
export default function Home() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    getUser();
  }, []);
  const getUser = (e) => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3001/getUser",
    })
      .then((res) => {
        setUserName(res.data.userName);
      })
      .catch((err) => console.log(err));
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully");
    window.location.reload();
  };
  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Welcome to Our Home Page</h1>
        {/* <p class="subtitle">This is a responsive design with light and dark mode support.</p> */}
      </div>
      <h1>Logged in User :{userName}</h1>
      <br />
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
