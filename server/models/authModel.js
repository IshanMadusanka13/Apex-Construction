const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = new Schema({
    id:Number,
    localauthorityname: String,
    type: String,
    city:String,
    place: String,
    nooffloors:Number,

});

const Auth = mongoose.model('Auth' , authSchema);

module.exports = Auth;