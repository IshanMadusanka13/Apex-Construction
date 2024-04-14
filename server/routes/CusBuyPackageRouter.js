import express from "express";
import { createCusPackage } from "../controller/CusBuyPackageController.js";

const cusBuyPackageRouter = express.Router();

cusBuyPackageRouter.post("/add", createCusPackage);

export default cusBuyPackageRouter;