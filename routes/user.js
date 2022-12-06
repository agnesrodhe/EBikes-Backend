const express = require('express');
const router = express.Router();
const { signIn, signUp, updateUser, deleteUser, getAllUsers } = require("../controllers/users")
const { getGitHubUser, getGitHubInfo } = require("../controllers/github")

router.get('/auth/github', getGitHubUser);

router.get('/all', getAllUsers);

router.get('/githubtoken', getGitHubInfo);

router.post('/signin', signIn);

router.post('/signup', signUp);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser)

router.get('/logout', function (req, res) {
    res.clearCookie("github-jwt");
    res.json({
        msg: "You Are Logged Out",
    });
});





module.exports = router