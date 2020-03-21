/*eslint strict: ["error", "global"]*/

'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VictimLocationPointSchema = new Schema({
  locationPointId: {
    type: Schema.Types.ObjectId,
    ref: 'LocationPoint'
  },
  latitudeE7: {
    type: Number,
    required: true,
    validate: function(value) {
      return (value > -900000000 && value < 900000000);
    }
  },
  longitude7: {
    type: Number,
    required: true,
    validate: function(value) {
      return (value > -1800000000 && value < 1800000000);
    }
  },
  accuracy: {
    type: Number,
    required: true
  },
  altitude: {
    type: Number,
    required: false
  },
  verticalAccuracy: {
    type: Number,
    required: false
  },
  timestampMs: {
    type: Number,
    required: true
  },
  elapsedTimeMs: {
    type: Number,
    required: false
  },
  activity: {
    type: String,
    required: false
  },
  activityConfidence: {
    type: Number,
    required: false
  },
  sourceType: {
    type: String,
    enum: ['app', 'takeout', 'manual'],
    required: true
  },
  lastUpdatedOn: {
    type: Number,
    required: true
  },
  lastUpdatedBy: {
    type: String,
    required: true
  }
});

VictimLocationPointSchema.pre('save', function(next) {
  if (!this.lastUpdatedOn) {
    this.lastUpdatedOn = new Date().getTime();
  }

  next();
});

mongoose.model('VictimLocationPoint', VictimLocationPointSchema);
