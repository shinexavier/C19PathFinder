/**
 * Method to get the cross check location points
 * @param {array} userLocationPoints list of locationPoints of user
 * @param {array} affectedLocationPoints list of locationPoints of corona victims
 */
function crossCheckLocationPoints(userLocationPoints, affectedLocationPoints) {
    // Adding flag to userLocationPoints & affectedPoints
    userLocationPoints.map(a => {
        a.isTarget = false;
        return a;
    });
    affectedLocationPoints.map(a => {
        a.isTarget = true;
        return a;
    });

    const masterListOfLocationPoints = []
        .concat(userLocationPoints, affectedLocationPoints)
        .sort((a, b) => b.timestampMs - a.timestampMs);  
    
}

function calculateDistance() {

}

function calculateTimeInterval() {

}

module.exports = {
    crossCheckLocationPoints: crossCheckLocationPoints
}