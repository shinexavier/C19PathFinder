/*eslint strict: ["error", "global"]*/

'use strict';


var mongoose = require('mongoose');
var LocationPointSchema = require('./locationPoint');
var EpidemicContactSchema = require('./epidemicContact');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  sourceType: {
    type: String,
    enum: ['app', 'takeout', 'routeMap', 'mixed'],
    required: true
  },
  sourceId: {
    type: String,
    required: true
  },
  phone: Number,
  mail: String,
  epidemicContactStatus: EpidemicContactSchema,
  locationHistory: [LocationPointSchema],
  epidemicContactHistory: [EpidemicContactSchema],
  isDeleted: Boolean
});

mongoose.model('User', UserSchema);