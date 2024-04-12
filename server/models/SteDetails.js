import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const siteDetailsSchema = new Schema({
    employeeId: String,
    siteId: String
});

const SiteDetails = model('SiteDetails', siteDetailsSchema);

export default SiteDetails;
