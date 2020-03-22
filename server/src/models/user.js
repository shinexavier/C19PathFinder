/*eslint strict: ["error", "global"]*/

'use strict';


var mongoose = require('mongoose');
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
  phone: {
    type: Number,
    required: false
  },
  mail: {
    type: String,
    required: false
  },
  degreeOfContact: {
    type: Number,
    required: true
  },
  locationHistory: [{
    type: Schema.Types.ObjectId,
    ref: 'LocationPoint' }]
});

mongoose.model('User', UserSchema);