// Test modele for validateHeaders method of src\services\uploadService.js

const name = 'uploadService:validateHeaders';
const TestObject = require('../TestObject');

function setup() {
  return Promise.resolve();
}

function run() {
  return Promise.resolve();
}

function tearDown(doc) {
  return Promise.resolve();
}

const locationPointTest = new TestObject(name, setup, run, tearDown);

module.exports = function (testObjectCollection) {
  testObjectCollection.push(locationPointTest);
};
