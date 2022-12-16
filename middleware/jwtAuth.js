require('dotenv').config();
const jwt = require("jsonwebtoken");
const { get } = require('lodash');

const COOKIE_NAME = "github-jwt";

const cookieJwtAuth = (req, res, next) => {
    const cookie = get(req, `cookies[${COOKIE_NAME}]`);
    try {
        /* eslint-disable */
        const user = jwt.verify(cookie, process.env.JWT_SECRET);
        console.log(user);
        /* eslint-enable */
        req.user = user;
        next();
    } catch (e) {
        res.clearCookie("github-jwt");
        return res.status(403).json({ error: 'no valid token' });
    }

    if (!cookie) {
        res.status(401).json({ error: 'no token' });
    }
};

module.exports = { cookieJwtAuth };
