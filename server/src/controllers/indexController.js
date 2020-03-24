/*eslint strict: ["error", "global"]*/

'use strict';


var express = require('express');


var router = express.Router();


module.exports = function(app) {
  app.use('/', router);
};


var heartBeatHandler = function(req, res, next) {
  res.send('server is up and running');
};


router.get('/', heartBeatHandler);
