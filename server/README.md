# C19PathFinder Server

This repository contains the code for the server application. It is built on NodeJS - Express Framework. And will be deployed as Azure App Service.

### Initial Setup
- [Prerequisites](https://docs.microsoft.com/en-gb/azure/app-service/containers/quickstart-nodejs#prerequisites)
- Open Command Prompt
- cd to `server` folder
- run the command `npm install`

### Running API Server
run the command `npm start`

### Available APIs
[Postman Collection](https://www.getpostman.com/collections/408465756d4682e64e12)

### Data Model

#### LocationPoint
```json
{
  "locationPoint": {
    "locationPointId": {
      "type": "string",
      "require": "true",
      "description": "Unique identifier for a location point" 
    },
    "userId": {
      "type": "string",
      "require": "true",
      "description": "Database id to the user table"
    },
    "latitude": {
      "type": "number",
      "require": "true",
      "description": "Latitude of the location in degree"
    },
    "longitude": {
      "type": "number",
      "require": "true",
      "description": "Longitude of the location in degree"
    },
    "accuracy": {
      "type": "number",
      "require": "true",
      "description": "Confidence of Google's coordinate value in  metres / Radius of the location under consideration in metres"
    },
    "altitude": {
      "type": "number",
      "require": "false",
      "description": "Altitude of the location"
    },
    "verticalAccuracy": {
      "type": "number",
      "require": "false",
      "description": "Confidence of altitude. (Unit yet to find out)"
    },
    "timestampMs": {
      "type": "number",
      "require": "true",
      "description": "Unix timestamp in milliseconds"
    },
    "elapsedTimeMs": {
      "type": "number",
      "require": "false",
      "description": "Elapsed time in milli seconds"
    },
    "activity": {
      "type": "string",
      "require": "false",
      "description": "Google's Activity of prediction with highest confidence.",
      "values": [        
        "MOTORCYCLING",
        "IN_PASSENGER_VEHICLE",
        "IN_FERRY",
        "SAILING",
        "IN_VEHICLE",
        "SKIING",
        "IN_TRAM",
        "STILL",
        "IN_BUS",
        "WALKING",
        "IN_TRAIN",
        "CYCLING",
        "FLYING",
        "RUNNING",
        "IN_SUBWAY"
      ]
    },
    "activityConfidence": {
      "type": "number",
      "require": "false",
      "description": "Confidence score for the activity recorded"
    },
    "degreeOfContact": {
      "type": "number",
      "require": "true",
      "description": "0 for affected, 1 to 3 are other possible values. Duplicated value from User document"
    },
    "lastUpdatedOn": {
      "type": "number",
      "require": "true",
      "description": "Unix timestamp in milliseconds"
    },
    "lastUpdatedBy": {
      "type": "number",
      "require": "true",
      "description": "Device Id / Routemap Id"
    },
    "isPurged": {
      "type": "boolean",
      "require": "false",
      "description": "True value indicates the location point is removed."
    }
  }
}
```

#### User
```json
{
  "user": {
    "id": {
        "type": "string",
        "require": "true",
        "description": "Unique identifier for the user"
    },
    "sourceType": {
        "type": "string",
        "require": "true",
        "description": "Values can be 'app|server'"
    },
    "sourceId": {
        "type": "string",
        "require": "true",
        "description": "For sourceType app -> deviceId, for sourceType server -> routeMapId"
    },
    "phone": {
        "type": "string",
        "description": "10 digit mobile number, verified if possible"
    },
    "mail": {
        "type": "string",
        "decription": "Mail id of the user, verified if possible"
    }
  }
}
```

### Tasks
#### Functional 
- [ ] Victim's Location History API [POST]
- [ ] Victim's Location History API - FILE UPLOAD [POST]
- [ ] Victim's Location History API [GET]
    - Parameters
      - timestamp
      - geoCenter
- [ ] Refactoring finalNumbers and testingSites APIs
- [ ] Config API [GET]
- [ ] Auth API for mobile app

#### Technical
- [x] Datamodel definition
- [ ] Connecting to Azure Cosmos DB
- [ ] Azure Redis Cache

### Open Points
- [ ] API Spec for Victim's Location History API [GET]
- [ ] API Spec for Mobile App Auth API and workflow
