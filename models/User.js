const mongoose = require('mongoose');

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
    amount: Number,
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





const userSchema = mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    balance: String,
    password: String,
    role: {
        type: String,
        default: 'customer'
    },
    history: [tripSchema],
    gitHubId: String,
    id: String
})

const User = mongoose.model("User", userSchema);
module.exports = User;