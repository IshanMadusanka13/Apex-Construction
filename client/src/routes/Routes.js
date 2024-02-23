import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.js";
import Login from "../pages/Login.js";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        {/* User Management Routes */}
        <Route path="/login" element={<Login />} />

        {/* General Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
