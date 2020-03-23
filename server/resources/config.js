/*eslint strict: ["error", "global"]*/

'use strict';

var path = require('path');


var rootPath = path.normalize(__dirname + '/..');
var env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    sampleLocationPointsFile: './data/sample-location-history-for-last-15-days.json',
    COSMODDB_USER: 'c19pathfinder',
    COSMOSDB_PASSWORD: '85IbEdFg3cfCVGm1T5PXhHNsynrcJ6e8tZa3U7HP1l9Rk0mNNr3YDGhmgZMcumRPzoLdpPO2ooGfEJvm9FDG4g==',
    COSMOSDB_DBNAME: 'c19pfstore',
    COSMOSDB_HOST: 'c19pathfinder.mongo.cosmos.azure.com',
    COSMOSDB_PORT: 10255,
    root: rootPath,
    db:
      'mongodb://cosmos-c19pathfinder-dev:' +
      'vY6VqOyTpnMtF9AC4B9DZsDf6tq8vB3BNlxq9UqwmUSj6uM2k276uekZ7TJq04BdQRA3' +
      'zt32PSk3NWwHeurKtg%3D%3D@cosmos-c19pathfinder-dev.mongo.cosmos.azure' +
      '.com:10255/?ssl=true&appName=@cosmos-c19pathfinder-dev@',
  },

  test: {},

  production: {},
};

module.exports = config[env];