const express = require('express');
const locationService = require('./../services/locationService');

const router = express.Router();

async function getFlaggedLocationPointHandler(req, res, next) {
  return locationService
    .getFlaggedLocationPoints()
    .then((locationPoints) => res.json(locationPoints))
    .catch(next);
}

router.get('/flagged', getFlaggedLocationPointHandler);

module.exports = (app) => {
  app.use('/location', router);
};
