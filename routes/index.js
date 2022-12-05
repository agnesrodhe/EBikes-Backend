const express = require('express');
const router = express.Router();

router.get('/auth', (req, res) => {
    res.json({
        msg: "You Are Logged In",
    });
});


module.exports = router;