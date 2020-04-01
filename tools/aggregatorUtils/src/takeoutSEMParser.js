var yieldjs = require('../utils/yield');
var gisUtil = require('./geographicCoordinateSystemUtils');
var toRawData = require('../data/takeoutSEM3.json');

Array.prototype.getIterator = yieldjs.iterator;
Function.prototype.getGenerator = yieldjs.generator;

function filter(condition) {
    "use strict";
    return function (context) {
        return condition(context.current) ? context.current : null;
    };
}

function placeVisitTime(val) {
    "use strict";
    var n = 15; //last n days only
    var t15minus = Math.abs((new Date().getTime()) - (n * 24 * 60 * 60 * 1000));
    return (val.placeVisit.duration.startTimestampMs > t15minus)
}

function placeVisitReported(val) {
    "use strict";
    return val.hasOwnProperty('placeVisit');
}

function placeVisitConfirmed(val) {
    "use strict";
    return ((val.placeVisit.placeConfidence === 'USER_CONFIRMED') ||
        (val.placeVisit.editConfirmationStatus === 'CONFIRMED') ||
        (val.placeVisit.visitConfidence > 80) ||
        (val.placeVisit.location.locationConfidence > 80));
}

function visitDurationThreshold(val) {
    "use strict";
    var n = 5; //n minutes threshold
    return ((val.placeVisit.duration.endTimestampMs - val.placeVisit.duration.startTimestampMs) >= n * 60 * 1000);
}

function emptyCoordinates(val) {
    "use strict";
    var latE7 = val.placeVisit.location.latitudeE7;
    var lngE7 = val.placeVisit.location.longitudeE7;
    return ((latE7) && (lngE7));
}

var parsedLocations = [];
var LocationInfo = function () {
    this.lat = null;
    this.lng = null;
    this.place = null;
    this.address = null;
    this.startTS = null;
    this.endTS = null;
    return this;
}
//console.log(toRawData);
const timelines = toRawData.timelineObjects.getIterator();
while (timelines.moveNext(
        filter(placeVisitReported),
        filter(emptyCoordinates),
        filter(placeVisitTime),
        filter(placeVisitConfirmed),
        filter(visitDurationThreshold)
    )) {
    //console.log(timelines.current);
    var latE7 = timelines.current.placeVisit.location.latitudeE7;
    var lngE7 = timelines.current.placeVisit.location.longitudeE7;
    var place = timelines.current.placeVisit.location.name;
    var address = timelines.current.placeVisit.location.address;
    var locInfo = new LocationInfo();
    locInfo.lat = gisUtil.getLatitude(latE7);
    locInfo.lng = gisUtil.getLongitude(lngE7);
    locInfo.place = (place) ? place : null;
    locInfo.address = (address) ? address : null;
    locInfo.startTS = +(timelines.current.placeVisit.duration.startTimestampMs);
    locInfo.endTS = +(timelines.current.placeVisit.duration.endTimestampMs);
    parsedLocations.push(locInfo);
}
console.log(JSON.stringify(parsedLocations));
//console.log(timelines.iterate(filter(placeVisited)),filter(highConfidence));