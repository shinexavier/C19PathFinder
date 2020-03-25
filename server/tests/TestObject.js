/*eslint strict: ["error", "global"]*/

'use strict';


var TestObject = function(name, setup, run, tearDown, isSuccess) {
  this.name = name;
  this.setup = setup;
  this.run = run;
  this.tearDown = tearDown;
  this.isSuccess = isSuccess;
};

module.exports = TestObject;
