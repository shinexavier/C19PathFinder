const express = require('express');
const routeMapUpload = require('./../utils/fileuploadUtil').routeMapUpload;
const parseUploadFile = require('./../services/uploadService').parseUploadFile;
const userService = require('./../services/userService');
const router = express.Router();

function uploadHandler(req, res, next) {
  parseUploadFile(req.file.path)
    .then(userService.insertMany)
    .then((users) => {
      return res.json(users);
    })
    .catch((error) => {
      if (error.code = 400) {
        console.log(error);
        return res.send(`file upload failed with error: ${error.message}`);
      } else {
        return next(error);
      }      
    });
}

router.get('/route-map-upload', [routeMapUpload.single('file'), uploadHandler]);

module.exports = {
  path: '/user',
  router: router,
};
