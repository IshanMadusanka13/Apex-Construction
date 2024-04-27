import mongoose from 'mongoose';

const FleetSchema = new mongoose.Schema({

    VehicleType: {
        type: String,
        required: true,
    },

    VehicleNo: {
        type: String,
        required: true,
    },

    TransportMaterials: {
        type: String,
        required: true,
    },

    DriverId: {
        type: String,
        required: true,
    },

    DriverMobileNo: {
        type: Number,
        required: true,
    },

    TransportLocation: {
        type: String,
        required: true,
    },

    TransportRoot: {
        type: String,
        required: true,
    },

    EstimatedTime: {
        type: String,
        required: true,
    },

});

const Fleet = mongoose.model('Fleet', FleetSchema);

export default Fleet;