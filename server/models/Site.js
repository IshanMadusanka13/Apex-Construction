import mongoose from "mongoose";

const siteSchema = new mongoose.Schema({
    customerId : {
        type : String,
        required : true,
    },
    siteId : {
        type : String,
        required : true,
    },
    location : {
        type : String,
        required : true
    },
    siteState : {
        type : String,
        required : true,
        default : "pending"
    },
    start : {
        type : Date,
        required : true,
        default : Date.now()
    },
    end : { 
        type : Date,
        required : true,
        default : Date.now()

    },
    notes : {
        type : String,
        required : false
    }

});

const Site = mongoose.model("Site", siteSchema);

export default Site;
