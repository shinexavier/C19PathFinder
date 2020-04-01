var fs = require('fs');
var yieldjs = require("../utils/yield");
var aggregator = require("./aggregator");
var gisUtil = require("./geographicCoordinateSystemUtils");
var toRawData = require('./../data/Location History.json')
  .locations;

// Array.prototype.getIterator = yieldjs.iterator;
// Function.prototype.getGenerator = yieldjs.generator;
const actualOutput = aggregator(toRawData);
console.log(actualOutput);

fs.writeFile("./output/rawParserOutput.json", JSON.stringify(actualOutput), () => {
  console.log('done!');
});
