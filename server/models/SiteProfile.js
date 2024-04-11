// site.model.js

const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
    siteId: String,
    siteName: String,
    siteLocation: String,
    siteProgress: String
});

const Site = mongoose.model('Site', siteSchema);

module.exports = Site;
