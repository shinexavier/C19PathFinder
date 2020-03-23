/*eslint strict: ["error", "global"]*/

'use strict';

var express = require('express');

var router = express.Router();

module.exports = function(app) {
  app.use('/testingsites', router);
};

router.get('/', function(req, res, next) {
  var listOfvrdls = {
    version: 1,
    lastUpdated: {
      date: '20 March 2020',
      time: '8.20 PM',
    },
    sites: [
      {
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
    ],
  };
  res.json(listOfvrdls);
});
