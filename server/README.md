# C19PathFinder Server

This repository contains the code for the server application. It is built on NodeJS - Express Framework. And will be deployed as Azure App Service.

### Initial Setup
- [Prerequisites](https://docs.microsoft.com/en-gb/azure/app-service/containers/quickstart-nodejs#prerequisites)
- Open Command Prompt
- cd to `server` folder
- run the command `npm install`

### Running API Server
- run the linting `npm run pretest`
- run the command `npm start`

### Available APIs
[Postman Collection](https://www.getpostman.com/collections/408465756d4682e64e12)

### Data Model

#### LocationPoint
[Mongoose Schema Definition](https://github.com/shinexavier/C19PathFinder/tree/master/server/src/models)

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
- [x] Connecting to Azure Cosmos DB
- [ ] DB Indexing
  - Indexing is done as part of mongoose
  - In Cosmos DB, indexing should be done prior to data insertion
  - Indexing should be provided for attributes involving in search and sorting
  - For migration, index should be handled seperately, ref: https://docs.microsoft.com/en-us/azure/cosmos-db/mongodb-indexing#migrating-collections-with-indexes
- [ ] Azure Redis Cache

### Open Points
- [ ] API Spec for Victim's Location History API [GET]
- [ ] API Spec for Mobile App Auth API and workflow
