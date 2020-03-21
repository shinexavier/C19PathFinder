/*eslint strict: ["error", "global"]*/

'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  sourceType: {
    type: String,
    enum: ['app', 'takeout', 'manual', 'mixed'],
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
    ref: 'Event' }]
});

mongoose.model('User', UserSchema);