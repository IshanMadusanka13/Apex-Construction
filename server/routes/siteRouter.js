import express from 'express'

import { createSite, deleteSite, getAllSites, updateSite } from '../controller/Sitecontroller.js'

const siteRouter =  express.Router()
siteRouter.get("/",getAllSites)
siteRouter.post("/create", createSite);
siteRouter.delete("/:id",deleteSite)
siteRouter.put("/:id",updateSite)

export default siteRouter