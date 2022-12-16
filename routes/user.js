const express = require('express');
const router = express.Router();
const
    {
        signIn, signUp,
        updateUser, deleteUser,
        getAllUsers, getSearchUser,
        getSearchUserName,
    } = require("../controllers/users");
const { getGitHubUser, getGitHubInfo } = require("../controllers/github");
const { cookieJwtAuth } = require('../middleware/jwtAuth');

router.get('/auth/github', getGitHubUser);

router.get('/all', getAllUsers);

router.get('/githubtoken', getGitHubInfo);

router.get('/search/:username', getSearchUserName)

router.get('/search/:firstName/:lastName', getSearchUser)

router.post('/signin', signIn);

router.post('/signup', signUp);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.get('/logout', function (req, res) {
    res.clearCookie("github-jwt");
    res.json({
        msg: "You Are Logged Out",
    });
});





module.exports = router;
