import mongoose from 'mongoose';
const { Schema } = mongoose;

const companyTransactionSchema = new mongoose.Schema({

    payFrom: {
        type: Schema.Types.ObjectId,
        ref: 'Bank'
    },

    payTo: {
        type: String,
        required: true
    },

    month: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    description: {
        type: String,
    },

    date: {
        type: Date,
        default: Date.now
    },

});

const CompanyTransaction = mongoose.model('CompanyTransaction', companyTransactionSchema);

export default CompanyTransaction;
