const glob = require('glob');
const config = require('../src/utils/config');

const testObjects = [];
const testModules = glob.sync(
  `${config.ROOT}/tests/orchestratedTestObjects/*.js`
);

testModules.forEach((testObject) => {
  require(testObject)(testObjects);
});

const totalNumberOfTests = testObjects.length;

const testObjectPromises = testObjects.map((testObject, index) => {
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
});

Promise.all(testObjectPromises).then(function () {
  process.exit(1);
});
