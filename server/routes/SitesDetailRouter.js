const express = require('express');
const router = express.Router();
const siteDetailsController = require('./siteDetails.controller');


router.post('/site-details', siteDetailsController.createSiteDetail);


router.get('/site-details', siteDetailsController.getAllSiteDetails);



module.exports = router;
