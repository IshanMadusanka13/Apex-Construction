import express from 'express'
import SiteController from '../controller/SiteController.js'

const siteRouter =  express.Router();

siteRouter.get("/getall", SiteController.getAllSites);
siteRouter.get("/get/:id", SiteController.getAllSitesByCustId);
siteRouter.get("/getid", SiteController.generateSiteId);
siteRouter.post("/create", SiteController.createSite);
siteRouter.delete("delete/:id", SiteController.deleteSite);
siteRouter.put("update/:id", SiteController.updateSite);

export default siteRouter;