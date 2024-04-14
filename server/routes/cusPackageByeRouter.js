import express from "express";
import { createCusPackage } from "../controller/CusPackageByeController";

const cusPackageByeRouter = express.Router();

cusPackageByeRouter.post("/add", createCusPackage);

export default cusPackageByeRouter;