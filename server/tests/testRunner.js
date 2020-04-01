const glob = require('glob');
const Promise = require('bluebird');
const config = require('../src/utils/config');

const testObjects = [];
const testModules = glob.sync(
  `${config.ROOT}/tests/orchestratedTestObjects/*.js`
);

testModules.forEach((testObject) => {
  require(testObject)(testObjects);
});

Promise.each(testObjects, function (testObject, index, totalNumberOfTests) {
  return testObject
    .setup()
    .then(testObject.run)
    .then(testObject.tearDown)
    .then((isSuccess) => {
      console.log(
        `${index + 1}/${totalNumberOfTests}: ${testObject.name} - ${
          isSuccess === true ? 'SUCCESS' : 'FAILED'
        }`
      );
    })
    .catch((err) => {
      console.log(`${testObject.name} - failed with following error`);
      console.log(err);
    });
})
  .then(() => {
    process.exit(0);
  })
  .catch(() => {
    process.exit(1);
  });
