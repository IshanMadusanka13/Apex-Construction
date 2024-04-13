import mongoose from "mongoose";
const { Schema } = mongoose;

const packageAddonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    image : {
        type : String,
        required : true
    },
    packageId : {
        type: Schema.Types.ObjectId,
        ref: 'packages'
    },
    cost : {
        type : Number,
        required : true,
        default : 0
    }

});

export const PackageAddon = mongoose.model("PackageAddon", packageAddonSchema);

export default PackageAddon;