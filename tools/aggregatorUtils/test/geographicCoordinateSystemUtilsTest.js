const geographicCoordinateSystemUtils = require('../src/geographicCoordinateSystemUtils');

// Geo coordinates
// Ref: https://support.google.com/maps/answer/18539?co=GENIE.Platform%3DDesktop&hl=en
const KK_COORDINATES = [85236870, 769502160]; // [08:31:25.30N 76:57:00.80E]
const TJ_COORDINATES = [85566920, 768820260]; // [08:33:24.10N, 76:52:55.30E]
const CAMPUS_COORDINATES = [86146800, 768617000]; // [08:36:52.90N, 76:51:42.10E]

// Distance bw coordinates
// Ref: http://edwilliams.org/gccalc.htm, Distance Units: Km, Earth Model: Spherical
// KK - TJ: 8.342828695534989
// TJ - Campus: 6.8212023245112245
// Campus - KK: 14.031144914285212

// Midpoint bw coordinates
// Ref: https://www.movable-type.co.uk/scripts/latlong.html
// KK - TJ: [8.5402777, 76.9161111]
// TJ - Campus: [8.5855555, 76.8719444]
// Campus - KK: [8.5691666, 76.9058333]


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
        const actualOutput = Number.parseFloat(geographicCoordinateSystemUtils.getRadian(this.degree).toFixed(6));

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

GetDegreeTest = function () {
    this.setup = function (radian, degree) {
        this.degree = degree;
        this.radian = radian;
    }
    this.run = function () {
        const actualOutput = Number.parseFloat(geographicCoordinateSystemUtils.getDegree(this.radian).toFixed(7));
        const error = actualOutput - this.degree;

        if (Math.abs(error) < 0.0001) {
            console.log(
                `getDegree; SUCCESS; ` +
                `input: { valueInRadian: ${this.radian} }; ` +
                `expectedOutput: ${this.degree}; ` +
                `actualOutput: ${actualOutput}`
            );
        } else {
            console.error(
                `getDegree; FAILED; ` +
                `input: { valueInRadian: ${this.radian} }; ` +
                `expectedOutput: ${this.degree}; ` +
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
        const error = Math.abs(actualOutput - this.expectedOutput);

        if (error < 10) {
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

GetMidpointTest = function () {
    this.setup = function (pointA, pointB, expectedOutput) {
        this.pointA = pointA;
        this.pointB = pointB;
        this.expectedOutput = expectedOutput;
    }
    this.run = function () {
        const actualOutput = geographicCoordinateSystemUtils.getMidpoint(
            this.pointA[0],
            this.pointA[1],
            this.pointB[0],
            this.pointB[1]);
        const distance = geographicCoordinateSystemUtils.getDistance(
            this.expectedOutput[0],
            this.expectedOutput[1],
            actualOutput.latitude,
            actualOutput.longitude
        );

        console.log(distance)

        if (distance < 20) {
            console.log(
                `getDistance; SUCCESS; ` +
                `input: { latitude1: ${this.pointA[0]}, longitude1: ${this.pointA[1]}, latitude2: ${this.pointB[0]}, longitude2: ${this.pointB[1]} }; ` +
                `expectedOutput: ${this.expectedOutput}; ` +
                `actualOutput: ${actualOutput.latitude}, ${actualOutput.longitude}`
            );
        } else {
            console.error(
                `getDistance; FAILED; ` +
                `input: { latitude1: ${this.pointA[0]}, longitude1: ${this.pointA[1]}, latitude2: ${this.pointB[0]}, longitude2: ${this.pointB[1]} }; ` +
                `expectedOutput: ${this.expectedOutput}; ` +
                `actualOutput: ${actualOutput.latitude}, ${actualOutput.longitude}`
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

    getRadianTest.setup(76.882026, 1.341845);
    getRadianTest.run();
    getRadianTest.tearDown();

    getRadianTest.setup(8.614680, 0.150355);
    getRadianTest.run();
    getRadianTest.tearDown();

    getRadianTest.setup(76.861700, 1.34149);
    getRadianTest.run();
    getRadianTest.tearDown();

    // Tests for getDegree method
    const getDegreeTest = new GetDegreeTest();

    getDegreeTest.setup(0.148766, 8.523687);
    getDegreeTest.run();
    getDegreeTest.tearDown();

    getDegreeTest.setup(1.343035, 76.950216);
    getDegreeTest.run();
    getDegreeTest.tearDown();

    getDegreeTest.setup(0.149342, 8.556692);
    getDegreeTest.run();
    getDegreeTest.tearDown();

    getDegreeTest.setup(1.341845, 76.882026);
    getDegreeTest.run();
    getDegreeTest.tearDown();

    getDegreeTest.setup(0.150355, 8.614680);
    getDegreeTest.run();
    getDegreeTest.tearDown();

    getDegreeTest.setup(1.34149, 76.861700);
    getDegreeTest.run();
    getDegreeTest.tearDown();

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

    // Test for getMidpoint method
    const getMidpointTest = new GetMidpointTest();

    getMidpointTest.setup(KK_COORDINATES, TJ_COORDINATES, [85402777, 769161111]);
    getMidpointTest.run();
    getMidpointTest.tearDown();

    getMidpointTest.setup(TJ_COORDINATES, CAMPUS_COORDINATES, [85855555, 768719444]);
    getMidpointTest.run();
    getMidpointTest.tearDown();

    getMidpointTest.setup(CAMPUS_COORDINATES, KK_COORDINATES, [85691666, 769058333]);
    getMidpointTest.run();
    getMidpointTest.tearDown();
}

main();