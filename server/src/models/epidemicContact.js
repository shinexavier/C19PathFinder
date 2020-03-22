/*eslint strict: ["error", "global"]*/

'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EpidemicContactSchema = new Schema({
  degreeOfContact: {
    type: Number,
    required: true,
  },
  timestampMs: {
    type: Number,
    required: true
  }
});


module.exports = EpidemicContactSchema;