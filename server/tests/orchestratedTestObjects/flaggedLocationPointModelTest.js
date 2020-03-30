const mongoose = require('mongoose');
const db = require('../../src/db');
const TestObject = require('../TestObject');

const name = 'FlaggedLocationPointModelTest';
const flaggedLocationPointObject = {
  locationPointId: 'test',
  latitudeE7: 85236111,
  longitudeE7: 769502777,
  accuracy: 80,
  startTimestampMs: 819150840000,
  endTimestampMs: 819154440000,
  epidemicContactDegree: 0,
  epidemicContactTimestampMs: 819150840000,
};

function setup() {
  return db.connect();
}

function run() {
  const FlaggedLocationPointModel = mongoose.model('FlaggedLocationPoint');

  const flaggedLocationPoint = new FlaggedLocationPointModel(
    flaggedLocationPointObject
  );

  return flaggedLocationPoint.save();
}

async function tearDown(doc) {
  const FlaggedLocationPointModel = mongoose.model('FlaggedLocationPoint');
  const resultObject = await FlaggedLocationPointModel.deleteMany({
    _id: doc._id,
  });
  return resultObject && resultObject.deletedCount === 1;
}

const locationPointTest = new TestObject(name, setup, run, tearDown);

module.exports = function (testObjectCollection) {
  testObjectCollection.push(locationPointTest);
};
