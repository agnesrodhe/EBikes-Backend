const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    startTime: Date,
    stopTime: Date
})


const bikeSchema = new mongoose.Schema({
    active: {
        type: Boolean,
        default: false

    },
    works: {
        type: Boolean,
        default: true
    },
    charging: {
        type: Boolean,
        default: false
    },
    maxspeed: Number,
    speed: Number,
    batterylevel: Number,
    history: [tripSchema],
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    inCity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    }

}

);

const Bike = mongoose.model("Bike", bikeSchema);
module.exports = Bike;

