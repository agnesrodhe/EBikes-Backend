require('dotenv').config();
const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const city = require('./routes/city');
const price = require('./routes/prices');
const home = require('./routes/index');
const chargeSt = require('./routes/chargest');
const parking = require('./routes/parking');
const bike = require('./routes/bike');
const user = require('./routes/user');

const customer = require('./routes/customer');
const version = "v1";

const app = express();

//body parser
app.use(express.json());

//for using cookie parser
app.use(cookieParser());

//enable cors
app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:3001"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use((req, res, next) => {
    //console.log(req.method);
    //console.log(req.path);
    next();
});

//routes

app.use(`/${version}/home`, home);
app.use(`/${version}/cities`, city);

app.use(`/${version}/prices`, price);

app.use(`/${version}/chargestations`, chargeSt);

app.use(`/${version}/parking`, parking);

app.use(`/${version}/bikes`, bike);

app.use(`/${version}/user`, user);

app.use(`/${version}/customers`, customer);

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

module.exports = app;
