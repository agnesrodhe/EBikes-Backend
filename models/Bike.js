const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({



})

const bikeSchema = new mongoose.Schema({
    active: Boolean,
    status: String,
    maxspeed: Number,
    speed: {
        Type: Number,
        default: 10
    },
    battery_level: Number,
    service_mode: Boolean,
    history: [tripSchema]
}

)