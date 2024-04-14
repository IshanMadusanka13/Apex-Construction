import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage.js";
import Home from "../pages/Home.js";
import Login from "../pages/UserManagement/Login.js";
import Signup from "../pages/UserManagement/SignUp.js";
import UserDashboard from "../pages/UserManagement/UserDashboard.js";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        {/* User Management Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userDashboard" element={<UserDashboard />} />

        {/* General Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/error/" element={<ErrorPage />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
