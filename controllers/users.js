require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const User = require('../models/User');

/**
 * 
 * STILL NEEDS MIDDLEWARE FOR USING THE TOKEN
 */

/*

THIS ONE IS UNDER VERY MUCH CUNSTRUCTION
async function getGitHubUser(code) {
    const githubAccessToken = await axios.post(`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`)
        .then((res) => res.data)

        .catch((error) => {
            throw error;
        });

    decoded = querystring.parse()
}*/


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
 * UNDER CUNSTRUCTION the google OAUTH NOT YET IMPLEMENTED
 */
const signIn = async (req, res) => {
    if (req.body.googleAccessToken) {
        //google oauth login logic

    }
    //for regular login in 
    else {

        const { email, password } = req.body

        if (email === "" || password === "") {
            return res.status(400).json({ message: "Empty fields!" });
        }

        const user = await User.findOne({ email })

        try {
            var passwordRight = await bcrypt.compare(password, user.password)
        } catch {
            res.status(400)
            return res.status(404).json({ error: 'No customer found' });
        }

        if (user && passwordRight) {
            res.json({
                _id: user.id,
                email: user.email,
                token: makeAToken(user._id),
                logIn: "success",
                role: user.role

            })
        } else {
            res.status(400)
            return res.status(404).json({ error: 'No customer found' });
        }
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No user with that id' });
    }
    let thingsToUpdate = {
        $set: {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            balance: req.body.balance,
            password: req.body.password,
            role: req.body.role,

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
//make the token

const makeAToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
}

module.exports = {
    signIn,
    signUp,
    getAllCustomers,
    getOneCustomer,
    updateUser,
    deleteUser
}