var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FlaggedLocationPointSchema = new Schema({
  locationPointId: {
    type: String,
    required: true,
  },
  latitudeE7: {
    type: Number,
    required: true,
    validate: function (value) {
      return value > -900000000 && value < 900000000;
    },
  },
  longitudeE7: {
    type: Number,
    required: true,
    validate: function (value) {
      return value > -1800000000 && value < 1800000000;
    },
  },
  accuracy: {
    type: Number,
    required: true,
  },
  startTimestampMs: {
    type: Number,
    required: true,
  },
  endTimestampMs: {
    type: Number,
    required: false,
  },
  epidemicContactDegree: {
    type: Number,
    required: true,
  },
  epidemicContactTimestampMs: {
    type: Number,
    required: true,
  },
  isPurged: {
    type: Boolean,
    default: false,
    required: true,
  },
  lastUpdatedOn: {
    type: Number,
    required: true,
  },
});

mongoose.model('FlaggedLocationPoint', FlaggedLocationPointSchema);
