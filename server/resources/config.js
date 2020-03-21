/*eslint strict: ["error", "global"]*/

'use strict';

var path = require('path');


var rootPath = path.normalize(__dirname + '/..');
var env = process.env.NODE_ENV || 'development';

var config = {
  development: {
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
