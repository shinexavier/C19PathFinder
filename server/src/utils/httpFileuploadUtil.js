/*eslint strict: ["error", "global"]*/

'use strict';

var multer = require('multer');

var storage = multer.memoryStorage();
var httpFileuploadUtil = multer({ storage: storage });

module.exports = httpFileuploadUtil;
