/*eslint strict: ["error", "global"]*/

'use strict';


var mongoose = require('mongoose');


var Schema = mongoose.Schema;


var baseConfig = {
  // Need to consider setting up a secondary index here.
  discriminatorKey: '_type',
  collection: 'alldata',
};

var commonModel = mongoose.model('Common', new mongoose.Schema({}, baseConfig));

var GStatsModelSchema = new Schema({
  lastUpdated: {
    type: Date,
    default: Date.now(),
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

var GStats_common = commonModel.discriminator('GStatsType', GStatsModelSchema);

var IndianStatesStatsModelSchema = new Schema({
  lastUpdated: {
    type: Date,
    default: Date.now(),
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

var IndianStatesStats_common = commonModel.discriminator(
  'IndianStatesStatsType',
  IndianStatesStatsModelSchema);


// Test Data -> This data entry would be via a Form or an API
var gstats_common = new GStats_common({
  lastUpdated: new Date('March 20, 2020 17:20:00'),
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

gstats_common.save(function(err, gStats) {
  console.log('Saved: ' + gStats);
  console.log('Error: ' + err);
});

var indianstatesstats_common = new IndianStatesStats_common({
  lastUpdated: new Date('March 19, 2020 06:50:00'),
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

indianstatesstats_common.save(function(err, indiaStatesStats) {
  console.log('Saved: ' + indiaStatesStats);
  console.log('Error: ' + err);
});

module.exports = {
  GStats_common: GStats_common,
  IndianStatesStats_common: IndianStatesStats_common,
};
