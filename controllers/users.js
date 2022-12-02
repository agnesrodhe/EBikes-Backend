require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User');

/**
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * function for getting all Customers 
 */

const getAllCustomers = async (req, res) => {
    const customers = await User.find({ role: "customer" });

    res.status(200).json(customers);
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Get one customer
 * 
 */
const getOneCustomer = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No customer with that id' });
    }

    const customer = await User.findById(id);

    if (!customer) {
        return res.status(404).json({ error: 'No customer with that id' });
    }

    res.status(200).json(customer);
};



/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 * 
 * function for signing in.
 * 
 * 
 */
const signIn = async (req, res) => {

    //for regular login in 

    const { username, password } = req.body

    if (username === "" || password === "") {
        return res.status(400).json({ message: "Empty fields!" });
    }

    const user = await User.findOne({ username })

    try {
        var passwordRight = await bcrypt.compare(password, user.password)
    } catch {
        res.status(400)
        return res.status(404).json({ error: 'No customer found' });
    }

    if (user && passwordRight) {
        res.json({
            _id: user.id,
            username: user.username,
            token: makeAToken(user._id),
            logIn: "success",
            role: user.role

        })
    } else {
        res.status(400)
        return res.status(404).json({ error: 'No customer found' });
    }

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 * 
 * function for signing up.
 * 
 */

const signUp = async (req, res) => {

    const { firstName, lastName, username, password } = req.body

    //check if email already exists
    const alreadyUser = await User.findOne({ username })

    if (alreadyUser) {
        res.status(400)
        console.log('user already exists')
    }
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password, salt)


    console.log("1")
    //create user
    const user = await User.create({
        firstName,
        lastName,
        username,
        password: hashPass
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            token: makeAToken(user._id)

        })
    } else {
        res.status(400)
        throw new Error('invalid info')

    }
}

//make the token

const makeAToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
}

const updateUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No user with that id' });
    }
    let thingsToUpdate = {
        $set: {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            balance: req.body.balance,
            password: req.body.password,
            role: req.body.role,
            gitHubId: req.body.gitHubId

        },
        $push: {
            history: req.body.history

        }
    }


    try {
        await User.findByIdAndUpdate(id, thingsToUpdate);
        const response = await User.findById(id);

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * 
 * function for deleting a user
 * @param {*} req 
 * @param {*} res 
 * @returns if the delete function was sucessfull
 */
const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such id' });
    }

    const response = await User.findByIdAndRemove(id);

    if (!response) {
        return res.status(404).json({ error: 'No such id' });
    }

    res.status(204).json();

}

module.exports = {
    signIn,
    signUp,
    getAllCustomers,
    getOneCustomer,
    updateUser,
    deleteUser,
}