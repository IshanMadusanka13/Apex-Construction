import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const userTypes = {
  ADMIN: 'admin',
  CUSTOMER: "customer",
  EMPLOYEE: "employee",
  HR_MANAGER: "hr manager",
  FINANCE_MANAGER: "finance manager",
  FLEET_MANAGER: "fleet manager",
  INVENTORY_CONTROLLER: "inventory controller",
  SITE_MANAGER: "site manager",
  PROJECT_MANAGER: "project manager",
  CUSTOMER_RELATIONSHIP_MANAGER: "customer relationship manager",
  DRIVER: "driver",
  WORKER: "worker"
};

export const packageTypes = {
  Gold: 'gold',
  Silver: "silver",
  Modern: "modern",
  Budget: "budget",
};

export const billers = {
  WATER: 'Water',
  ELECTRICITY: "Electricity",
  MOBILE: "Mobile",
};

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

export function timedSuccessAlert(content) {
  Toast.fire({
    icon: "success",
    title: content
  });
}

export function errorAlert(content) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: content,
    confirmButtonColor: "#ff5200"
  });
}

export function successAlert(content) {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: content,
    confirmButtonColor: "#ff5200"
  });
}

export function addRequestHeaders(loggedUser) {
  return (config) => {
    const userID = loggedUser && loggedUser._id;
    const userType = loggedUser && loggedUser.userType;
    if (userID) {
      config.headers['UserID'] = userID;
      config.headers['UserType'] = userType;
    }
    return config;
  };
};

