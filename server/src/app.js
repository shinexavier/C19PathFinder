/*eslint strict: ["error", "global"]*/
'use strict';


var express = require('express');
var glob = require('glob');
var config = require('./../resources/config');


var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var controllers = glob.sync(config.ROOT + '/src/controllers/*.js');
controllers.forEach(function(controller) {
  require(controller)(app);
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
      title: 'error',
    });
  });
}

app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
    title: 'error',
  });
});


module.exports = app;
