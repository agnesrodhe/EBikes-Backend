const express = require('express');
const router = express.Router();
const { signIn, signUp, updateUser, deleteUser, getAllCustomers, } = require("../controllers/users")
const { getGitHubUser, getGitHubInfo } = require("../controllers/github")

router.get('/allCustomers', getAllCustomers);

router.get('/auth/github', getGitHubUser);

router.get('/githubtoken', getGitHubInfo);

router.post('/signin', signIn);

router.post('/signup', signUp);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser)





module.exports = router