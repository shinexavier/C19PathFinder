/*eslint strict: ["error", "global"]*/

'use strict';


var mongoose = require('mongoose');
var db = require('./../../src/db');
var TestObject = require('../TestObject');


var name = 'FlaggedLocationPointTest';
var isSuccess = false;


var locationPointTest = new TestObject(
  name,
  setup,
  run,
  tearDown,
  isSuccess);


function setup() {

};

function run() {
  return db.connect().then(function() {
    var FlaggedLocationPoint = mongoose.model('FlaggedLocationPoint');
    var flaggedLocationPointObject = {
      locationPointId: 'test',
      latitudeE7: 85236111,
      longitudeE7: 769502777,
      accuracy: 80,
      startTimestampMs: 819150840000,
      endTimestampMs: 819154440000,
      epidemicContactDegree: 0,
      epidemicContactTimestampMs: 819150840000,
    };
    var flaggedLocationPoint =
            new FlaggedLocationPoint(flaggedLocationPointObject);
    return flaggedLocationPoint
      .save()
      .then(function(err, obj) {
        if (err) {
          console.error(err);
          locationPointTest.isSuccess = false;
        }

        locationPointTest.isSuccess = true;
      });
  });
};

function tearDown() {
};

module.exports = function(testObjectCollection) {
  testObjectCollection.push(locationPointTest);
};

