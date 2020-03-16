const fs = require('fs');
const JSONStream = require('JSONStream');

const inFileName = process.argv[2];
const _15daysInMs = 15 * 24 * 60 * 60 * 1000;
const timestampMsNow = new Date().getTime();
const timestampMs15DaysBack = timestampMsNow - _15daysInMs;
const outFileName = `sample-location-history-for-last-15-days.json`;
let locationPointsForLast15Days;

fs
    .createReadStream(inFileName)
    .pipe(JSONStream.parse('*'))
    .on('data', function (locationPoints) {
        locationPointsForLast15Days =
            locationPoints.filter(locationPoint => (+locationPoint.timestampMs) > timestampMs15DaysBack);
    })
    .on('error', function (err) {
        console.log('Error while reading file.', err);
    })
    .on('end', function () {
        fs.writeFile(
            outFileName,
            JSON.stringify(locationPointsForLast15Days),
            'utf8',
            (err) => {
                if (err) {
                    console.log('Error while writing the file.', err);
                }
                console.log(`Filtered location points written to ${outFileName}`);
            });
    });