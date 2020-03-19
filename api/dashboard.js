let covid19DashBoard = function(server){
  server.get('/finalnumbers', function(req, res, next){
    console.log("recieved call for finalnumbers")
    let latestFigures = {
      "version": 1,
      "lastUpdated": {
        "date": "19 March 2020",
        "time": "8.20 PM"
      },
      "passengersScreened": {
        "airport": "14,31,734"
      },
      "confirmedCases": {
        "indian": 148,
        "foreign": 25
      },
      "dischargedCases": 20,
      "deathCases": 4
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
            "indian": 2,
            "foreign": 0
          },
          "dischargedCases": 0,
          "deathCases": 0
        },
        {
          "state": "Delhi",
          "confirmedCases": {
            "indian": 11,
            "foreign": 1
          },
          "dischargedCases": 3,
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
            "indian": 14,
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
            "indian": 44,
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
            "indian": 2,
            "foreign": 0
          },
          "dischargedCases": 0,
          "deathCases": 1
        },
        {
          "state": "Rajasthan",
          "confirmedCases": {
            "indian": 5,
            "foreign": 2
          },
          "dischargedCases": 3,
          "deathCases": 0
        },
        {
          "state": "Tamil Nadu",
          "confirmedCases": {
            "indian": 2,
            "foreign": 0
          },
          "dischargedCases": 1,
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
            "indian": 8,
            "foreign": 0
          },
          "dischargedCases": 0,
          "deathCases": 0
        },
        {
          "state": "Uttar Pradesh",
          "confirmedCases": {
            "indian": 18,
            "foreign": 1
          },
          "dischargedCases": 9,
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
