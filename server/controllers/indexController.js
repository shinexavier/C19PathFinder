const express = require('express');
const router = express.Router();

/* Heartbeat endpoint */
router.get('/', function(req, res, next) {
  res.send('server is up and running!');
});

module.exports = router;
