import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const siteSchema = new Schema({
    siteId: String,
    siteName: String,
    siteLocation: String,
    siteProgress: String
});

const Site = model('Site', siteSchema);

export default Site;