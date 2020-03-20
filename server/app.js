const express = require('express');
const logger = require('morgan');

const indexRouter  = require('./controllers/indexController');
const locationRouter  = require('./controllers/locationController');
const dashboardRouter  = require('./controllers/dashboardController');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/location', locationRouter);
app.use('/finalnumbers', dashboardRouter);

module.exports = app;
