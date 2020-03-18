const geographicCoordinateSystemUtils = require('../src/geographicCoordinateSystemUtils');

// Geo coordinates
// Ref: https://support.google.com/maps/answer/18539?co=GENIE.Platform%3DDesktop&hl=en
const KK_COORDINATES = [8.523687, 76.950216]; // [08:31:25.30N 76:57:00.80E]
const TJ_COORDINATES = [8.556692, 76.882026]; // [08:33:24.10N, 76:52:55.30E]
const CAMPUS_COORDINATES = [8.614680, 76.861700]; // [08:36:52.90N, 76:51:42.10E]

// Distance bw coordinates
// Ref: http://edwilliams.org/gccalc.htm, Distance Units: Km, Earth Model: Spherical
// KK - TJ: 8.342828695534989
// TJ - Campus: 6.8212023245112245
// Campus - KK: 14.031144914285212

GetLatitudeTest = function () {
    this.setup = function (input, expectedOutput) {
        this.input = input;
        this.expectedOutput = expectedOutput;
    }

    this.run = function () {
        const actualOutput = geographicCoordinateSystemUtils.getLatitude(this.input);

        if (actualOutput === this.expectedOutput) {
            console.log(
                `getLatitude; SUCCESS; ` +
                `input: { latitudeE7: ${this.input} }; ` +
                `expectedOutput: ${this.expectedOutput}; ` +
                `actualOutput: ${actualOutput}`
            );
        } else {
            console.error(
                `getLatitude; SUCCESS; ` +
                `input: { latitudeE7: ${this.input} }; ` +
                `expectedOutput: ${this.expectedOutput}; ` +
                `actualOutput: ${actualOutput}`
            );
        }
    }

    this.tearDown = function () {
        this.input = undefined;
        this.expectedOutput = undefined;
    }
};

GetLongitudeTest = function () {
    this.setup = function (input, expectedOutput) {
        this.input = input;
        this.expectedOutput = expectedOutput;
    }

    this.run = function () {
        const actualOutput = geographicCoordinateSystemUtils.getLongitude(this.input);

        if (actualOutput === this.expectedOutput) {
            console.log(
                `getLongitude; SUCCESS; ` +
                `input: { longitudeE7: ${this.input} }; ` +
                `expectedOutput: ${this.expectedOutput}; ` +
                `actualOutput: ${actualOutput}`
            );
        } else {
            console.error(
                `getLongitude; SUCCESS; ` +
                `input: { longitudeE7: ${this.input} }; ` +
                `expectedOutput: ${this.expectedOutput}; ` +
                `actualOutput: ${actualOutput}`
            );
        }
    }

    this.tearDown = function () {
        this.input = undefined;
        this.expectedOutput = undefined;
    }
};

GetRadianTest = function () {
    this.setup = function (degree, radian) {
        this.degree = degree;
        this.radian = radian;
    }
    this.run = function () {
        const actualOutput = geographicCoordinateSystemUtils.getRadian(this.degree);

        if (actualOutput === this.radian) {
            console.log(
                `getRadian; SUCCESS; ` +
                `input: { valueInDegree: ${this.degree} }; ` +
                `expectedOutput: ${this.radian}; ` +
                `actualOutput: ${actualOutput}`
            );
        } else {
            console.error(
                `getRadian; FAILED; ` +
                `input: { valueInDegree: ${this.degree} }; ` +
                `expectedOutput: ${this.radian}; ` +
                `actualOutput: ${actualOutput}`
            );
        }
    }
    this.tearDown = function () {
        this.degree = undefined;
        this.radian = undefined;
    }
};

GetDistanceTest = function () {
    this.setup = function (pointA, pointB, expectedOutput) {
        this.pointA = pointA;
        this.pointB = pointB;
        this.expectedOutput = expectedOutput;
    }
    this.run = function () {
        const actualOutput = geographicCoordinateSystemUtils.getDistance(
            this.pointA[0],
            this.pointA[1],
            this.pointB[0],
            this.pointB[1]);

        if (Math.abs(actualOutput - this.expectedOutput) < 10) {
            console.log(
                `getDistance; SUCCESS; ` +
                `input: { latitude1: ${this.pointA[0]}, longitude1: ${this.pointA[1]}, latitude2: ${this.pointB[0]}, longitude2: ${this.pointB[1]} }; ` +
                `expectedOutput: ${this.expectedOutput}; ` +
                `actualOutput: ${actualOutput}`
            );
        } else {
            console.error(
                `getDistance; FAILED; ` +
                `input: { latitude1: ${this.pointA[0]}, longitude1: ${this.pointA[1]}, latitude2: ${this.pointB[0]}, longitude2: ${this.pointB[1]} }; ` +
                `expectedOutput: ${this.expectedOutput}; ` +
                `actualOutput: ${actualOutput}`
            );
        }
    }
    this.tearDown = function () {
        this.pointA = undefined;
        this.pointB = undefined;
        this.expectedOutput = undefined;
    }
};

function main() {
    // Tests for getLatitude method 
    const getLatitudeTest = new GetLatitudeTest();

    getLatitudeTest.setup(899999999, 89.9999999);
    getLatitudeTest.run();
    getLatitudeTest.tearDown();

    getLatitudeTest.setup(900000000, 90.0000000);
    getLatitudeTest.run();
    getLatitudeTest.tearDown();

    getLatitudeTest.setup(900000001, -339.4967295);
    getLatitudeTest.run();
    getLatitudeTest.tearDown();

    // Tests for getLongitude method 
    const getLongitudeTest = new GetLongitudeTest();

    getLongitudeTest.setup(1799999999, 179.9999999);
    getLongitudeTest.run();
    getLongitudeTest.tearDown();

    getLongitudeTest.setup(1800000000, 180.0000000);
    getLongitudeTest.run();
    getLongitudeTest.tearDown();

    getLongitudeTest.setup(1800000001, -249.4967295);
    getLongitudeTest.run();
    getLongitudeTest.tearDown();

    // Tests for getRadian method
    const getRadianTest = new GetRadianTest();

    getRadianTest.setup(8.523687, 0.148766);
    getRadianTest.run();
    getRadianTest.tearDown();

    getRadianTest.setup(76.950216, 1.343035);
    getRadianTest.run();
    getRadianTest.tearDown();

    getRadianTest.setup(8.556692, 0.149342);
    getRadianTest.run();
    getRadianTest.tearDown();

    getRadianTest.setup(76.882026, 1.341844);
    getRadianTest.run();
    getRadianTest.tearDown();

    getRadianTest.setup(8.614680, 0.150355);
    getRadianTest.run();
    getRadianTest.tearDown();

    getRadianTest.setup(76.861700, 1.34149);
    getRadianTest.run();
    getRadianTest.tearDown();

    // Test for getDistance method
    const getDistanceTest = new GetDistanceTest();

    getDistanceTest.setup(KK_COORDINATES, TJ_COORDINATES, 8342);
    getDistanceTest.run();
    getDistanceTest.tearDown();

    getDistanceTest.setup(TJ_COORDINATES, CAMPUS_COORDINATES, 6821);
    getDistanceTest.run();
    getDistanceTest.tearDown();

    getDistanceTest.setup(CAMPUS_COORDINATES, KK_COORDINATES, 14031);
    getDistanceTest.run();
    getDistanceTest.tearDown();
}

main();