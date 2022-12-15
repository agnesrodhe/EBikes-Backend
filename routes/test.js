const express = require('express');
const router = express.Router();

const Bike = require('../models/Bike');

router.get('/test', (req, res) => {
    console.log('request received');
    res.writeHead(200, {
      "Connection": "keep-alive",
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    });
    setInterval(async () => {
      res.write('event: ping\n');  // added these
      res.write(`data: ${JSON.stringify(await Bike.find({}))}`);
      res.write("\n\n");
    }, 5000);
  });

module.exports = router;