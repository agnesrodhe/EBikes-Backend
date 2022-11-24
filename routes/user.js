const express = require('express');
const router = express.Router();
const { signIn, signUp } = require("../controllers/users")


router.get('/auth/github', (req, res) => {
    res.json({
        msg: "You Are Logged In",
    });
});


router.post('/signin', signIn);
router.post('/signup', signUp);



module.exports = router