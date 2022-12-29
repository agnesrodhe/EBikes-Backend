/*const mongoose = require("mongoose");

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


const bike2Schema = new mongoose.Schema({
    name: String,
    active: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
        index: true
    },
    status: {
        type: String,
        //can also be 'needService' or 'noBattery' or 'inUse'
        default: 'working'

    },
    charging: {
        type: String
    },
    parked: {
        type: String
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
        type: String,
        index: true
    },
    goal: {
        type: pointSchema,
        index: '2dsphere'
    }
}
);

const Bike2 = mongoose.model("Bike2", bike2Schema);

module.exports = Bike2; */

