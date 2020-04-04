const mongoose = require('mongoose');
const Promise = require('bluebird');

const User = mongoose.model('User');
const FlaggedLocationPoint = mongoose.model('FlaggedLocationPoint');

// Method to get a single user by userId
function getUser(userId) {
  return User.findOne({ userId: userId, isDeleted: false });
}

// Method to update user
function upsertUser(userId, userObject) {
  const conditions = { userId: userId };
  const options = {
    new: true,
    upsert: true,
    fields: '-_id -__v',
  };

  return User.findOneAndUpdate(conditions, userObject, options);
}

// Method to bulk insert user
function insertMany(users) {
  let session = null;
  return mongoose
    .startSession()
    .then((_session) => {
      session = _session;
      session.startTransaction();
    })
    .then(() => {
      return User.insertMany(users);
    })
    .then((users) => {
      session.commitTransaction();
      return users;
    });
}

function getFlaggedLocationPoints(user) {
  const locationHistory = user.locationHistory;

  const flaggedLocationPoints = locationHistory
    .filter((locationPoint) => !locationPoint.isDeleted)
    .map((locationPoint) => {
      const flaggedLocationPoint = new FlaggedLocationPoint();

      flaggedLocationPoint.locationPointId = locationPoint.locationPointId;
      flaggedLocationPoint.latitudeE7 = locationPoint.latitudeE7;
      flaggedLocationPoint.longitudeE7 = locationPoint.longitudeE7;
      flaggedLocationPoint.accuracy = locationPoint.accuracy;
      flaggedLocationPoint.startTimestampMs = locationPoint.startTimestampMs;
      flaggedLocationPoint.endTimestampMs = locationPoint.endTimestampMs;
      flaggedLocationPoint.epidemicContactDegree =
        user.epidemicContactStatus.degreeOfContact;
      flaggedLocationPoint.epidemicContactTimestampMs =
        user.epidemicContactStatus.estimatedTimeOfContact;
      flaggedLocationPoint.isPurged = false;
      flaggedLocationPoint.lastUpdatedOn = new Date().getTime();

      return flaggedLocationPoint;
    });

  return flaggedLocationPoints;
}

// Method to verify the user
function verifyUser(userId) {
  let session = null;

  return mongoose
    .startSession()
    .then((_session) => {
      session = _session;
      session.startTransaction();
    })
    .then(() => {
      return User.findOne({ userId: userId });
    })
    .then((user) => {
      user.isVerified = true;
      return user.save();
    })
    .then(getFlaggedLocationPoints)
    .then((flaggedLocationPoints) => {
      return FlaggedLocationPoint.insertMany(flaggedLocationPoints);
    })
    .then((flaggedLocationPoints) => {
      session.commitTransaction();
      return flaggedLocationPoints;
    })
    .catch((error) => {
      console.log(error);
      throw new Error('User verification failed.');
    });
}

// Method to check whether the user is verified or not
function isUserVerified(userId) {
  return User.findOne({ userId: userId, isDeleted: false })
    .select('isVerified')
    .lean()
    .then((user) => user && user.isVerified);
}

module.exports = {
  getUser: getUser,
  upsertUser: upsertUser,
  insertMany: insertMany,
  isUserVerified: isUserVerified,
  verifyUser: verifyUser,
};
