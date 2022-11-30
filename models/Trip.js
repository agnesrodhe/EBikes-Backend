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
    startTime: {
        type: Date,
        immutable: true,
        default: () => Date.now(),

    },
    stopTime: {
        type: Date,
        default: () => Date.now()
    },
    startPos: {
        type: pointSchema,
        index: '2dsphere'
    },
    stopPos: {
        type: pointSchema,
        index: '2dsphere'
    },
    amount: {
        type: Number
    },

})