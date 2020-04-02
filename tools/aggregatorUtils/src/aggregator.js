const geographicCoordinateSystemUtils = require('./geographicCoordinateSystemUtils');

const TIMESTAMPMS_VALUE_15_DAYS = Math.abs((new Date().getTime()) - (15 * 24 * 60 * 60 * 1000));
const ACCURACY_THRESHOLD_FILTERING = 100;
const ACCURACY_THRESHOLD_AGGREGATION = 1000;
const DISTANCE_THRESHOLD = 100;

// 5KmpH - https://en.wikipedia.org/wiki/Walking#Difference_from_running
const MAX_MOVEMENT_VELOCITY = 5 * 1000 / (60 * 60 * 1000);

const getEnrichedLocationPoint = function (locationPoints, index) {
    const locationPoint = locationPoints[index];
    if (!locationPoint) {
        return null
    } else if (+(locationPoint['timestampMs']) > TIMESTAMPMS_VALUE_15_DAYS &&
        +(locationPoint['accuracy']) < ACCURACY_THRESHOLD_FILTERING) {
        return {
            startTimestampMs: +(locationPoints[index]['timestampMs']),
            endTimestampMs: +(locationPoints[index]['timestampMs']),
            latitudeE7: +(locationPoints[index]['latitudeE7']),
            longitudeE7: +(locationPoints[index]['longitudeE7']),
            accuracy: +(locationPoints[index]['accuracy'])
        }
    } else {
        return null;
    }
};

const getMergedPoint = function (currentLocationPoint, nextLocationPoint, distance) {
    const startTimestampMs = currentLocationPoint.startTimestampMs;
    const endTimestampMs = nextLocationPoint.startTimestampMs;
    
    const accuracy1 = currentLocationPoint.accuracy + (distance / 2);
    const accuracy2 = nextLocationPoint.accuracy + (distance / 2);
    
    const midPoint = geographicCoordinateSystemUtils.getMidpoint(
        currentLocationPoint.latitudeE7,
        currentLocationPoint.longitudeE7,
        nextLocationPoint.latitudeE7,
        nextLocationPoint.longitudeE7
    );

    return {
        startTimestampMs: startTimestampMs,
        endTimestampMs: endTimestampMs,
        latitudeE7: midPoint.latitude,
        longitudeE7: midPoint.longitude,
        accuracy: accuracy1 > accuracy2 ? accuracy1 : accuracy2
    }
};

const aggregate = function (locationPoints) {
    const aggregatedLocationPoints = [];
    let i = 0;
    let currentLocationPoint = getEnrichedLocationPoint(locationPoints, i);
    
    while(i < locationPoints.length && !currentLocationPoint) {
        currentLocationPoint = getEnrichedLocationPoint(locationPoints, ++i);
    }

    let nextLocationPoint;

    while (i < locationPoints.length && !!currentLocationPoint) {
        nextLocationPoint = getEnrichedLocationPoint(locationPoints, ++i);
        if (!!nextLocationPoint) {
            const timeInterval = Math.abs(currentLocationPoint.startTimestampMs - nextLocationPoint.endTimestampMs);
            const distance = geographicCoordinateSystemUtils.getDistance(
                currentLocationPoint.latitudeE7,
                currentLocationPoint.longitudeE7,
                nextLocationPoint.latitudeE7,
                nextLocationPoint.longitudeE7);
            const velocity = !!timeInterval ? (distance / timeInterval) : 0;

            if (currentLocationPoint.accuracy < ACCURACY_THRESHOLD_AGGREGATION &&
                distance < DISTANCE_THRESHOLD &&
                velocity < MAX_MOVEMENT_VELOCITY) {
                currentLocationPoint = getMergedPoint(currentLocationPoint, nextLocationPoint, distance);
            } else {
                aggregatedLocationPoints.push(currentLocationPoint);
                currentLocationPoint = nextLocationPoint;
            }
        }
    }

    !nextLocationPoint && aggregatedLocationPoints.push(currentLocationPoint);

    return aggregatedLocationPoints;
};

module.exports = aggregate;