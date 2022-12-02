require('dotenv').config();
//const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const User = require('../models/User');
const querystring = require('querystring');
const { get } = require('lodash')

const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args))

/**
 * function for handeling the code and acesstoken back and forth from github
 * @param {*} code 
 * @returns github user info
 */

const COOKIE_NAME = "github-jwt";

const getGitHubUser = async (req, res) => {
    const code = get(req, "query.code")
    const path = get(req, "query.path", "/");


    const githubToken = await axios
        .post(
            `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`
        )
        .then((res) => res.data)

        .catch((error) => {
            throw error;
        });



    const decoded = querystring.parse(githubToken);

    const accessToken = decoded.access_token;

    console.log(accessToken)

    await fetch("https://api.github.com/user", {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }).then((response) => {
        return response.json()
    }).then(async (data) => {

        let gitHubId = data.id

        let username = data.username

        const user = await User.findOne({ username })

        if (!user) {
            user = await User.create({ username, gitHubId })
        }

        const token = makeAToken(user._id)



        res.cookie(COOKIE_NAME, token, {
            httpOnly: true,
            domain: "localhost",
        });

        res.redirect(`http://localhost:3001${path}`);
    })

}

//make the token

const makeAToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
}



const getGitHubInfo = async (req, res) => {
    const cookie = get(req, `cookies[${COOKIE_NAME}]`);

    try {
        const decode = jwt.verify(cookie, process.env.JWT_SECRET);
        console.log(decode)
        return res.send(decode);
    } catch (e) {
        return res.send(null);
    }

}

module.exports = {
    getGitHubUser,
    getGitHubInfo
}