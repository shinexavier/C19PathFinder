/*eslint strict: ["error", "global"]*/
'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + './../../');

// Load config values from env file
require('dotenv').config();

var config = {
  COSMOSDB_HOST: process.env.COSMOSDB_HOST,
  COSMOSDB_PORT: process.env.COSMOSDB_PORT,
  COSMODDB_USER: process.env.COSMODDB_USER,
  COSMOSDB_PASSWORD: process.env.COSMOSDB_PASSWORD,
  COSMOSDB_DBNAME: process.env.COSMOSDB_DBNAME,
  ROOT: rootPath,
  FILE_UPLOAD_PATH: './resources/upload',
  DATA_APIS: {
    GStats: {
      name: 'GStats',
      ckey: null,
      lastupdatedon: null,
    },
    IndianStatesStats: {
      name: 'IndianStatesStats',
      ckey: null,
      lastupdatedon: null,
    },
    IndianTestSiteStats: {
      name: 'IndianTestSiteStats',
      ckey: null,
      lastupdatedon: null,
    },
  },
  UPLOAD_EXCEL_HEADER_VALUES: [
    'Patient ID',
    'Latitude',
    'Longitude',
    'Date',
    'Time',
    'Proximity',
    'Elapsed Time',
  ],
  SOURCE_TYPES: {
    APP: 'app',
    TAKEOUT: 'takeout',
    ROUTEMAP: 'routeMap',
    MIXED: 'mixed',
  },
};

module.exports = config;
