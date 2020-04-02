const express = require('express');
const glob = require('glob');
const path = require('path');
const compress = require('compression');
const morgan = require('morgan');
const config = require('./utils/config');

const app = express();
const STATIC_DIR = path.join(config.ROOT, '/resources/public');
const MORGAN_LOG_FORMAT =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":referrer" ":user-agent"';

app.use(morgan(MORGAN_LOG_FORMAT));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compress());
app.use(express.static(STATIC_DIR));

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
