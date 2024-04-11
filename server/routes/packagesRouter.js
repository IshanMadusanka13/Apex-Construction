import express from "express";
import {
  // approvePackage,
  // approvePackage,
  createPackage,
  deletePackage,
  // getAllApprovedPackages,
  // getAllApprovedPackages,
  getAllPackages,
  getPackageById,
  // getUnapprovedPackages,
  // getUnapprovedPackages,
  updatePackage,
} from "../controller/packageController.js";

const packagesRouter = express.Router();

packagesRouter.post("/add", createPackage);
packagesRouter.get("/getall", getAllPackages);
packagesRouter.get("/get/:id", getPackageById);
packagesRouter.put("/update", updatePackage);
packagesRouter.delete("/delete/:id", deletePackage);

// packagesRouter.get("/allApprovedPackages",getAllApprovedPackages);
//packagesRouter.get("/getAllAprovedPackages", getAllApprovedPackages);
//packagesRouter.put("/approvePackage", approvePackage);
//packagesRouter.get("/getUnapprovedPackages", getUnapprovedPackages);


export default packagesRouter;
