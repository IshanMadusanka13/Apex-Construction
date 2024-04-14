import express from 'express'
import SiteController from '../controller/SiteController.js'

const siteRouter =  express.Router();

siteRouter.get("/getall", SiteController.getAllSites);
siteRouter.get("/get/:id", SiteController.getAllSitesByCustId);
siteRouter.get("/getid", SiteController.generateSiteId);
siteRouter.get("/getstatus/:id", SiteController.calculateCompleteStatus);
siteRouter.post("/create", SiteController.createSite);
siteRouter.put("/update", SiteController.updateSite);
siteRouter.delete("/delete/:id", SiteController.deleteSite);

siteRouter.post("/request", SiteController.stockRequest);

export default siteRouter;