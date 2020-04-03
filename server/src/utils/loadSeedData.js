/*eslint strict: ["error", "global"]*/

'use strict';


var mongoose = require('mongoose');
var db = require('./../db');
var commonModel = require('./../models/commonModel');


var GStats_common = commonModel.GStats;
var IndianStatesStats_common = commonModel.IndianStatesStats;
var IndianTestSites_common = commonModel.IndianTestSiteStats;


db.connect().then(function () {
  // Test Data -> This data entry would be via a Form or an API
  var gstats_common = new GStats_common({
    lastUpdatedOn: new Date('March 20, 2020 17:20:00').getTime(),
    passengersScreened: {
      airport: 1459993,
    },
    confirmedCases: {
      indian: 2546,
      foreign: 0,
    },
    dischargedCases: 162,
    deathCases: 62,
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
        indian: 132,
        foreign: 0,
      },
      dischargedCases: 1,
      deathCases: 1,
    },
    {
      state: 'Andaman and Nicobar Islands',
      confirmedCases: {
        indian: 10,
        foreign: 0,
      },
      dischargedCases: 0,
      deathCases: 0,
    },
    {
      state: 'Arunachal Pradesh',
      confirmedCases: {
        indian: 10,
        foreign: 0,
      },
      dischargedCases: 0,
      deathCases: 0,
    },
    {
      state: 'Assam',
      confirmedCases: {
        indian: 16,
        foreign: 0,
      },
      dischargedCases: 0,
      deathCases: 0,
    },

    {
      state: 'Bihar',
      confirmedCases: {
        indian: 29,
        foreign: 0,
      },
      dischargedCases: 0,
      deathCases: 1,
    },    
    {
      state: 'Chandigarh',
      confirmedCases: {
        indian: 18,
        foreign: 0,
      },
      dischargedCases: 0,
      deathCases: 1,
    },         
    {
      state: 'Chhattisgarh',
      confirmedCases: {
        indian: 9,
        foreign: 0,
      },
      dischargedCases: 3,
      deathCases: 0,
    },
    {
      state: 'Delhi',
      confirmedCases: {
        indian: 219,
        foreign: 0,
      },
      dischargedCases: 8,
      deathCases: 4,
    },
    {
      state: 'Goa',
      confirmedCases: {
        indian: 6,
        foreign: 0,
      },
      dischargedCases: 0,
      deathCases: 0,
    },    
    {
      state: 'Gujarat',
      confirmedCases: {
        indian: 95,
        foreign: 0,
      },
      dischargedCases: 10,
      deathCases: 8,
    },
    {
      state: 'Haryana',
      confirmedCases: {
        indian: 49,
        foreign: 0,
      },
      dischargedCases: 24,
      deathCases: 0,
    },

    {
      state: 'Himachal Pradesh',
      confirmedCases: {
        indian: 6,
        foreign: 0,
      },
      dischargedCases: 1,
      deathCases: 1,
    },  
    {
      state: 'Jammu and Kashmir',
      confirmedCases: {
        indian: 75,
        foreign: 0,
      },
      dischargedCases: 3,
      deathCases: 2,
    }, 
    {
      state: 'Jharkhand',
      confirmedCases: {
        indian: 2,
        foreign: 0,
      },
      dischargedCases: 0,
      deathCases: 0,
    },                
    {
      state: 'Karnataka',
      confirmedCases: {
        indian: 124,
        foreign: 0,
      },
      dischargedCases: 10,
      deathCases: 3,
    },
    {
      state: 'Kerala',
      confirmedCases: {
        indian: 286,
        foreign: 0,
      },
      dischargedCases: 27,
      deathCases: 2,
    },

    {
      state: 'Ladakh',
      confirmedCases: {
        indian: 14,
        foreign: 0,
      },
      dischargedCases: 3,
      deathCases: 0,
    },   
    {
      state: 'Madhya Pradesh',
      confirmedCases: {
        indian: 104,
        foreign: 0,
      },
      dischargedCases: 0,
      deathCases: 6,
    },        
    {
      state: 'Maharashtra',
      confirmedCases: {
        indian: 335,
        foreign: 0,
      },
      dischargedCases: 42,
      deathCases: 16,
    },
    {
      state: 'Manipur',
      confirmedCases: {
        indian: 2,
        foreign: 0,
      },
      dischargedCases: 0,
      deathCases: 0,
    },
    {
      state: 'Mizoram',
      confirmedCases: {
        indian: 1,
        foreign: 0,
      },
      dischargedCases: 0,
      deathCases: 0,
    },        
    {
      state: 'Odisha',
      confirmedCases: {
        indian: 5,
        foreign: 0,
      },
      dischargedCases: 0,
      deathCases: 0,
    },
    {
      state: 'Puducherry',
      confirmedCases: {
        indian: 5,
        foreign: 0,
      },
      dischargedCases: 1,
      deathCases: 0,
    },
    {
      state: 'Punjab',
      confirmedCases: {
        indian: 48,
        foreign: 0,
      },
      dischargedCases: 1,
      deathCases: 5,
    },
    {
      state: 'Rajasthan',
      confirmedCases: {
        indian: 167,
        foreign: 0,
      },
      dischargedCases: 3,
      deathCases: 0,
    },
    {
      state: 'Tamil Nadu',
      confirmedCases: {
        indian: 309,
        foreign: 0,
      },
      dischargedCases: 6,
      deathCases: 1,
    },
    {
      state: 'Telengana',
      confirmedCases: {
        indian: 158,
        foreign: 0,
      },
      dischargedCases: 1,
      deathCases: 7,
    },
    {
      state: 'Uttarakhand',
      confirmedCases: {
        indian: 10,
        foreign: 0,
      },
      dischargedCases: 2,
      deathCases: 0,
    },    
    {
      state: 'Uttar Pradesh',
      confirmedCases: {
        indian: 172,
        foreign: 0,
      },
      dischargedCases: 14,
      deathCases: 2,
    },

    {
      state: 'West Bengal',
      confirmedCases: {
        indian: 63,
        foreign: 0,
      },
      dischargedCases: 3,
      deathCases: 3,
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
});