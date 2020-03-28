/*eslint strict: ["error", "global"]*/

'use strict';


var glob = require('glob');
var config = require('./../resources/config');

var testObjectCollection = [];
var testObjects =
    glob.sync(config.ROOT + '/tests/orchestratedTestObjects/*.js');

testObjects.forEach(function(testObject) {
  require(testObject)(testObjectCollection);
});

// var totalNumberOfTests = testObjectCollection.length;

testObjectCollection.forEach(function(testObject, index) {
  // testObject
  //     .setup()
  //     .then(testObject.run)
  //     .then(testObject.tearDown)
  //     .then(function () {
  //         console.log(`${index + 1}/${totalNumberOfTests}: ${testObject.name}
  //   - ${testObject.isSuccess ? 'SUCCESS' : 'FAILED'}`);
  //     })
  //     .catch(function (err) {
  //         console.log(
  //   `${index + 1}/${totalNumberOfTests}: ${testObject.name} - failed`);
  //     })
  testObject
    .run()
    .then(function() {
      console.log('SUCCESS');
    })
    .catch(function(err) {
      if (err) {
        console.log('FAILED');
      }
    });
});
