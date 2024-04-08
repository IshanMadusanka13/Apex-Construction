import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const FleetDetailSchema = new Schema({
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

const FleetDetail = mongoose.model('FleetDetail' , FleetDetailSchema);

export default FleetDetail;