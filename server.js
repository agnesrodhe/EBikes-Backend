require('dotenv').config();
const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const mongoose = require("mongoose");
const city = require('./routes/city');
const price = require('./routes/prices');
const home = require('./routes/index');

//connect to database
connectDB();

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

app.use('/home', home)
app.use('/cities', city);

app.use('/prices', price);

app.get('/', (req, res) => {
    res.json({
        msg: "Ebikers",
    });
});



app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});


app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
});


module.exports = app;