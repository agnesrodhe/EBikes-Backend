const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

const citySchema = new mongoose.Schema({
    name: String,
    location: {
        type: pointSchema,
        required: true
    }
});

const City = mongoose.model("City", citySchema);
module.exports = City;
