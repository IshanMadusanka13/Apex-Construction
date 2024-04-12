import SiteDetails from './siteDetails.model.js';

// Create a new site detail
export const createSiteDetail = async (req, res) => {
    try {
        const { employeeId, siteId } = req.body;
        const newSiteDetail = new SiteDetails({ employeeId, siteId });
        await newSiteDetail.save();
        res.status(201).json(newSiteDetail);
    } catch (error) {
        console.error('Error creating site detail:', error);
        res.status(500).json({ error: 'Error creating site detail' });
    }
};

// Get all site details
export const getAllSiteDetails = async (req, res) => {
    try {
        const siteDetails = await SiteDetails.find();
        res.status(200).json(siteDetails);
    } catch (error) {
        console.error('Error getting all site details:', error);
        res.status(500).json({ error: 'Error getting all site details' });
    }
};
