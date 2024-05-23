import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "../Pages/HomePage/homePage";
import LandingPage from "../Pages/UserAuthentication/userAuthentication";
import Register from "./userRegistration";

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <LandingPage onLogin={handleLogin} onRegister={handleRegister} />
        }
      />
      <Route path="/register" element={<Register onLogin={handleLogin} />} />
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <HomePage />
          ) : (
            <LandingPage onLogin={handleLogin} onRegister={handleRegister} />
          )
        }
      />
    </Routes>
  );
}

export default Navigation;
