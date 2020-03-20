const multer = require('multer');

const storage = multer.memoryStorage();
const httpFileuploadUtil = multer({ storage: storage });

module.exports = httpFileuploadUtil;