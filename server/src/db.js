/*eslint strict: ["error", "global"]*/
'use strict';

var mongoose = require('mongoose');
var glob = require('glob');
var config = require('./utils/config');

// Plugin bluebird promise implementation
mongoose.Promise = require('bluebird');

// Enabling mongoose debug to true for query logging
mongoose.set('debug', true);

var connectionString =
  'mongodb://' +
  config.COSMOSDB_HOST +
  ':' +
  config.COSMOSDB_PORT +
  '/' +
  config.COSMOSDB_DBNAME +
  '?ssl=true&replicaSet=globaldb&retrywrites=false';

// Connect to db
function connect() {
  return mongoose
    .connect(connectionString, {
      auth: {
        user: config.COSMODDB_USER,
        password: config.COSMOSDB_PASSWORD,
      },
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
    })
    .then(function () {
      console.log('connected to database: ' + config.COSMOSDB_DBNAME);

      var models = glob.sync(config.ROOT + '/src/models/*.js');
      models.forEach(function (model) {
        require(model);
      });
    })
    .catch(function (err) {
      console.error(err);
      throw new Error(
        'unable to connect to database: ' + config.COSMOSDB_DBNAME
      );
    });
}

module.exports = {
  connect: connect,
};
