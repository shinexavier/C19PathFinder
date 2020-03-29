function stub() {
  return Promise.resolve(true);
}

function TestObject(name, setup, run, tearDown) {
  this.name = name || 'unnamed';
  this.setup = setup || stub;
  this.run = run || stub;
  this.tearDown = tearDown || stub;
}

module.exports = TestObject;
