const mongoose = require("mongoose");

const polygonSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Polygon'],
        required: true,

    },
    coordinates: {
        type: [[[Number]]], // Array of arrays of arrays of numbers
        required: true
    }
});

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: polygonSchema,
        required: true,
        index: '2dsphere'
    },

});

const City = mongoose.model("City", citySchema);

module.exports = City;
