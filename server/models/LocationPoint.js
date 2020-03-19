class LocationPoint {
    constructor(timestampMs, latitudeE7, longitudeE7, accuracy) {
        this.timestampMs = +timestampMs;
        this.latitudeE7 = +latitudeE7;
        this.longitudeE7 = +longitudeE7;
        this.accuracy = +accuracy;

        // Validation, if not valid returns null object
        if (isNaN(this.timestampMs) ||
            isNaN(this.latitudeE7) ||
            isNaN(this.longitudeE7) ||
            isNaN(this.accuracy)) {
            return this = null;
        }
    }
}