/*eslint strict: ["error", "global"]*/

'use strict';

var express = require('express');

var router = express.Router();

module.exports = function(app) {
  app.use('/finalnumbers', router);
};

router.get('/', function(req, res, next) {
  var latestFigures = {
    version: 1,
    lastUpdated: {
      date: '21 March 2020',
      time: '4.20 PM',
    },
    passengersScreened: {
      airport: '14,59,993',
    },
    confirmedCases: {
      indian: 219,
      foreign: 39,
    },
    dischargedCases: 23,
    deathCases: 4,
  };
  res.json(latestFigures);
});

router.get('/statewise', function(req, res, next) {
  var latestFigures = {
    version: 1,
    lastUpdated: {
      date: '21 March 2020',
      time: '4.20 PM',
    },
    statistics: [
      {
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
          indian: 25,
          foreign: 1,
        },
        dischargedCases: 5,
        deathCases: 1,
      },
      {
        state: 'Gujarat',
        confirmedCases: {
          indian: 7,
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
          indian: 33,
          foreign: 7,
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
          foreign: 11,
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
          indian: 13,
          foreign: 0,
        },
        dischargedCases: 0,
        deathCases: 0,
      },
      {
        state: 'Uttar Pradesh',
        confirmedCases: {
          indian: 23,
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
  };
  res.json(latestFigures);
});
