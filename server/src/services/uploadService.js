const readXlsxFile = require('read-excel-file/node');
const { uuid } = require('uuidv4');
const mongoose = require('mongoose');
const config = require('./../utils/config');
const User = mongoose.model('User');
const E7 = 10000000;

// Method to validate the headers of the excel
// TODO: Write unit tests
function validateHeaders(headerRow) {
  return (
    headerRow[0].trim() === config.UPLOAD_EXCEL_HEADER_VALUES[0] &&
    headerRow[1].trim() === config.UPLOAD_EXCEL_HEADER_VALUES[1] &&
    headerRow[2].trim() === config.UPLOAD_EXCEL_HEADER_VALUES[2] &&
    headerRow[3].trim() === config.UPLOAD_EXCEL_HEADER_VALUES[3] &&
    headerRow[4].trim() === config.UPLOAD_EXCEL_HEADER_VALUES[4] &&
    headerRow[5].trim() === config.UPLOAD_EXCEL_HEADER_VALUES[5] &&
    headerRow[6].trim() === config.UPLOAD_EXCEL_HEADER_VALUES[6]
  );
}

// Method to create locationPoint from uploadUserPoint
// TODO: Write unit tests
function getLocationPoint(uploadUserPoint) {
  const startTimestampMs = new Date(
    `${uploadUserPoint.date}T${uploadUserPoint.time}+05:30`
  ).getTime();

  if (uploadUserPoint.proximity > 1000) {
    return null;
  }
  if (uploadUserPoint.latitude > 90) {
    return null;
  }
  if (uploadUserPoint.longitude > 180) {
    return null;
  }
  if (Number.isNaN(startTimestampMs)) {
    return null;
  }

  const endTimestampMs = startTimestampMs + uploadUserPoint.elapsedTime * 60;

  const locationPointObject = {
    locationPointId: uuid(),
    latitudeE7: uploadUserPoint.latitude * E7,
    longitudeE7: uploadUserPoint.longitude * E7,
    accuracy: uploadUserPoint.proximity,
    startTimestampMs: startTimestampMs,
    endTimestampMs: endTimestampMs,
    sourceType: config.SOURCE_TYPES.ROUTEMAP,
  };

  return null;
}

function parseUploadFile(filePath) {
  return readXlsxFile(filePath).then((rows) => {
    if (!validateHeaders(rows[0])) {
      throw new Error('Invalidate header values');
    }

    const users = {};
    for (let i = 0; i < rows.length; i++) {
      const uploadUserPoint = {
        patientId: rows[i][0],
        latitude: rows[i][1],
        longitude: rows[i][2],
        dateTime: rows[i][3],
        proximity: rows[i][4],
        elapsedTime: rows[i][5],
      };
      let locationPointObject = validateContentRow(uploadUserPoint);

      if (!locationPointObject) {
        throw new Error(`Error on line number: ${i}`);
      }

      let user = users[rows[i][0]];
      if (!user) {
        user = new User();
        user.userId = uuid();
        user.sourceType = config.SOURCE_TYPES.ROUTEMAP;
        user.sourceId = rows[i][0];
      }
    }
  });
}

module.exports = {
  parseUploadFile: parseUploadFile,
};
