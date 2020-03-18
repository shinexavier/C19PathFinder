const fs = require('fs');
const util = require('util');
const config = require('./../config');
const engine = require('./../utils/engine');

const readFile = util.promisify(fs.readFile);

/**
 * Method to get sample affected points from file.
 * @return {array} list of LocationPoints
 * LocationPoints is of following structure
 * {
 *      timestampMs: string, 
 *      latitudeE7: number, 
 *      longitudeE7: number, 
 *      accuracy: number
 * }
 */
function getAffectedLocationPointsFromFile() {
    return readFile(config.sampleLocationPointsFile, 'utf8')
        .then(function (locationPoints) {
            return JSON
                .parse(locationPoints)
                .map(locationPoint => {
                    return {
                        timestampMs: +locationPoint.timestampMs,
                        latitudeE7: +locationPoint.latitudeE7,
                        longitudeE7: +locationPoint.longitudeE7,
                        accuracy: +locationPoint.accuracy
                    }
                })
                .filter(locationPoint => !isNaN(locationPoint.timestampMs));
        }).catch(function (error) {
            console.error(`Error reading file ${config.sampleLocationPointsFile}`);
            throw err;
        });
}

/**
 * Method to get the cross points with the  affected points
 * @param {array} userlocationHistory list of locationPoints of user
 * @param {array} affectedLocationPoints list of locationPoints of corona victims
 * @return {array} list of Crosspoint
 * Crosspoint is of following structure
 * {
 *      userLocationPoint: locationPoint,
 *      affectedLocationPoint: locationPoint,
 *      distance: number, // geographical distance between userLocationPoint and affectedLocationPoint
 *      timeInterval: number // time interval between userLocationPoint and affectedLocationPoint
 * }
 */
function getCrosspoints(userlocationHistory, affectedLocationPoints) {
    const crosspoints = engine.crossCheckLocationPoints(userlocationHistory, affectedLocationPoints);
    return crosspoints;
}

module.exports = {
    getAffectedLocationPoints: getAffectedLocationPointsFromFile,
    getCrosspoints: getCrosspoints
}