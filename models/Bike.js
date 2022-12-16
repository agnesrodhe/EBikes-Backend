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
    status: {
        type: String,
        //can also be 'needService' or 'noBattery'
        default: 'working'

    },
    charging: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChargeSt',
        default: null
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
    },
    goal: {
        type: pointSchema,
        index: '2dsphere'
    }
}
);

const Bike = mongoose.model("Bike", bikeSchema);

module.exports = Bike;

