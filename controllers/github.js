require('dotenv').config();
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/User');
const querystring = require('querystring');
const { get } = require('lodash');

const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));
/* eslint-disable */
const COOKIE_NAME = "github-jwt";

/**
 * function for handling the github code and turn it into token
 * @param {*} req 
 * @param {*} res
 * 
 *  
 */

const getGitHubUser = async (req, res) => {
    const code = get(req, "query.code");
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

    await fetch("https://api.github.com/user", {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }).then((response) => {
        return response.json();
    }).then(async (data) => {
        let gitHubId = data.id;

        let username = data.login;

        const githubUser = await User.findOne({ username });

        if (!githubUser) {
            const user = await User.create({ username, gitHubId });
        }

        const user = await User.findOne({ username });

        const token = makeAToken(user._id);

        res.cookie(COOKIE_NAME, token, {
            httpOnly: true,
            domain: "localhost",

        });

        res.redirect(`http://localhost:3001${path}`);
    });
};

/* make the token */
const makeAToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};
/* eslint-enable */


/**
 * function for getting the info about the user sent with a token
 * @param {*} req
 * @param {*} res
 * @returns token after its vertyfied by JWT
 */
const getGitHubInfo = async (req, res) => {
    const cookie = get(req, `cookies[${COOKIE_NAME}]`);

    try {
        /* eslint-disable */
        const decode = jwt.verify(cookie, process.env.JWT_SECRET);
        /* eslint-enable */

        return res.send(decode);
    } catch (e) {
        return res.send(null);
    }
};

module.exports = {
    getGitHubUser,
    getGitHubInfo
};
