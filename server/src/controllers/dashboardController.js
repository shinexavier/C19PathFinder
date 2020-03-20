const express = require('express');

const router = express.Router();


router.get('/', function (req, res, next) {
    let latestFigures = {
        "version": 1,
        "lastUpdated": {
          "date": "20 March 2020",
          "time": "5.20 PM"
        },
        "passengersScreened": {
          "airport": "14,59,993"
        },
        "confirmedCases": {
          "indian": 191,
          "foreign": 32
        },
        "dischargedCases": 22,
        "deathCases": 4
      }
    res.json(latestFigures);
});

router.get('/statewise', function (req, res, next) {
    let latestFigures = {
        "version": 1,
        "lastUpdated": {
          "date": "19 March 2020",
          "time": "6.50 AM"
        },
        "statistics": [
          {
            "state": "Andhra Pradesh",
            "confirmedCases": {
              "indian": 3,
              "foreign": 0
            },
            "dischargedCases": 0,
            "deathCases": 0
          },
          {
            "state": "Chhattisgarh",
            "confirmedCases": {
              "indian": 1,
              "foreign": 0
            },
            "dischargedCases": 0,
            "deathCases": 0
          },
          {
            "state": "Delhi",
            "confirmedCases": {
              "indian": 16,
              "foreign": 1
            },
            "dischargedCases": 5,
            "deathCases": 1
          },
          {
            "state": "Gujarat",
            "confirmedCases": {
              "indian": 5,
              "foreign": 0
            },
            "dischargedCases": 0,
            "deathCases": 0
          },
          {
            "state": "Haryana",
            "confirmedCases": {
              "indian": 3,
              "foreign": 14
            },
            "dischargedCases": 0,
            "deathCases": 0
          },
          {
            "state": "Karnataka",
            "confirmedCases": {
              "indian": 15,
              "foreign": 0
            },
            "dischargedCases": 1,
            "deathCases": 1
          },
          {
            "state": "Kerala",
            "confirmedCases": {
              "indian": 26,
              "foreign": 2
            },
            "dischargedCases": 3,
            "deathCases": 0
          },
          {
            "state": "Maharashtra",
            "confirmedCases": {
              "indian": 49,
              "foreign": 3
            },
            "dischargedCases": 0,
            "deathCases": 1
          },
          {
            "state": "Odisha",
            "confirmedCases": {
              "indian": 2,
              "foreign": 0
            },
            "dischargedCases": 0,
            "deathCases": 0
          },
          {
            "state": "Puducherry",
            "confirmedCases": {
              "indian": 1,
              "foreign": 0
            },
            "dischargedCases": 0,
            "deathCases": 0
          },
          {
            "state": "Punjab",
            "confirmedCases": {
              "indian": 2,
              "foreign": 0
            },
            "dischargedCases": 0,
            "deathCases": 1
          },
          {
            "state": "Rajasthan",
            "confirmedCases": {
              "indian": 15,
              "foreign": 2
            },
            "dischargedCases": 3,
            "deathCases": 0
          },
          {
            "state": "Tamil Nadu",
            "confirmedCases": {
              "indian": 3,
              "foreign": 0
            },
            "dischargedCases": 1,
            "deathCases": 0
          },
          {
            "state": "Telengana",
            "confirmedCases": {
              "indian": 8,
              "foreign": 9
            },
            "dischargedCases": 1,
            "deathCases": 0
          },
          {
            "state": "Chandigarh",
            "confirmedCases": {
              "indian": 1,
              "foreign": 0
            },
            "dischargedCases": 0,
            "deathCases": 0
          },
          {
            "state": "Jammu & Kashmir",
            "confirmedCases": {
              "indian": 4,
              "foreign": 0
            },
            "dischargedCases": 0,
            "deathCases": 0
          },
          {
            "state": "Ladakh",
            "confirmedCases": {
              "indian": 10,
              "foreign": 0
            },
            "dischargedCases": 0,
            "deathCases": 0
          },
          {
            "state": "Uttar Pradesh",
            "confirmedCases": {
              "indian": 22,
              "foreign": 1
            },
            "dischargedCases": 9,
            "deathCases": 0
          },
          {
            "state": "Uttarakhand",
            "confirmedCases": {
              "indian": 3,
              "foreign": 0
            },
            "dischargedCases": 0,
            "deathCases": 0
          },
          {
            "state": "West Bengal",
            "confirmedCases": {
              "indian": 2,
              "foreign": 0
            },
            "dischargedCases": 0,
            "deathCases": 0
          },
        ]
      }
    res.json(latestFigures);
});

module.exports = router;
