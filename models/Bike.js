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

const tripSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    startTime: Date,
    stopTime: Date,
    startPos: {
        type: pointSchema,
        required: true,
        index: '2dsphere'
    },
    stopPos: {
        type: pointSchema,
        required: true,
        index: '2dsphere'
    }
})




const bikeSchema = new mongoose.Schema({
    name: String,
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

