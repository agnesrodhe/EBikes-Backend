require('dotenv').config();
const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const mongoose = require("mongoose");
const city = require('./routes/city');
const price = require('./routes/prices');
const home = require('./routes/index');
const chargeSt = require('./routes/chargest');
const parking = require('./routes/parking');
const bike = require('./routes/bike');
const user = require('./routes/user');
const customer = require('./routes/customer')


// Verkar som att dessa kanske ställer till det i docker-compose
//const { addcharge } = require("./helpfunctions/chargestfunc")
// const { addbikes } = require("./helpfunctions/bikefunc")

const version = "v1"
//connect to db

//connectDB()

const PORT = 3002;

const app = express();

//body parser
app.use(express.json());

//enable cors
app.use(cors());

app.options('*', cors());

app.disable('x-powered-by');

app.use((req, res, next) => {
    //console.log(req.method);
    //console.log(req.path);
    next();
});

//routes

app.use(`/${version}/home`, home)
app.use(`/${version}/cities`, city);

app.use(`/${version}/prices`, price);

app.use(`/${version}/chargestations`, chargeSt);

app.use(`/${version}/parking`, parking);

app.use(`/${version}/bikes`, bike)

app.use(`/${version}/user`, user)

app.use(`/${version}/customers`, customer)

app.get(`/${version}`, (req, res) => {
    res.json({
        msg: "Ebikers",
    });
});



app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

async function starter() {
    await connectDB();
    app.listen(PORT, () => {
        console.log('Listening on port: ' + PORT);
    });


}

starter()


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

//addbikes(15.36, 15.43, 60.46, 60.51)

//addbikes(18.29, 18.35, 57.61, 57.64)




module.exports = app;