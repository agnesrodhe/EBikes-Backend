const mongoose = require("mongoose");


const priceSchema = new mongoose.Schema({
    startfee: Number,
    penaltyfee: Number,
    minutetaxa: Number,
    bonus: Number

});

const Price = mongoose.model("Price", priceSchema);

module.exports = Price;
