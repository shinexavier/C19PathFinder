/*eslint strict: ["error", "global"]*/

'use strict';


var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var config = require('../utils/config');
var cache = require('../utils/cache');

var baseConfig = {
  // Need to consider setting up a secondary index here.
  discriminatorKey: '_type',
  collection: 'alldata',
};

var commonModel = mongoose.model('Common', new mongoose.Schema({}, baseConfig));

/**
 * Write-Behind Cache Function
 * that Overwrites the 
 * cache with new value and updates the
 * API Stats lastupdatedon Value
 */
var writeBehind = function (api, doc) {
  //cache.setD(api.ckey, doc);
  //api.lastUpdatedOn = doc.lastUpdatedOn;
  const key = 'APISTATS'
  let content = cache.getD(key)
  if (content) {
    content[api.name] = doc.lastUpdatedOn
    cache.setD(key, content)
  } else {
    var apiStats = {};
    Object.values(config.DATA_APIS).map((api) =>
      (apiStats[api.name] = api.lastupdatedon));
    apiStats[api.name] = doc.lastUpdatedOn
    cache.setD(key, apiStats)
  }
  console.log('Write Behind Update API Stats {0}:{1}', api.name, doc.lastUpdatedOn);
};

var GStatsModelSchema = new Schema({
  lastUpdatedOn: {
    type: Number,
    default: new Date().getTime(),
    required: [true, 'Data & Time are Needed!'],
  },
  passengersScreened: {
    airport: {
      type: Number,
      min: [1, 'Too few screenings!'],
      required: [true, 'Passengers Screened Count is Needed!'],
    },
  },
  confirmedCases: {
    indian: {
      type: Number,
      default: 0,
      required: [true, 'Confirmed Indian Cases Count is Needed!'],
    },
    foreign: {
      type: Number,
      default: 0,
      required: [true, 'Confirmed Foreign Cases Count is Needed!'],
    },
  },
  dischargedCases: {
    type: Number,
    default: 0,
    required: [true, 'Discharged Cases Count is Needed!'],
  },
  deathCases: {
    type: Number,
    default: 0,
    required: [true, 'Death Cases Count is Needed!'],
  },
}, baseConfig);

/**
 * Updating the lastupdatedon value
 * in the Post Save Event
 */
GStatsModelSchema.post('save', function (doc) {
  writeBehind(config.DATA_APIS.GStats, doc);
});

/**
 * Initializing the lastupdatedon value
 * in the Post Find Event
 */
GStatsModelSchema.post('find', function (docs) {
  writeBehind(config.DATA_APIS.GStats, docs[0]); //Strong assumption for 1 doc
});

var GStats_common = commonModel.discriminator('GStatsType', GStatsModelSchema);

var IndianStatesStatsModelSchema = new Schema({
  lastUpdatedOn: {
    type: Number,
    default: new Date().getTime(),
    required: [true, 'Data & Time are Needed!'],
  },
  statistics: [{
    state: {
      type: String,
      required: [true, 'State is Needed!'],
    },
    confirmedCases: {
      indian: {
        type: Number,
        default: 0,
        required: [true, 'Confirmed Indian Cases Count is Needed!'],
      },
      foreign: {
        type: Number,
        default: 0,
        required: [true, 'Confirmed Foreign Cases Count is Needed!'],
      },
    },
    dischargedCases: {
      type: Number,
      default: 0,
      required: [true, 'Discharged Cases Count is Needed!'],
    },
    deathCases: {
      type: Number,
      default: 0,
      required: [true, 'Death Cases Count is Needed!'],
    },
  }],
}, baseConfig);

/**
 * Updating the lastupdatedon value
 * in the Post Save Event
 */
IndianStatesStatsModelSchema.post('save', function (doc) {
  writeBehind(config.DATA_APIS.IndianStatesStats, doc);
});

/**
 * Initializing the lastupdatedon value
 * in the Post Find Event
 */
IndianStatesStatsModelSchema.post('find', function (docs) {
  writeBehind(config.DATA_APIS.IndianStatesStats, docs[0]); //Strong assumption for 1 doc
});

var IndianStatesStats_common = commonModel.discriminator(
  'IndianStatesStatsType',
  IndianStatesStatsModelSchema);

var IndiaTestSitesModelSchema = new Schema({
  lastUpdatedOn: {
    type: Number,
    default: new Date().getTime(),
    required: [true, 'Data & Time are Needed!'],
  },
  sites: [{
    state: {
      type: String,
      required: [true, 'State is Needed!'],
    },
    data: [{
      type: String
    }]
  }]
}, baseConfig);

/**
 * Updating the lastupdatedon value
 * in the Post Save Event
 */
IndiaTestSitesModelSchema.post('save', function (doc) {
  writeBehind(config.DATA_APIS.IndianTestSiteStats, doc);
});

/**
 * Initializing the lastupdatedon value
 * in the Post Find Event
 */
IndiaTestSitesModelSchema.post('find', function (docs) {
  writeBehind(config.DATA_APIS.IndianTestSiteStats, docs[0]); //Strong assumption for 1 doc
});

var IndianTestSites_common = commonModel.discriminator(
  'IndianTestSitesType',
  IndiaTestSitesModelSchema);

/**
 * Self-Invoking Function that iterates the DATA_APIS listed in config
 * data and creates the schema automatically. 
 * The schema would just have the API Name (from the config data)
 * along with the Last Updated Time.
 */
/*var APIStatsModelSchema = {
  function () {
    apiStatsSchema = this;
    Object.value(config.DATA_APIS).forEach(api => {
      apiStatsSchema[api] = {
        type: Number,
        default: new Date().getTime(),
        required: [true, 'Data & Time are Needed!'],
      };
    });
    return new Schema(apiStatsSchema, baseConfig);
  }
}();

var APIStats_common = {commonModel.discriminator(
  'APIStatsType',
  APIStatsModelSchema)};

var APIStats_common = {
  function () {
    var apiStats = this;
    apiStats[config.DATA_APIS.GStats.name] = new Date().getTime();
    apiStats[config.DATA_APIS.IndianStatesStats.name] = new Date().getTime();
    apiStats[config.DATA_APIS.IndianTestSiteStats.name] = new Date().getTime();
    return apiStats;
  }
}();
*/


var commonModels = {};

commonModels[config.DATA_APIS.GStats.name] = GStats_common;
commonModels[config.DATA_APIS.IndianStatesStats.name] = IndianStatesStats_common;
commonModels[config.DATA_APIS.IndianTestSiteStats.name] = IndianTestSites_common;

module.exports = commonModels;