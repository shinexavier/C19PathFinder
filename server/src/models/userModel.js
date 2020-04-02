var mongoose = require('mongoose');
var LocationPointSchema = require('./locationPointModel');
var EpidemicContactSchema = require('./epidemicContactModel');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  sourceType: {
    type: String,
    enum: ['app', 'takeout', 'routeMap', 'mixed'],
    required: true,
  },
  sourceId: {
    type: String,
    required: true,
  },
  phone: Number,
  name: String,
  epidemicContactStatus: EpidemicContactSchema,
  locationHistory: [LocationPointSchema],
  epidemicContactHistory: [EpidemicContactSchema],
  isDeleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
    required: true,
  },
});

mongoose.model('User', UserSchema);
