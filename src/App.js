import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login.js";
import Register from "./components/Register/Register.js";
import Home from "./components/Home/Home.js";
import GetUser from "./components/GetUser/GetUser.js";
import Update from "./components/Update/Update.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/get-user" element={<GetUser />} />
          <Route path="/update-user/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
