require('dotenv').config();
//const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs')
//const jwt = require('jsonwebtoken')
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
async function getGitHubInfo({ code }) {
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
        console.log(data)

        let gitHubId = data.id

        console.log(typeof gitHubId)

        const user = await User.findOne({ gitHubId })

        console.log(user)





    })

}

/**
 * function for getting the user from github
 */

const getGitHubUser = async (req, res) => {
    const code = get(req, "query.code");
    const path = get(req, "query.path", "/");

    console.log(code)

    await getGitHubInfo({ code });


    res.redirect(`http://localhost:3000${path}`);



}

module.exports = {
    getGitHubUser
}