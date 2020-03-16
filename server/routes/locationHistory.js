const express = require('express');
const upload = require('./../utils/upload');
const utils = require('./../utils/utils');

const router = express.Router();

router.post('/upload', upload.single('file'), function (req, res, next) {
  const locationHistoryJSON = JSON.parse(req.file.buffer.toString());
  res.json(locationHistoryJSON);
});

router.post('/get-schema/path-list', upload.single('file'), function (req, res, next) {
  const locationHistoryJSON = JSON.parse(req.file.buffer.toString());
  res.json(utils.getPathList(locationHistoryJSON));
});

router.post('/get-schema/key-set', upload.single('file'), function (req, res, next) {
  const locationHistoryJSON = JSON.parse(req.file.buffer.toString());
  res.json(utils.getKeySet(locationHistoryJSON));
});

router.post('/get-crosspoints', function (req, res, next) {
  res.send('work in progress!');
});

module.exports = router;
