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

        const passwordRight = await bcrypt.compare(password, user.password)

        if (user && passwordRight) {
            res.json({
                _id: user.id,
                email: user.email,
                token: makeAToken(user._id),
                logIn: "sucsess"

            })
        } else {
            res.status(400)
            throw new Error('Not matching')
        }
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
 * UNDER CUNSTRUCTION the google OAUTH NOT YET IMPLEMENTED
 */

const signUp = async (req, res) => {
    if (req.body.googleAccessToken) {
        //google oauth
        axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                "Authorization": `Bearer ${googleAccessToken}`
            }

        }).then(async response => {
            const firstName = response.data.given_name;
            const lastName = response.data.family_name;
            const email = response.data.email;


            const userExist = await User.findOne({ email })

            if (userExist) {
                return res.status(400).json({ message: "User already exist!" })
            }

            const user = await User.create({ verified: "true", email, firstName, lastName })

            const token = jwt.sign({
                email: user.email,
                id: user._id
            }, process.env.JWT_SECRET, {
                expiresIn: '1d',
            })

            res.status(200).json(user, token)
        }).catch(err => {
            res.status(400).json({ message: "No token" })
        })
    } else {
        console.log("hej")
        const { firstName, lastName, email, password } = req.body

        //check if email already exists
        const alreadyUser = await User.findOne({ email })

        if (alreadyUser) {
            res.status(400)
            throw new Error('user already exists')
        }
        console.log("0")
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)


        console.log("1")
        //create user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashPass
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                email: user.email,
                token: makeAToken(user._id)

            })
        } else {
            res.status(400)
            throw new Error('invalid info')

        }

    }

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
    getOneCustomer
}