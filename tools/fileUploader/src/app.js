const fs = require('fs');
const JSONStream = require('JSONStream');
const geographicCoordinateSystemUtils = require('./geographicCoordinateSystemUtils');

const inFileName = process.argv[2];
const TIMESTAMPMS_VALUE_15_DAYS = 15 * 24 * 60 * 60 * 1000;
const TIMESTAMPMS_VALUE_1_MINUTE = 60 * 1000;
const ACCURACY_THRESHOLD = 100;
const timestampMsNow = new Date().getTime();
const outFileName = `sample-location-history-for-last-15-days.json`;
let enrichedlocationPoints = [];

const getEnrichedLocationPoint = function (locationPoints, index) {
    const locationPoint = locationPoints[index];

    if (!locationPoint) {
        return null
    } else if (+(locationPoint['timestampMs']) > TIMESTAMPMS_VALUE_15_DAYS &&
        +(locationPoint['accuracy']) < ACCURACY_THRESHOLD) {
        return {
            startTimestampMs: +(locationPoints[index]['timestampMs']),
            endTimestampMs: +(locationPoints[index]['timestampMs']) + TIMESTAMPMS_VALUE_1_MINUTE,
            latitudeE7: +(locationPoints[index]['latitudeE7']),
            longitudeE7: +(locationPoints[index]['longitudeE7']),
            accuracy: +(locationPoints[index]['accuracy'])
        }
    } else {
        return null;
    }
}

const getMergedPoint = function (currentLocationPoint, nextLocationPoint) {
    const startTimestampMs = currentLocationPoint.startTimestampMs;
    const endTimestampMs = nextLocationPoint.startTimestampMs;

    if (currentLocationPoint.accuracy < nextLocationPoint.accuracy) {
        const latitudeE7 = currentLocationPoint.latitudeE7;
        const longitudeE7 = currentLocationPoint.longitudeE7;
        const accuracy = nextLocationPoint.accuracy;
    } else {
        const latitudeE7 = nextLocationPoint.latitudeE7;
        const longitudeE7 = nextLocationPoint.longitudeE7;
        const accuracy = currentLocationPoint.accuracy;
    }

    return {
        startTimestampMs: startTimestampMs,
        endTimestampMs: endTimestampMs,
        latitudeE7: latitudeE7,
        longitudeE7: longitudeE7,
        accuracy: accuracy
    }
}

fs
    .createReadStream(inFileName)
    .pipe(JSONStream.parse('*'))
    .on('data', function (locationPoints) {
        let i = 0;
        let currentLocationPoint = getEnrichedLocationPoint(locationPoints, i);
        let nextLocationPoint;
        while (i < locationPoints.length && !!currentLocationPoint) {
            nextLocationPoint = getEnrichedLocationPoint(locationPoints, ++i);
            if (!!nextLocationPoint) {
                const distance = geographicCoordinateSystemUtils.getDistance(currentLocationPoint, nextLocationPoint);
                if (distance < ACCURACY_THRESHOLD) {
                    currentLocationPoint = getMergedPoint(currentLocationPoint, nextLocationPoint);
                } else {
                    enrichedlocationPoints.push(currentLocationPoint);
                    currentLocationPoint = getEnrichedLocationPoint(locationPoints, ++i);
                }
            }
        }
        !nextLocationPoint && enrichedlocationPoints.push(currentLocationPoint);
    })
    .on('error', function (err) {
        console.log('Error while reading file.', err);
    })
    .on('end', function () {
        fs.writeFile(
            outFileName,
            JSON.stringify(enrichedlocationPoints),
            'utf8',
            (err) => {
                if (err) {
                    console.log('Error while writing the file.', err);
                }
                console.log(`Filtered location points written to ${outFileName}`);
            });
    });