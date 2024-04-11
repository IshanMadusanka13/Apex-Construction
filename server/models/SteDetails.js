// siteDetails.model.js

const mongoose = require('mongoose');

const siteDetailsSchema = new mongoose.Schema({
    employeeId: String,
    siteId: String
});

const SiteDetails = mongoose.model('SiteDetails', siteDetailsSchema);

module.exports = SiteDetails;
