/*eslint strict: ["error", "global"]*/

"use strict";

const models = require('../models/');


router.get('/global', function (req, res, next) {
  let globalStats = models.commonModel.GStats
    .find()
    .sort({
      '_id': -1
    })
    .limit(1)
    .exec(function (err, foundGStats) {
      foundGStats.forEach(gs => console.log("Found GStats (discriminator): " + JSON.stringify(gs)));
      res.json(foundGStats);
    });
});

router.get('/india/states', function (req, res, next) {
  let indiastateStats = models.commonModel.IndianStatesStats
    .find()
    .sort({
      '_id': -1
    })
    .limit(1)
    .exec(function (err, foundIndiaStateStats) {
      foundIndiaStateStats.forEach(iss => console.log("Found IndianStateStats (discriminator): " + JSON.stringify(iss)));
      res.json(foundIndiaStateStats);
    });
});

module.exports = router;
