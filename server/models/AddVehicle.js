import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AddVehicleSchema = new Schema({
    ChassisNo: Number,
    Vehicleid: Number,
    VehicleType: String,
    VehicleManufachuredYear: String,
    VehicleBrand: String,  
    VehicleNo: String,
   

});

const AddVehicle = mongoose.model('AddVehicle' , AddVehicleSchema);

export default AddVehicle;