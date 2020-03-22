const express = require('express');
const logger = require('morgan');

const indexRouter  = require('./controllers/indexController');
const dashboardRouter  = require('./controllers/dashboardController');
const testingsitesRouter  = require('./controllers/testingsitesController');
//const cdbtestRouter = require('./controllers/cdbtest');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/testingsites', testingsitesRouter);
//app.use('/cdbtest', cdbtestRouter);

module.exports = app;
