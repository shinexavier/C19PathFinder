const SCALAR_E7 = 0.0000001;
const RADIUS_OF_EARTH = 6366707.0195;

// Method for getting corrected latitude in degree from latitude value in google's takeout data
function getLatitude(latitudeE7) {
    // Correction for the overflow bug in google's takeout data
    // ref: https://support.google.com/maps/thread/4595364?hl=en
    const correctedLatitudeE7 = (latitudeE7 > 900000000) ? (latitudeE7 - 4294967296) : latitudeE7;

    // Since Google Takeout stores latlngs as integers
    const latitude = correctedLatitudeE7 * SCALAR_E7;
    return Number.parseFloat(latitude.toFixed(7));
}

// Method for getting corrected longitude in degree from latitude value in google's takeout data
function getLongitude(longitudeE7) {
    // Correction for the overflow bug in google's takeout data
    // ref: https://support.google.com/maps/thread/4595364?hl=en
    const correctedLongitudeE7 = (longitudeE7 > 1800000000) ? (longitudeE7 - 4294967296) : longitudeE7;

    // Since Google Takeout stores latlngs as integers
    const longitude = correctedLongitudeE7 * SCALAR_E7;
    return Number.parseFloat(longitude.toFixed(7));
}

// Method for converting a value in degree to radian
function getRadian(degree) {
    const radian = degree * (Math.PI / 180);
    return Number.parseFloat(radian.toFixed(7));
}

// Method for converting a value in radian to degree
// Accurate upto 0.0001
function getDegree(radian) {
    const degree = (radian * 180) / Math.PI;
    return degree;
}

// Method to find the air distance between two points (Haversine Distance)
// Unit in meters
// Error upto 300m
// Ref: https://www.movable-type.co.uk/scripts/latlong.html
function getHaversineDistance(latitudeE71, longitudeE71, latitudeE72, longitudeE72) {
    const latitude1 = getLatitude(latitudeE71);
    const longitude1 = getLongitude(longitudeE71);
    const latitude2 = getLatitude(latitudeE72);
    const longitude2 = getLongitude(longitudeE72);

    const latitude1InRadian = getRadian(latitude1);
    const latitude2InRadian = getRadian(latitude2);

    const angleBetweenLatitudesInRadian = getRadian(latitude2 - latitude1);
    const angleBetweenLongitudesInRadian = getRadian(longitude2 - longitude1);

    const a =
        Math.sin(angleBetweenLatitudesInRadian / 2) * Math.sin(angleBetweenLatitudesInRadian / 2) +
        Math.cos(latitude1InRadian) * Math.cos(latitude2InRadian) *
        Math.sin(angleBetweenLongitudesInRadian / 2) * Math.sin(angleBetweenLongitudesInRadian / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = RADIUS_OF_EARTH * c;

    return distance;
}

// Method to find the air distance between two points (Spherical Law of Cosines)
// Unit in meters
// Error upto 10m
// Ref: https://www.movable-type.co.uk/scripts/latlong.html
function getDistance(latitudeE71, longitudeE71, latitudeE72, longitudeE72) {
    const latitude1 = getLatitude(latitudeE71);
    const longitude1 = getLongitude(longitudeE71);
    const latitude2 = getLatitude(latitudeE72);
    const longitude2 = getLongitude(longitudeE72);

    const latitude1InRadian = getRadian(latitude1);
    const latitude2InRadian = getRadian(latitude2);

    const angleBetweenLongitudesInRadian = getRadian(longitude2 - longitude1);
    const distance =
        Math.acos(
            Math.sin(latitude1InRadian) * Math.sin(latitude2InRadian) +
            Math.cos(latitude1InRadian) * Math.cos(latitude2InRadian) * Math.cos(angleBetweenLongitudesInRadian)
        ) * RADIUS_OF_EARTH;

    return Number.parseFloat(distance.toFixed(7));
}

// Method to find the mid point of two geographical points
// Error upto 20m
// Ref: https://www.movable-type.co.uk/scripts/latlong.html
// Ref: Android Google Map Utilities - https://stackoverflow.com/a/45868756
function getMidpoint(latitudeE71, longitudeE71, latitudeE72, longitudeE72) {
    const latitude1 = getLatitude(latitudeE71);
    const longitude1 = getLongitude(longitudeE71);
    const latitude2 = getLatitude(latitudeE72);
    const longitude2 = getLongitude(longitudeE72);

    const latitude1InRadian = getRadian(latitude1);
    const longitude1InRadian = getRadian(longitude1);
    const latitude2InRadian = getRadian(latitude2);
    const angleBetweenLongitudesInRadian = getRadian(longitude2 - longitude1);

    // get cartesian coordinates for the two points
    const A = {
        x: Math.cos(latitude1InRadian),
        y: 0, // place point A on prime meridian y=0 
        z: Math.sin(latitude1InRadian)
    };
    const B = {
        x: Math.cos(latitude2InRadian) * Math.cos(angleBetweenLongitudesInRadian),
        y: Math.cos(latitude2InRadian) * Math.sin(angleBetweenLongitudesInRadian),
        z: Math.sin(latitude2InRadian)
    };

    // vector to midpoint is sum of vectors to two points (no need to normalise)
    const C = {
        x: A.x + B.x,
        y: A.y + B.y,
        z: A.z + B.z
    };

    const latitudeInDegree = Math.atan2(C.z, Math.sqrt(C.x * C.x + C.y * C.y));
    const longitudeInDegree = longitude1InRadian + Math.atan2(C.y, C.x);

    const latitude = Number.parseInt((getDegree(latitudeInDegree) * 10000000).toFixed(7));
    const longitude = Number.parseInt((getDegree(longitudeInDegree) * 10000000).toFixed(7));

    return {
        latitude: latitude,
        longitude: longitude
    }
}

module.exports = {
    getLatitude: getLatitude,
    getLongitude: getLongitude,
    getRadian: getRadian,
    getDegree: getDegree,
    getDistance: getDistance,
    getMidpoint: getMidpoint
}