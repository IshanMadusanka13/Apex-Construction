const express = require('express');
const router = express.Router();
const siteController = require('./site.controller');

// POST request to create a new site
router.post('/sites', siteController.createSite);

module.exports = router;
