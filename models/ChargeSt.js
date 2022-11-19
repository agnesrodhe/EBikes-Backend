const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,

    },
    coordinates: {
        type: [Number],
    }
});
const chargestSchema = new mongoose.Schema({
    name: String,
    location: {
        type: pointSchema,
        required: true,
        index: '2dsphere'
    },
    bikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bike'

    }],
    inCity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    }
});

const ChargeSt = mongoose.model("ChargeSt", chargestSchema);
module.exports = ChargeSt;