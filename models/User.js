const mongoose = require('mongoose');



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
    history: [],
    gitHubId: Number
})

const User = mongoose.model("User", userSchema);
module.exports = User;