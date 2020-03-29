const multer = require('multer');
const path = require('path');
const config = require('./../utils/config');

const excelUploadDir = path.join(
  config.ROOT,
  config.FILE_UPLOAD_PATH,
  './excel'
);

var excelUpload = multer({
  dest: excelUploadDir,
  fileFilter: function multerFileFilter(req, file, callback) {
    var extension = path.extname(file.originalname);
    if (extension !== '.xlsx') {
      return callback(new Error('Only .xlsx are allowed'));
    }
    callback(null, true);
  },
});

module.exports = {
  excelUpload: excelUpload,
};
