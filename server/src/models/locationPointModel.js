var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationPointSchema = new Schema({
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
    required: true,
  },
  sourceType: {
    type: String,
    enum: ['app', 'takeout', 'routeMap'],
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
    required: true,
  },
});

LocationPointSchema.pre('save', function (next) {
  if (!this.lastUpdatedOn) {
    this.lastUpdatedOn = new Date().getTime();
  }

  next();
});

mongoose.model('LocationPoint', LocationPointSchema);
