/*eslint strict: ["error", "global"]*/

'use strict';


var express = require('express');
var commonModel = require('./../models/commonModel');


var GStats = commonModel.GStats;
var IndianStatesStats = commonModel.IndianStatesStats;
var router = express.Router();


module.exports = function(app) {
  app.use('/', router);
};


router.get('/global', function(req, res, next) {
  GStats
    .find()
    .sort({
      _id: -1,
    })
    .limit(1)
    .exec(function(err, foundGStats) {
      if (err) {
        return next(err);
      }

      foundGStats.forEach(function(gs) {
        console.log(
          'Found GStats (discriminator): ' + JSON.stringify(gs)
        );
      });
      res.json(foundGStats);
    });
});

router.get('/india/states', function(req, res, next) {
  IndianStatesStats
    .find()
    .sort({
      _id: -1,
    })
    .limit(1)
    .exec(function(err, foundIndiaStateStats) {
      if (err) {
        return next(err);
      }

      foundIndiaStateStats.forEach(function(iss) {
        console.log(
          'Found IndianStateStats (discriminator): ' + JSON.stringify(iss)
        );
      });
      res.json(foundIndiaStateStats);
    });
});
