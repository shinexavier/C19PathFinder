# C19PathFinder Server

This repository contains the code for the server application. It is built on NodeJS - Express Framework. And will be deployed as Azure App Service.

### Initial Setup
- [Prerequisites](https://docs.microsoft.com/en-gb/azure/app-service/containers/quickstart-nodejs#prerequisites)
- Open Command Prompt
- cd to `server` folder
- run the command `npm install`

### Running API Server
- run the linting `eslint --ignore-path .gitignore <file-name> --fix`
- run the command `npm start`

### Setting up Mongo Client
- Download [Studio 3T for MongoDB](https://studio3t.com/download/)
- Open Connection Manager -> New Connection -> From URI option
- Give below URI
  - mongodb://cosmos-c19pathfinder-dev:vY6VqOyTpnMtF9AC4B9DZsDf6tq8vB3BNlxq9UqwmUSj6uM2k276uekZ7TJq04BdQRA3zt32PSk3NWwHeurKtg==@cosmos-c19pathfinder-dev.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@cosmos-c19pathfinder-dev@

### For loading the seed data
- run the command `npm run load-seed-data`

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
