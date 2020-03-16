const fs = require('fs');
const util = require('util');
const config = require('./../config');

const readFile = util.promisify(fs.readFile);

/**
 * Method to get sample affected points from file.
 * @param {number} degree Degree of contact
 * @param {function} cb function of the signature cb(affectedLocationPoints)
 * affectedLocationPoints should be of following structure
 * {
 *      timestampMs: string, 
 *      latitudeE7: number, 
 *      longitudeE7: number, 
 *      accuracy: number
 * }
 */
function getAffectedLocationPointsFromFile() {
    return readFile(config.sampleLocationPointsFile, 'utf8')
        .then(function (data) {
            return JSON.parse(data);
        }).catch(function (error) {
            console.error(`Error reading file ${config.sampleLocationPointsFile}`);
            throw err;
        });
}

module.exports = {
    getAffectedLocationPoints: getAffectedLocationPointsFromFile
}