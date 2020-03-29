const express = require('express');
const excelUpload = require('./../utils/httpFileuploadUtil').excelUpload;
const readXlsxFile = require('read-excel-file/node');
const router = express.Router();

function uploadHandler(req, res, next) {
  readXlsxFile(req.file.path).then((rows) => {
    res.json(rows);
  });
}

router.get('/upload', [excelUpload.single('file'), uploadHandler]);

module.exports = {
  path: '/user',
  router: router,
};
