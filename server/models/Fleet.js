import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const FleetSchema = new Schema({
    Vehicleid: Number,
    VehicleType: String,
    VehicleNo: String,
    DriverId: Number,
    TransportMaterials:String,
    DriverMobileNo:String,
    TransportLocation:String,
    TransportRoot:String,
    EstimatedTime:String,

});

const Fleet = mongoose.model('Fleet' , FleetSchema);

export default Fleet;