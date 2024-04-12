import express from "express";
import {
    createPackageAddon,
    updatePackageAddon,
    deletePackageAddon,
    getAllPackageAddons,
    getPackageAddonById,
} from "../controller/packageAddonController.js";

const packagesRouter = express.Router();

packagesRouter.post("/addAddOns", createPackageAddon);

// packagesRouter.get("/allApprovedPackages",getAllApprovedPackages);

packagesRouter.get("/getAllAddOns", getAllPackageAddons);

// packagesRouter.get("/getAllAprovedPackages", getAllApprovedPackages);

packagesRouter.get("/getAddOnsById/:id", getPackageAddonById);

// packagesRouter.put("/approvePackage", approvePackage);
// packagesRouter.get("/getUnapprovedPackages", getUnapprovedPackages);
packagesRouter.put("/updateAddOns", updatePackageAddon);
packagesRouter.delete("/deleteAddOns", deletePackageAddon);

export default packagesRouter;