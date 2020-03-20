/*
We will collect victims data and plot it into graph Color Coding Last 5 days - RED Beyond 5 day - AMBER / YELLOW Color code depicts intensity Data - Lat/Long/TimeStamp (Time at which victim was there) 
We can do some slicing views - Per Day View for the last 5 days
*/

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
          "state": "Bihar",
          "vrdl": [
            "Rajendra Memorial Research Institute of Medical Sciences, Patna"
          ]
        },
        {
          "state": "Chandigarh",
          "vrdl": [
            "Post Graduate Institute of Medical Education & Research, Chandigarh"
          ]
        },
        {
          "state": "Chhattisgarh",
          "vrdl": [
            "All India Institute Medical Sciences, Raipur"
          ]
        },
        {
          "state": "Delhi-NCT",
          "vrdl": [
            "All India Institute Medical Sciences, Delhi"
          ]
        },
        {
          "state": "Gujarat",
          "vrdl": [
            "BJ Medical College, Ahmedabad",
            "M.P.Shah Government Medical College, Jamnagar"
          ]
        },
        {
          "state": "Haryana",
          "vrdl": [
            "Pt. B.D. Sharma Post Graduate Inst. of Med. Sciences, Rohtak, Haryana",
            "BPS Govt Medical College, Sonipat"
          ]
        },
        {
          "state": "Himachal pradesh",
          "vrdl": [
            "Indira Gandhi Medical College, Shimla, Himachal Pradesh",
            "Dr.Rajendra Prasad Govt. Med. College, Kangra, Tanda, HP"
          ]
        },
        {
          "state": "Jammu and Kashmir",
          "vrdl": [
            "Sher-e- Kashmir Institute of Medical Sciences, Srinagar",
            "Government Medical College, Jammu",
            "Government Medical College, Srinagar"
          ]
        },
        {
          "state": "Jharkhand",
          "vrdl": [
            "MGM Medical College, Jamshedpur"
          ]
        },
        {
          "state": "Karnataka",
          "vrdl": [
            "Bangalore Medical College & Research Institute, Bangalore",
            "National Institute of Virology Field Unit Bangalore",
            "Mysore Medical College & Research Institute, Mysore",
            "Hassan Inst. of Med. Sciences, Hassan, Karnataka",
            "Shimoga Inst. of Med. Sciences, Shivamogga, Karnataka"
          ]
        },
        {
          "state": "Kerala",
          "vrdl": [
            "National Institute of Virology Field Unit, Kerala",
            "Govt. Medical College, Thriuvananthapuram, Kerala",
            "Govt. Medical College, Kozhikode, Kerala",
            "Govt. Medical College, Thrissur, Kerala"
          ]
        },
        {
          "state": "Madhya Pradesh",
          "vrdl": [
            "All India Institute Medical Sciences, Bhopal",
            "National Institute of Research in Tribal Health (NIRTH), Jabalpur"
          ]
        },
        {
          "state": "Meghalaya",
          "vrdl": [
            "NEIGRI of Health and Medical Sciences, Shillong, Meghalaya"
          ]
        },
        {
          "state": "Maharashtra",
          "vrdl": [
            "Indira Gandhi Government Medical College, Nagpur",
            "Kasturba Hospital for Infectious Diseases, Mumbai",
            "NIV Mumbai Unit"
          ]
        },
        {
          "state": "Manipur",
          "vrdl": [
            "J N Inst. of Med. Sciences Hospital, Imphal-East, Manipur",
            "Regional Institute of Medical Sciences, Imphal"
          ]
        },
        {
          "state": "Odisha",
          "vrdl": [
            "Regional Medical Research Center, Bhubaneswar"
          ]
        },
        {
          "state": "Puducherry",
          "vrdl": [
            "Jawaharlal Institute of Postgraduate Medical Education & Research, Puducherry"
          ]
        },
        {
          "state": "Punjab",
          "vrdl": [
            "Government Medical College, Patiala, Punjab",
            "Government Medical College, Amritsar"
          ]
        },
        {
          "state": "Rajasthan",
          "vrdl": [
            "Sawai Man Singh, Jaipur",
            "Dr. S.N Medical College, Jodhpur",
            "Jhalawar Medical College, Jhalawar, Rajasthan",
            "RNT Medical College, Udaipur",
            "SP Med. College, Bikaner, Rajasthan"
          ]
        },
        {
          "state": "Tamil Nadu",
          "vrdl": [
            "King's Institute of Preventive Medicine & Research, Chennai",
            "Government Medical College, Theni",
            "Tirunelveli Medical College, Tirunelveli",
            "Govt. Medical college, Thiruvarur"
          ]
        },
        {
          "state": "Tripura",
          "vrdl": [
            "Government Medical College, Agartala"
          ]
        },
        {
          "state": "Telangana",
          "vrdl": [
            "Gandhi Medical College, Secunderabad",
            "Osmania Medical College, Hyderabad"
          ]
        },
        {
          "state": "Uttar Pradesh",
          "vrdl": [
            "King's George Medical University, Lucknow",
            "Institute of Medical Sciences, Banaras Hindu University, Varanasi",
            "Jawaharlal Nehru Medical College, Aligarh"
          ]
        },
        {
          "state": "Uttarakhand",
          "vrdl": [
            "Government Medical College, Haldwani"
          ]
        },
        {
          "state": "West Bengal",
          "vrdl": [
            "National Institute of Cholera and Enteric Diseases, Kolkata",
            "IPGMER, Kolkata",
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
