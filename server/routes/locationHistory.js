const express = require('express');
const upload = require('./../utils/upload');
const utils = require('./../utils/utils');

const router = express.Router();

router.get('/upload', upload.single('file'), function (req, res, next) {
  const locationHistoryJSON = JSON.parse(req.file.buffer.toString());
  res.json(locationHistoryJSON);
});

router.get('/get-schema/path-list', upload.single('file'), function (req, res, next) {
  const locationHistoryJSON = JSON.parse(req.file.buffer.toString());
  res.json(utils.getPathList(locationHistoryJSON));
});

router.get('/get-schema/key-set', upload.single('file'), function (req, res, next) {
  const locationHistoryJSON = JSON.parse(req.file.buffer.toString());
  res.json(utils.getKeySet(locationHistoryJSON));
});

module.exports = router;
