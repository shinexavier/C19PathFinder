const express = require('express');
const excelUpload = require('./../utils/httpFileuploadUtil').excelUpload;
const parseUploadFile = require('./../services/uploadService').parseUploadFile;
const router = express.Router();

function uploadHandler(req, res, next) {
  parseUploadFile(req.file.path)
    .then(() => {
      res.send('file upload is successful');
    })
    .catch((err) => {
      res.send(`file upload failed with error: ${err.message}`);
    });
}

router.get('/upload', [excelUpload.single('file'), uploadHandler]);

module.exports = {
  path: '/user',
  router: router,
};
