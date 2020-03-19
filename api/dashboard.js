let covid19DashBoard = function(server){
  server.get('/finalnumbers', function(req, res, next){
    let latestFigures = {
      "version": 1,
      "lastUpdated": {
        "date": "19 March 2020",
        "time": "6.20 AM"
      },
      "passengersScreened": {
        "airport": "13,93,301"
      },
      "confirmedCases": 134,
      "dischargedCases": 14,
      "deathCases": 3
    }
    res.send(latestFigures);
    return next()
  });

  server.get('/finalnumbers/statewise', function(req, res, next){
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
            "indian": 1,
            "foreign": 0
          },
          "dischargedCases": 0,
          "deathCases": 0
        },
        {
          "state": "Delhi",
          "confirmedCases": {
            "indian": 9,
            "foreign": 1
          },
          "dischargedCases": 2,
          "deathCases": 1
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
            "indian": 11,
            "foreign": 0
          },
          "dischargedCases": 0,
          "deathCases": 1
        },
        {
          "state": "Kerala",
          "confirmedCases": {
            "indian": 25,
            "foreign": 2
          },
          "dischargedCases": 3,
          "deathCases": 0
        },
        {
          "state": "Maharashtra",
          "confirmedCases": {
            "indian": 39,
            "foreign": 3
          },
          "dischargedCases": 0,
          "deathCases": 1
        },
        {
          "state": "Odisha",
          "confirmedCases": {
            "indian": 1,
            "foreign": 0
          },
          "dischargedCases": 0,
          "deathCases": 0
        },
        {
          "state": "Pondichery",
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
            "indian": 1,
            "foreign": 0
          },
          "dischargedCases": 0,
          "deathCases": 0
        },
        {
          "state": "Rajasthan",
          "confirmedCases": {
            "indian": 2,
            "foreign": 2
          },
          "dischargedCases": 3,
          "deathCases": 0
        },
        {
          "state": "Tamil Nadu",
          "confirmedCases": {
            "indian": 1,
            "foreign": 0
          },
          "dischargedCases": 0,
          "deathCases": 0
        },
        {
          "state": "Telengana",
          "confirmedCases": {
            "indian": 4,
            "foreign": 2
          },
          "dischargedCases": 1,
          "deathCases": 0
        },
        {
          "state": "Jammu & Kashmir",
          "confirmedCases": {
            "indian": 3,
            "foreign": 0
          },
          "dischargedCases": 0,
          "deathCases": 0
        },
        {
          "state": "Ladakh",
          "confirmedCases": {
            "indian": 8,
            "foreign": 0
          },
          "dischargedCases": 0,
          "deathCases": 0
        },
        {
          "state": "Uttar Pradesh",
          "confirmedCases": {
            "indian": 15,
            "foreign": 1
          },
          "dischargedCases": 5,
          "deathCases": 0
        },
        {
          "state": "Uttarakhand",
          "confirmedCases": {
            "indian": 1,
            "foreign": 0
          },
          "dischargedCases": 0,
          "deathCases": 0
        },
        {
          "state": "West Bengal",
          "confirmedCases": {
            "indian": 1,
            "foreign": 0
          },
          "dischargedCases": 0,
          "deathCases": 0
        },
      ]
    }
    res.send(latestFigures);
    return next()
  });
}
module.exports = covid19DashBoard;
