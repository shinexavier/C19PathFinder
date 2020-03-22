const aggregator = require('../src/aggregator');

const KK_COORDINATES = [85236870, 769502160]; // [08:31:25.30N 76:57:00.80E]
const TJ_COORDINATES = [85566920, 768820260]; // [08:33:24.10N, 76:52:55.30E]
const CAMPUS_COORDINATES = [86146800, 768617000]; // [08:36:52.90N, 76:51:42.10E]

const input = [
    {
        "timestampMs": "819150840000",
        "latitudeE7": 85236870,
        "longitudeE7": 769502160,
        "accuracy": 27
    },
    {
        "timestampMs": "819151200000",
        "latitudeE7": 85236870,
        "longitudeE7": 769502160,
        "accuracy": 30
    },
    {
        "timestampMs": "819154440000",
        "latitudeE7": 85236870,
        "longitudeE7": 769502160,
        "accuracy": 80
    },
    {
        "timestampMs": "819154500000",
        "latitudeE7": 85566920,
        "longitudeE7": 768820260,
        "accuracy": 24
    },
    {
        "timestampMs": "819165300000",
        "latitudeE7": 85566920,
        "longitudeE7": 768820260,
        "accuracy": 54
    },
    {
        "timestampMs": "819165360000",
        "latitudeE7": 85566920,
        "longitudeE7": 768820260,
        "accuracy": 80
    },
    {
        "timestampMs": "819165420000",
        "latitudeE7": 86146800,
        "longitudeE7": 768617000,
        "accuracy": 23
    },
    {
        "timestampMs": "819165360000",
        "latitudeE7": 86146800,
        "longitudeE7": 768617000,
        "accuracy": 80
    },
    {
        "timestampMs": "819165420000",
        "latitudeE7": 86146800,
        "longitudeE7": 768617000,
        "accuracy": 01
    },
    {
        "timestampMs": "819165430000",
        "latitudeE7": 85236810,
        "longitudeE7": 769502160,
        "accuracy": 27
    },
    {
        "timestampMs": "819165465000",
        "latitudeE7": 85245500,
        "longitudeE7": 769502160,
        "accuracy": 27
    },
];

const expectedOutput = [
    {
        startTimestampMs: 819150840000,
        endTimestampMs: 819154440000,
        accuracy: 80
    },
    {
        startTimestampMs: 819154500000,
        endTimestampMs: 819165360000,
        accuracy: 80
    },
    {
        startTimestampMs: 819165420000,
        endTimestampMs: 819165420000,
        accuracy: 80
    },
    {
        startTimestampMs: 819165430000,
        endTimestampMs: 819165430000,
        accuracy: 27
    },
    {
        startTimestampMs: 819165465000,
        endTimestampMs: 819165465000,
        accuracy: 27
    }
];


const actualOutput = aggregator(input);

if (actualOutput.length !== expectedOutput.length) {
    console.log("Test Failed, incorrect number of aggragated point");
}

for (let i = 0; i < actualOutput.length; i++) {
    const expected = expectedOutput[i];
    const actual = actualOutput[i];

    if (expected.startTimestampMs === actual.startTimestampMs &&
        expected.endTimestampMs === actual.endTimestampMs &&
        expected.accuracy === actual.accuracy) {
        continue;
    } else {
        console.log("Test Failed at ", actual);
        break;
    }
}

console.log("Test SUCCESS");
