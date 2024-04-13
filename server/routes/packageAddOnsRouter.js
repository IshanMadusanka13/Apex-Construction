import express from "express";
import {
    createPackageAddon,
    updatePackageAddon,
    deletePackageAddon,
    getAllPackageAddons,
    getPackageAddonById,
} from "../controller/PackageAddonController.js";

const packageAddOnRouter = express.Router();

packageAddOnRouter.post("/add", createPackageAddon);
packageAddOnRouter.get("/getall", getAllPackageAddons);
packageAddOnRouter.get("/getbyid/:id", getPackageAddonById);
packageAddOnRouter.put("/update", updatePackageAddon);
packageAddOnRouter.delete("/delete", deletePackageAddon);

// packagesRouter.get("/getAllAprovedPackages", getAllApprovedPackages);
// packagesRouter.get("/allApprovedPackages",getAllApprovedPackages);
// packagesRouter.put("/approvePackage", approvePackage);
// packagesRouter.get("/getUnapprovedPackages", getUnapprovedPackages);

export default packageAddOnRouter;