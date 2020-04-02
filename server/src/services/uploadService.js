const fs = require('fs');
const csv = require('fast-csv');
const { uuid } = require('uuidv4');
const mongoose = require('mongoose');
const config = require('./../utils/config');
const User = mongoose.model('User');
const LocationPoint = mongoose.model('LocationPoint');
const EpidemicContact = mongoose.model('EpidemicContact');

const E7 = 10000000;
const PATIENTID_KEY = config.UPLOAD_EXCEL_HEADER_VALUES[0];
const LATITUDE_KEY = config.UPLOAD_EXCEL_HEADER_VALUES[1];
const LONGITUDE_KEY = config.UPLOAD_EXCEL_HEADER_VALUES[2];
const DATE_KEY = config.UPLOAD_EXCEL_HEADER_VALUES[3];
const TIME_KEY = config.UPLOAD_EXCEL_HEADER_VALUES[4];
const PROXIMITY_KEY = config.UPLOAD_EXCEL_HEADER_VALUES[5];
const ELAPSED_KEY = config.UPLOAD_EXCEL_HEADER_VALUES[6];

// Method to read CSV file
function readCSVFile(filePath) {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on('error', function (error) {
        reject(error);
      })
      .on('data', function (row) {
        rows.push(row);
      })
      .on('end', function () {
        resolve(rows);
      });
  });
}

// Method to validate the headers of the excel
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
function getLocationPoint(uploadUserPoint) {
  let startTimestampMs;
  let endTimestampMs;

  if (uploadUserPoint[PROXIMITY_KEY] > 1000) {
    throw new Error('invalid proximity field');
  }
  if (uploadUserPoint[LATITUDE_KEY] > 90) {
    throw new Error('invalid latitude field');
  }
  if (uploadUserPoint[LONGITUDE_KEY] > 180) {
    throw new Error('invalid longitude field');
  }

  const dateTimeString = `${uploadUserPoint[DATE_KEY]}T${uploadUserPoint[TIME_KEY]}+05:30`;
  try {
    startTimestampMs = new Date(dateTimeString).getTime();
  } catch {
    throw new Error('invalid date and time fields');
  } finally {
    if (Number.isNaN(startTimestampMs)) {
      throw new Error('invalid date and time fields');
    }
  }

  endTimestampMs = startTimestampMs + uploadUserPoint[ELAPSED_KEY] * 60;

  const locationPointObject = {
    locationPointId: uuid(),
    latitudeE7: Number.parseInt(uploadUserPoint[LATITUDE_KEY] * E7, 10),
    longitudeE7: Number.parseInt(uploadUserPoint[LONGITUDE_KEY] * E7, 10),
    accuracy: uploadUserPoint[PROXIMITY_KEY],
    startTimestampMs: startTimestampMs,
    endTimestampMs: endTimestampMs,
    sourceType: config.SOURCE_TYPES.ROUTEMAP,
    isDeleted: false,
  };

  return new LocationPoint(locationPointObject);
}

// Method to create User object
function getUser(patientId, locationPoint) {
  const user = new User();
  user.userId = uuid();
  user.sourceType = config.SOURCE_TYPES.ROUTEMAP;
  user.sourceId = patientId;
  user.locationHistory = [locationPoint];
  user.isDeleted = false;
  user.isVerified = false;
  return user;
}

// Method to create Epidemic Contact Object
function getEpidemicContactStatus(degreeOfContact, estimatedTimeOfContact) {
  const epidemicContact = new EpidemicContact();

  epidemicContact.degreeOfContact = config.DEGREE_OF_CONTACT.INFECTED;
  epidemicContact.estimatedTimeOfContact = estimatedTimeOfContact;

  return epidemicContact;
}

// Method to enrich User object
function enrichUser(user) {
  user.locationHistory.sort((l1, l2) => {
    return l1.startTimestampMs - l2.startTimestampMs;
  });
  const indexOfLastLocationPoint = user.locationHistory.length - 1;
  const latestLocationHistory = user.locationHistory[indexOfLastLocationPoint];
  user.epidemicContactStatus = getEpidemicContactStatus(
    config.DEGREE_OF_CONTACT.INFECTED,
    latestLocationHistory.startTimestampMs
  );
  user.epidemicContactHistory = [user.epidemicContactStatus];
  return user;
}

function parseUploadFile(filePath) {
  return readCSVFile(filePath).then((rows) => {
    const usersMap = {};

    const headers = Object.keys(rows[0]);

    if (!validateHeaders(headers)) {
      const error = new Error('Invalidate header values');
      error.code = 400;
      throw error;
    }

    for (let i = 1; i < rows.length; i++) {
      const uploadUserPoint = rows[i];
      const patientId = rows[i][PATIENTID_KEY];
      let locationPoint;

      try {
        locationPoint = getLocationPoint(uploadUserPoint);
      } catch (rowError) {
        const error = new Error(
          `invalid content on row: ${++i}; ${rowError.message}`
        );
        error.code = 400;
        throw error;
      }

      if (!locationPoint) {
        console.log(locationPoint);
      }

      const user = usersMap[patientId];
      if (!user) {
        usersMap[patientId] = getUser(patientId, locationPoint);
      } else {
        user.locationHistory.push(locationPoint);
      }
    }

    const users = Object.values(usersMap).map(enrichUser);

    return users;
  });
}

module.exports = {
  parseUploadFile: parseUploadFile,
  validateHeaders: validateHeaders,
};
