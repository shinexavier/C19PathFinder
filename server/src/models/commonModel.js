/*eslint strict: ["error", "global"]*/

'use strict';


var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var config = require('./../../resources/config');
var cache = require('../../resources/cache');

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

// Test Data -> This data entry would be via a Form or an API
var gstats_common = new GStats_common({
  lastUpdatedOn: new Date('March 20, 2020 17:20:00').getTime(),
  passengersScreened: {
    airport: 1459993,
  },
  confirmedCases: {
    indian: 191,
    foreign: 32,
  },
  dischargedCases: 22,
  deathCases: 4,
});

gstats_common.save(function (err, gStats) {
  console.log('Saved: ' + gStats);
  console.log('Error: ' + err);
});

var indianstatesstats_common = new IndianStatesStats_common({
  lastUpdatedOn: new Date('March 19, 2020 06:50:00').getTime(),
  statistics: [{
      state: 'Andhra Pradesh',
      confirmedCases: {
        indian: 3,
        foreign: 0,
      },
      dischargedCases: 0,
      deathCases: 0,
    },
    {
      state: 'Chhattisgarh',
      confirmedCases: {
        indian: 1,
        foreign: 0,
      },
      dischargedCases: 0,
      deathCases: 0,
    },
    {
      state: 'Delhi',
      confirmedCases: {
        indian: 16,
        foreign: 1,
      },
      dischargedCases: 5,
      deathCases: 1,
    },
    {
      state: 'Gujarat',
      confirmedCases: {
        indian: 5,
        foreign: 0,
      },
      dischargedCases: 0,
      deathCases: 0,
    },
    {
      state: 'Haryana',
      confirmedCases: {
        indian: 3,
        foreign: 14,
      },
      dischargedCases: 0,
      deathCases: 0,
    },
    {
      state: 'Karnataka',
      confirmedCases: {
        indian: 15,
        foreign: 0,
      },
      dischargedCases: 1,
      deathCases: 1,
    },
    {
      state: 'Kerala',
      confirmedCases: {
        indian: 26,
        foreign: 2,
      },
      dischargedCases: 3,
      deathCases: 0,
    },
    {
      state: 'Maharashtra',
      confirmedCases: {
        indian: 49,
        foreign: 3,
      },
      dischargedCases: 0,
      deathCases: 1,
    },
    {
      state: 'Odisha',
      confirmedCases: {
        indian: 2,
        foreign: 0,
      },
      dischargedCases: 0,
      deathCases: 0,
    },
    {
      state: 'Puducherry',
      confirmedCases: {
        indian: 1,
        foreign: 0,
      },
      dischargedCases: 0,
      deathCases: 0,
    },
    {
      state: 'Punjab',
      confirmedCases: {
        indian: 2,
        foreign: 0,
      },
      dischargedCases: 0,
      deathCases: 1,
    },
    {
      state: 'Rajasthan',
      confirmedCases: {
        indian: 15,
        foreign: 2,
      },
      dischargedCases: 3,
      deathCases: 0,
    },
    {
      state: 'Tamil Nadu',
      confirmedCases: {
        indian: 3,
        foreign: 0,
      },
      dischargedCases: 1,
      deathCases: 0,
    },
    {
      state: 'Telengana',
      confirmedCases: {
        indian: 8,
        foreign: 9,
      },
      dischargedCases: 1,
      deathCases: 0,
    },
    {
      state: 'Chandigarh',
      confirmedCases: {
        indian: 1,
        foreign: 0,
      },
      dischargedCases: 0,
      deathCases: 0,
    },
    {
      state: 'Jammu & Kashmir',
      confirmedCases: {
        indian: 4,
        foreign: 0,
      },
      dischargedCases: 0,
      deathCases: 0,
    },
    {
      state: 'Ladakh',
      confirmedCases: {
        indian: 10,
        foreign: 0,
      },
      dischargedCases: 0,
      deathCases: 0,
    },
    {
      state: 'Uttar Pradesh',
      confirmedCases: {
        indian: 22,
        foreign: 1,
      },
      dischargedCases: 9,
      deathCases: 0,
    },
    {
      state: 'Uttarakhand',
      confirmedCases: {
        indian: 3,
        foreign: 0,
      },
      dischargedCases: 0,
      deathCases: 0,
    },
    {
      state: 'West Bengal',
      confirmedCases: {
        indian: 2,
        foreign: 0,
      },
      dischargedCases: 0,
      deathCases: 0,
    },
  ],
});

indianstatesstats_common.save(function (err, indiaStatesStats) {
  console.log('Saved: ' + indiaStatesStats);
  console.log('Error: ' + err);
});

var indiantestsites_common = new IndianTestSites_common({
  lastUpdatedOn: new Date('March 20, 2020 17:20:00').getTime(),
  sites: [{
      state: 'Andhra Pradesh',
      data: [
        'Sri Venkateswara Institute of Medical Sciences, Tirupati',
        'Rangaraya Medical College, Kakinada',
        'Sidhartha Medical College, Vijayawada',
        'GMC, Anantapur, AP',
      ],
    },
    {
      state: 'Andaman & Nicobar islands',
      data: [
        'Regional Medical Research Centre, Port Blair, Andaman and Nicobar',
      ],
    },
    {
      state: 'Assam',
      data: [
        'Gauhati Medical College, Guwahati',
        'Regional Medical Research Center, Dibrugarh',
        'Silchar Medical College, Silchar',
        'Jorhat Medical College, Jorhat',
      ],
    },
    {
      state: 'Bihar',
      data: [
        'Rajendra Memorial Research Institute of Medical Sciences, Patna',
      ],
    },
    {
      state: 'Chandigarh',
      data: [
        'Post Graduate Institute of Medical Education & Research, Chandigarh',
      ],
    },
    {
      state: 'Chhattisgarh',
      data: [
        'All India Institute Medical Sciences, Raipur',
      ],
    },
    {
      state: 'Delhi-NCT',
      data: [
        'All India Institute Medical Sciences, Delhi',
      ],
    },
    {
      state: 'Gujarat',
      data: [
        'BJ Medical College, Ahmedabad',
        'M.P.Shah Government Medical College, Jamnagar',
      ],
    },
    {
      state: 'Haryana',
      data: [
        'Pt. B.D. Sharma Post Graduate Inst. of Med. Sciences, Rohtak, ' +
        'Haryana',
        'BPS Govt Medical College, Sonipat',
      ],
    },
    {
      state: 'Himachal pradesh',
      data: [
        'Indira Gandhi Medical College, Shimla, Himachal Pradesh',
        'Dr.Rajendra Prasad Govt. Med. College, Kangra, Tanda, HP',
      ],
    },
    {
      state: 'Jammu and Kashmir',
      data: [
        'Sher-e- Kashmir Institute of Medical Sciences, Srinagar',
        'Government Medical College, Jammu',
        'Government Medical College, Srinagar',
      ],
    },
    {
      state: 'Jharkhand',
      data: [
        'MGM Medical College, Jamshedpur',
      ],
    },
    {
      state: 'Karnataka',
      data: [
        'Bangalore Medical College & Research Institute, Bangalore',
        'National Institute of Virology Field Unit Bangalore',
        'Mysore Medical College & Research Institute, Mysore',
        'Hassan Inst. of Med. Sciences, Hassan, Karnataka',
        'Shimoga Inst. of Med. Sciences, Shivamogga, Karnataka',
      ],
    },
    {
      state: 'Kerala',
      data: [
        'National Institute of Virology Field Unit, Kerala',
        'Govt. Medical College, Thriuvananthapuram, Kerala',
        'Govt. Medical College, Kozhikode, Kerala',
        'Govt. Medical College, Thrissur, Kerala',
      ],
    },
    {
      state: 'Madhya Pradesh',
      data: [
        'All India Institute Medical Sciences, Bhopal',
        'National Institute of Research in Tribal Health (NIRTH), Jabalpur',
      ],
    },
    {
      state: 'Meghalaya',
      data: [
        'NEIGRI of Health and Medical Sciences, Shillong, Meghalaya',
      ],
    },
    {
      state: 'Maharashtra',
      data: [
        'Indira Gandhi Government Medical College, Nagpur',
        'Kasturba Hospital for Infectious Diseases, Mumbai',
        'NIV Mumbai Unit',
      ],
    },
    {
      state: 'Manipur',
      data: [
        'J N Inst. of Med. Sciences Hospital, Imphal-East, Manipur',
        'Regional Institute of Medical Sciences, Imphal',
      ],
    },
    {
      state: 'Odisha',
      data: [
        'Regional Medical Research Center, Bhubaneswar',
      ],
    },
    {
      state: 'Puducherry',
      data: [
        'Jawaharlal Institute of Postgraduate Medical Education & Research,' +
        'Puducherry',
      ],
    },
    {
      state: 'Punjab',
      data: [
        'Government Medical College, Patiala, Punjab',
        'Government Medical College, Amritsar',
      ],
    },
    {
      state: 'Rajasthan',
      data: [
        'Sawai Man Singh, Jaipur',
        'Dr. S.N Medical College, Jodhpur',
        'Jhalawar Medical College, Jhalawar, Rajasthan',
        'RNT Medical College, Udaipur',
        'SP Med. College, Bikaner, Rajasthan',
      ],
    },
    {
      state: 'Tamil Nadu',
      data: [
        "King's Institute of Preventive Medicine & Research, Chennai",
        'Government Medical College, Theni',
        'Tirunelveli Medical College, Tirunelveli',
        'Govt. Medical college, Thiruvarur',
      ],
    },
    {
      state: 'Tripura',
      data: [
        'Government Medical College, Agartala',
      ],
    },
    {
      state: 'Telangana',
      data: [
        'Gandhi Medical College, Secunderabad',
        'Osmania Medical College, Hyderabad',
      ],
    },
    {
      state: 'Uttar Pradesh',
      data: [
        "King's George Medical University, Lucknow",
        'Institute of Medical Sciences, Banaras Hindu University, Varanasi',
        'Jawaharlal Nehru Medical College, Aligarh',
      ],
    },
    {
      state: 'Uttarakhand',
      data: [
        'Government Medical College, Haldwani',
      ],
    },
    {
      state: 'West Bengal',
      data: [
        'National Institute of Cholera and Enteric Diseases, Kolkata',
        'IPGMER, Kolkata',
        '',
        '',
      ],
    },
  ]
});

indiantestsites_common.save(function (err, indiaTestSiteStats) {
  console.log('Saved: ' + indiaTestSiteStats);
  console.log('Error: ' + err);
});

var commonModels = {};

commonModels[config.DATA_APIS.GStats.name] = GStats_common;
commonModels[config.DATA_APIS.IndianStatesStats.name] = IndianStatesStats_common;
commonModels[config.DATA_APIS.IndianTestSiteStats.name] = IndianTestSites_common;

module.exports = commonModels;