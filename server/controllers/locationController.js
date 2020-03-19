const express = require('express');
const upload = require('../utils/httpFileupload');
const appUtils = require('../utils/appUtils');
const locationService = require('../services/locationService');

const router = express.Router();

router.post('/upload', upload.single('file'), function (req, res, next) {
  const locationHistoryJSON = JSON.parse(req.file.buffer.toString());
  res.json(locationHistoryJSON);
});

router.post('/get-schema/path-list', upload.single('file'), function (req, res, next) {
  const locationHistoryJSON = JSON.parse(req.file.buffer.toString());
  res.json(appUtils.getPathList(locationHistoryJSON));
});

router.post('/get-schema/key-set', upload.single('file'), function (req, res, next) {
  const locationHistoryJSON = JSON.parse(req.file.buffer.toString());
  res.json(appUtils.getKeySet(locationHistoryJSON));
});

router.get('/get-affected-location-points', function (req, res, next) {
  locationService.getAffectedLocationPoints()
    .then(function (data) {
      res.json(data);
    })
    .catch(next);
});

router.post('/crosspoints', upload.single('file'), async function (req, res, next) {
  const userlocationHistory = JSON
    .parse(req.file.buffer.toString())
    .map(locationPoint => {
      return {
        timestampMs: +locationPoint.timestampMs,
        latitudeE7: +locationPoint.latitudeE7,
        longitudeE7: +locationPoint.longitudeE7,
        accuracy: +locationPoint.accuracy
      }
    })
    .filter(locationPoint => !isNaN(locationPoint.timestampMs));
  const affectedLocationPoints = await locationService.getAffectedLocationPoints();
  const crosspoints = locationService.getCrosspoints(userlocationHistory, affectedLocationPoints);
  res.json(crosspoints);
});

module.exports = router;
