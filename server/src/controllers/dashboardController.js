/*eslint strict: ["error", "global"]*/
'use strict';

var express = require('express');
var commonModel = require('./../models/commonModel');
var cache = require('../utils/cache');
var config = require('../utils/config')

var GStats = commonModel.GStats;
var IndianStatesStats = commonModel.IndianStatesStats;
var IndianTestSiteStats = commonModel.IndianTestSiteStats;
var getAPIStats = function () {
  //var apiStats = {};
  //Object.values(config.DATA_APIS).map((api) =>
  //  (apiStats[api.name] = api.lastupdatedon));
  //return apiStats;
  var key = 'APISTATS';
  var content = cache.getD(key);
  if (content) {
    return content;
  } else {
    var apiStats = {};
    Object.values(config.DATA_APIS).map((api) =>
      (apiStats[api.name] = api.lastupdatedon));
    cache.setD(key, apiStats);
    return apiStats;
  }
};
var responseDispatcher = function (req, res, next) {
  var content = res.locals.data;
  return res.status(200).send(content);
};

var router = express.Router();


router.get('/dashboard/global',
  cache.get,
  function (req, res, next) {
    config.DATA_APIS.GStats.ckey = cache.getCacheKey(req); //Iniializing Cache Key for this Data API
    GStats
      .find()
      .sort({
        _id: -1,
      })
      .limit(1)
      .exec(function (err, foundGStats) {
        if (err) {
          return next(err);
        }
        show(foundGStats);
        res.locals.data = foundGStats; //Temp Storage
        return next();
      });
  },
  cache.set,
  responseDispatcher);

router.get('/dashboard/india/states',
  cache.get,
  function (req, res, next) {
    config.DATA_APIS.IndianStatesStats.ckey = cache.getCacheKey(req); //Iniializing Cache Key for this Data API
    IndianStatesStats
      .find()
      .sort({
        _id: -1,
      })
      .limit(1)
      .exec(function (err, foundIndiaStateStats) {
        if (err) {
          return next(err);
        }
        show(foundIndiaStateStats);
        res.locals.data = foundIndiaStateStats; //Temp Storage
        return next();
      });
  },
  cache.set,
  responseDispatcher);

router.get('/dashboard/india/testsites',
  cache.get,
  function (req, res, next) {
    config.DATA_APIS.IndianTestSiteStats.ckey = cache.getCacheKey(req); //Iniializing Cache Key for this Data API
    IndianTestSiteStats
      .find()
      .sort({
        _id: -1,
      })
      .limit(1)
      .exec(function (err, foundIndiaTestSites) {
        if (err) {
          return next(err);
        }
        show(foundIndiaTestSites);
        res.locals.data = foundIndiaTestSites; //Temp Storage
        return next();
      });
  },
  cache.set,
  responseDispatcher);

router.get('/apistats',
  function (req, res, next) {
    var foundAPIStats = getAPIStats();
    //show(foundAPIStats);
    res.locals.data = foundAPIStats; //Temp Storage
    return next();
  },
  responseDispatcher);

function show(list) {
  list.forEach(function (item) {
    console.log('Retrieved Document from DB: {0}', JSON.stringify(item));
  });
}

module.exports = router;