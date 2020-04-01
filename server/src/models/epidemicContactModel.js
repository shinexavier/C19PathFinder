var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EpidemicContactSchema = new Schema({
  degreeOfContact: {
    type: Number,
    required: true,
  },
  estimatedTimeOfContact: {
    type: Number,
    required: true,
  },
});

mongoose.model('EpidemicContact', EpidemicContactSchema);
