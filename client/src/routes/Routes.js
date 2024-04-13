import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage.js";
import Home from "../pages/Home.js";
import Login from "../pages/UserManagement/Login.js";
import Signup from "../pages/UserManagement/SignUp.js";
import UserDashboard from "../pages/UserManagement/UserDashboard.js";
import UpdatePackage from "../pages/PackageManagement/UpdatePackage.js";
import Packagelist from "../pages/PackageManagement/CusViwePackage.js";
import CusPackageDetails from "../pages/PackageManagement/CusPackageDetails.js";
import AddNewPackage from "../pages/PackageManagement/AddPackage.js";
import ViewPackage from "../pages/PackageManagement/ViewPackage.js";
import AddAddOns from "../pages/PackageManagement/AddAddOns.js";

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

        {/* Package Managemenet */}
        <Route path="/updatePackage/:packageId" element={<UpdatePackage />} />
        <Route path="/packages" element={<Packagelist />}/>
        <Route path="/CuspackageDetais/:packageId" element={<CusPackageDetails />} />
        <Route path="/AddPackage" element={<AddNewPackage />} />
        <Route path="/viwePackage" element={<ViewPackage />} />
        <Route path="/addAddOns" element={<AddAddOns />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
