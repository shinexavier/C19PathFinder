let covid19TestingSites = function(server){
  server.get('/testingsites', function(req, res, next){
    console.log("recieved call for Testing Sites")
    let listOfvrdls = {
      "version": 1,
      "lastUpdated": {
        "date": "20 March 2020",
        "time": "8.20 PM"
      },
      "sites": [
        {
          "state": "Andhra Pradesh",
          "vrdl": [
            "Sri Venkateswara Institute of Medical Sciences, Tirupati",
            "Rangaraya Medical College, Kakinada",
            "Sidhartha Medical College, Vijayawada",
            "GMC, Anantapur, AP"
          ]
        },
        {
          "state": "Andaman & Nicobar islands",
          "vrdl": [
            "Regional Medical Research Centre, Port Blair, Andaman and Nicobar"
          ]
        },
        {
          "state": "Assam",
          "vrdl": [
            "Gauhati Medical College, Guwahati",
            "Regional Medical Research Center, Dibrugarh",
            "Silchar Medical College, Silchar",
            "Jorhat Medical College, Jorhat"
          ]
        },
        {
          "state": "",
          "vrdl": [
            "",
            "",
            "",
            ""
          ]
        },
        {
          "state": "",
          "vrdl": [
            "",
            "",
            "",
            ""
          ]
        },
        {
          "state": "",
          "vrdl": [
            "",
            "",
            "",
            ""
          ]
        },
        {
          "state": "",
          "vrdl": [
            "",
            "",
            "",
            ""
          ]
        },
        {
          "state": "",
          "vrdl": [
            "",
            "",
            "",
            ""
          ]
        },
        {
          "state": "",
          "vrdl": [
            "",
            "",
            "",
            ""
          ]
        },
        {
          "state": "",
          "vrdl": [
            "",
            "",
            "",
            ""
          ]
        },
        {
          "state": "",
          "vrdl": [
            "",
            "",
            "",
            ""
          ]
        },
        {
          "state": "",
          "vrdl": [
            "",
            "",
            "",
            ""
          ]
        },
        {
          "state": "",
          "vrdl": [
            "",
            "",
            "",
            ""
          ]
        },
        {
          "state": "",
          "vrdl": [
            "",
            "",
            "",
            ""
          ]
        },
        {
          "state": "",
          "vrdl": [
            "",
            "",
            "",
            ""
          ]
        },
        {
          "state": "",
          "vrdl": [
            "",
            "",
            "",
            ""
          ]
        }
      ]
    }
    res.send(listOfvrdls);
    return next()
  });
}
module.exports = covid19TestingSites;
