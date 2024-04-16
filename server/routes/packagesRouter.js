import express from "express";
import {
  createPackage,
  deletePackage,
  getAllPackages,
  getPackageById,
  updatePackage,
} from "../controller/packageController.js";
import { createCusPackage } from "../controller/CusBuyPackageController.js";

const packagesRouter = express.Router();

packagesRouter.post("/add", createPackage);
packagesRouter.get("/getall", getAllPackages);
packagesRouter.get("/get/:id", getPackageById);
packagesRouter.put("/update", updatePackage);
packagesRouter.delete("/delete/:id", deletePackage);

packagesRouter.post("/buy", createCusPackage);

export default packagesRouter;