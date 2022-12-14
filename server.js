require('dotenv').config();
const express = require("express");
const cors = require('cors');
const app = require('./app.js');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

// Verkar som att dessa kanske ställer till det i docker-compose
//const { addcharge } = require("./helpfunctions/chargestfunc")
// const { addbikes } = require("./helpfunctions/bikefunc")
//const { addparking } = require("./helpfunctions/parkingfunctions")

const PORT = 3002;

//body parser
app.use(express.json());

app.use(cookieParser());

//enable cors
app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:3001"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

async function starter() {
    await connectDB();
    app.listen(PORT, () => {
        console.log('Listening on port: ' + PORT);
    });
}

starter();


/**
 *
 *
 * add bikes in Visby area

 */
/**
 * addbikes in Lund area
 */
//addbikes(13.12, 13.29, 55.66, 55.73)




/**
 * add chargest in borlänge
 */

//addparking(15.36, 15.43, 60.46, 60.51)



//visby
//addbikes(18.29, 18.35, 57.61, 57.64)
