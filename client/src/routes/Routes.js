import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.js";
import CustomerProfile from "../pages/UserManagement/CustomerProfile.js";
import EmployeeProfile from "../pages/UserManagement/EmployeeProfile.js";
import Login from "../pages/UserManagement/Login.js";
import Signup from "../pages/UserManagement/SignUp.js";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        {/* User Management Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/employeeprofile" element={<EmployeeProfile /> } />
        <Route path="/customerprofile" element={<CustomerProfile /> } />

        {/* General Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
