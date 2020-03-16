const express = require('express');
const logger = require('morgan');

const indexRouter  = require('./routes/index');
const locationHistoryRouter  = require('./routes/locationHistory');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/location-history', locationHistoryRouter);

module.exports = app;
