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
  DATA_APIS: {
    GStats: {
      name: 'GStats',
      ckey: null,
      lastupdatedon: null
    },
    IndianStatesStats: {
      name: 'IndianStatesStats',
      ckey: null,
      lastupdatedon: null
    },
    IndianTestSiteStats: {
      name: 'IndianTestSiteStats',
      ckey: null,
      lastupdatedon: null
    }
  }
};


module.exports = config;