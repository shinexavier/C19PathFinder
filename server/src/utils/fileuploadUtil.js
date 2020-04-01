const multer = require('multer');
const path = require('path');
const config = require('./config');

const routeMapUploadDir = path.join(
  config.ROOT,
  config.FILE_UPLOAD_PATH,
  './routeMaps'
);

var routeMapUpload = multer({
  dest: routeMapUploadDir,
  fileFilter: function multerFileFilter(req, file, callback) {
    var extension = path.extname(file.originalname);
    if (extension !== '.csv') {
      return callback(new Error('Only .csv are allowed'));
    }
    callback(null, true);
  },
});

module.exports = {
  routeMapUpload: routeMapUpload,
};
