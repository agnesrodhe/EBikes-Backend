const mongoose = require("mongoose");

const polygonSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Polygon'],
        required: true,

    },
    coordinates: {
        type: [[[Number]]], // Array of arrays of arrays of numbers
    }
});
const chargestSchema = new mongoose.Schema({
    name: String,
    location: {
        type: polygonSchema,
        required: true,
        index: '2dsphere'
    },
    bikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bike'

    }],
    slots: Number,
    inCity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    }
});

const ChargeSt = mongoose.model("ChargeSt", chargestSchema);
module.exports = ChargeSt;