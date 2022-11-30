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
const parkingSchema = new mongoose.Schema({
    name: String,
    location: {
        type: pointSchema,
        required: true,
        index: '2dsphere'
    },
    inCity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    }
});

const Parking = mongoose.model("Parking", parkingSchema);
module.exports = Parking;