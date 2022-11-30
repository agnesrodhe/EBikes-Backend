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


const bikeSchema = new mongoose.Schema({
    name: String,
    active: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    works: {
        type: Boolean,
        default: true
    },
    parked: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parking',
        default: null
    },
    maxspeed: Number,
    speed: Number,
    batterylevel: Number,
    history: [],
    location: {
        type: pointSchema,
        required: true,
        index: '2dsphere'
    },
    inCity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    }

}

);

const Bike = mongoose.model("Bike", bikeSchema);
module.exports = Bike;

