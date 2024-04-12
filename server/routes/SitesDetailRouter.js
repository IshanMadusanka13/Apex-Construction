import express from 'express';
import siteDetailsController from './siteDetails.controller.js';

const router = express.Router();

router.post('/site-details', siteDetailsController.createSiteDetail);
router.get('/site-details', siteDetailsController.getAllSiteDetails);

export default router;
