import express from 'express';
import {siteController} from './site.controller.js';

const router = express.Router();

router.post('/sites', siteController.createSite);

export default router;
