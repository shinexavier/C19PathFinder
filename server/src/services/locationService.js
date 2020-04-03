const mongoose = require('mongoose');
const FlaggedLocationPoint = mongoose.model('FlaggedLocationPoint');

function getFlaggedLocationPoints() {
  const projections = {
    isPurged: 0,
    _id: 0,
    lastUpdatedOn: 0,
    __v: 0,
  };
  return FlaggedLocationPoint.find({ isPurged: false }).select(projections);
}

module.exports = {
  getFlaggedLocationPoints: getFlaggedLocationPoints,
};
