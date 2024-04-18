import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage.js";
import Home from "../pages/Home.js";
import Login from "../pages/UserManagement/Login.js";
import Signup from "../pages/UserManagement/SignUp.js";
import UserDashboard from "../pages/UserManagement/UserDashboard.js";
import Feedbacks from "../pages/FeedbackManagement/Feedback.js";
import Complaints from "../pages/FeedbackManagement/Complaint.js";
import Contactus from "../pages/FeedbackManagement/Contactus.js";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        {/* User Management Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/feedback" element={<Feedbacks />} />
        <Route path="/complaint" element={<Complaints />} />
        <Route path="/contactus" element={<Contactus />} />


        {/* General Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/error/" element={<ErrorPage />} />
        <Route path="/" element={<Home />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
