import mongoose from "mongoose";
const { Schema } = mongoose;

const authSchema = new Schema({
    id:Number,
    localauthorityname: String,
    type: String,
    city:String,
    place: String,
    nooffloors:Number,

});

const Auth = mongoose.model('Auth' , authSchema);

export default Auth;