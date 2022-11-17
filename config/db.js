require('dotenv').config();
const mongoose = require("mongoose")


const connectDB = async () => {
    let dsn = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASS}@ebikes.kcv8awt.mongodb.net/ebikes?retryWrites=true&w=majority`;;
    try {
        const conn = await mongoose.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(error);
        //exit process on failure with 1 if something goes wrong
        process.exit(1)
    }
}


function close() {
    return mongoose.disconnect();
}

module.exports = connectDB;