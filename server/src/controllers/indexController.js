var express = require('express');

var router = express.Router();

var heartBeatHandler = function (req, res, next) {
  res.send('server is up and running');
};

router.get('/', heartBeatHandler);

module.exports = (app) => {
  app.use('/', router);
};
