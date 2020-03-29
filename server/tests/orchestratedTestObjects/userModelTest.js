const mongoose = require('mongoose');
const db = require('../../src/db');
const TestObject = require('../TestObject');

const name = 'UserModelTest';

const userObject = {
  userId: 'test',
  sourceType: 'routeMap',
  sourceId: 'test',
  phone: 9496336175,
  name: 'Vaisakh Babu',
  epidemicContactStatus: {},
  locationHistory: [],
  epidemicContactHistory: [],
};

const epidemicContact = {
  degreeOfContact: 0,
  timestampMs: 819150840000,
};

const locationPointObject = {
  locationPointId: 'test',
  latitudeE7: 85236111,
  longitudeE7: 769502777,
  accuracy: 80,
  startTimestampMs: 819150840000,
  endTimestampMs: 819154440000,
  sourceType: 'routeMap',
  epidemicContactTimestampMs: 819150840000,
};

function setup() {
  return db.connect();
}

function run() {
  const User = mongoose.model('User');
  const LocationPointModel = mongoose.model('LocationPoint');
  const EpidemicContactModel = mongoose.model('EpidemicContact');

  const epidemicContactStatus = new EpidemicContactModel(epidemicContact);
  const epidemicContactHistory = [epidemicContactStatus];
  const locationPoint = new LocationPointModel(locationPointObject);
  const locationHistory = [locationPoint];

  userObject.epidemicContactHistory = epidemicContactHistory;
  userObject.epidemicContactStatus = epidemicContactStatus;
  userObject.locationHistory = locationHistory;

  const user = new User(userObject);

  return user.save();
}

async function tearDown(doc) {
  const User = mongoose.model('User');
  const resultObject = await User.deleteMany({
    _id: doc._id,
  });
  return resultObject && resultObject.deletedCount === 1;
}

const locationPointTest = new TestObject(name, setup, run, tearDown);

module.exports = function (testObjectCollection) {
  testObjectCollection.push(locationPointTest);
};
