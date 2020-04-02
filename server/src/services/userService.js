const mongoose = require('mongoose');
const User = mongoose.model('User');

// Method to bulk insert user
function insertMany(users) {
  let session = null;
  return mongoose
    .startSession()
    .then((_session) => {
      session = _session;
      session.startTransaction();
    })
    .then(() => {
      return User.insertMany(users);
    })
    .then((users) => {
      session.commitTransaction();
      return users;
    });
}

module.exports = {
  insertMany: insertMany,
};
