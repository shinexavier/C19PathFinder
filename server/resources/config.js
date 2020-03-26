/*eslint strict: ["error", "global"]*/

'use strict';

var path = require('path');


var rootPath = path.normalize(__dirname + '/..');
var env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    COSMODDB_USER: 'c19pathfinder',
    COSMOSDB_PASSWORD: '85IbEdFg3cfCVGm1T5PXhHNsynrcJ6e8tZa3U7HP1l9Rk0mNNr3Y' +
      'DGhmgZMcumRPzoLdpPO2ooGfEJvm9FDG4g==',
    COSMOSDB_DBNAME: 'c19pfstore',
    COSMOSDB_HOST: 'c19pathfinder.mongo.cosmos.azure.com',
    COSMOSDB_PORT: 10255,
    ROOT: rootPath,
  },

  dev_vai: {
    COSMODDB_USER: 'cosmos-c19pathfinder-dev',
    COSMOSDB_PASSWORD: 'vY6VqOyTpnMtF9AC4B9DZsDf6tq8vB3BNlxq9UqwmUSj6uM2k276' +
      'uekZ7TJq04BdQRA3zt32PSk3NWwHeurKtg%3D%3D',
    COSMOSDB_HOST: 'cosmos-c19pathfinder-dev.mongo.cosmos.azure.com',
    COSMOSDB_PORT: 10255,
    COSMOSDB_DBNAME: 'cosmos-c19pathfinder-dev',
    ROOT: rootPath,
  },

  test: {},

  production: {},
};

module.exports = config[env];
