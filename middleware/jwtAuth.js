require('dotenv').config();
const jwt = require("jsonwebtoken");
const { get } = require('lodash')

const COOKIE_NAME = "github-jwt";

const cookieJwtAuth = (req, res, next) => {
    const cookie = get(req, `cookies[${COOKIE_NAME}]`);
    try {
        const user = jwt.verify(cookie, process.env.MY_SECRET);
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie("github-jwt");
        return res.status(404).json({ error: 'no valid token' });
    }

    if (!cookie) {
        res.status(401).json({ error: 'no token' })

    }
};

module.exports = { cookieJwtAuth }