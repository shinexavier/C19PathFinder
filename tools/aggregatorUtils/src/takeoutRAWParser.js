var yieldjs = require('../utils/yield');
var aggregator = require('./aggregator');
var gisUtil = require('./geographicCoordinateSystemUtils');
var toRawData = require('../data/takeoutRAW_B2.json').locations;

Array.prototype.getIterator = yieldjs.iterator;
Function.prototype.getGenerator = yieldjs.generator;

const actualOutput = aggregator(toRawData);
console.log(JSON.stringify(actualOutput));