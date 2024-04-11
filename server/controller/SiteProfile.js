const Site = require('./site.model');

const createSite = async (req, res) => {
    try {
        const { siteId, siteName, siteLocation, siteProgress } = req.body;
        const newSite = new Site({ siteId, siteName, siteLocation, siteProgress });
        await newSite.save();
        res.status(201).json({ message: 'Site created successfully', site: newSite });
    } catch (error) {
        console.error('Error creating site:', error);
        res.status(500).json({ message: 'Error creating site' });
    }
};

module.exports = { createSite };
