const express = require('express');
const glob = require('glob');
const config = require('./utils/config');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const controllers = glob.sync(config.ROOT + '/src/controllers/*.js');
controllers.forEach(function (controller) {
  require(controller)(app);
});

app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
      title: 'error',
    });
  });
}

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
    title: 'error',
  });
});

module.exports = app;
