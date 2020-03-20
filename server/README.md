# C19PathFinder Server

This repository contains the code for the server application. It is built on NodeJS - Express Framework. And will be deployed as Azure App Service.

## Initial Setup

- Open Command Prompt
- cd to `server` folder
- run the command `npm install`

## Running API Server

run the command `npm start`

## Available APIs

* Dashboard
  * http://localhost:3000/finalnumbers
  * http://localhost:3000/finalnumbers/statewise
* List of Laboratories
  * http://localhost:3000/testingsites 

### Algorithm to findout the crosspoints
- Add `isUserLocationPoint` flag to `userLocationPoints`
- Create `masterListOfLocationPoints` by merging `userLocationPoints` and `affectedLocationPoints`
- Iterate through the `masterListOfLocationPoints` 
  - Take one userLocationPoint
    - Go backward as per the time threshold
      - Take each affectedPoint and calculate distance
      - If distance is less than threshold, populate crosspoint object and add to the crosspoint list
    - Go forward as per the time threshold
      - Take each affectedPoint and calculate distance
      - If distance is less than threshold, populate crosspoint object and add to the crosspoint list

### TODO
- In memory analysis
  - Update the algorithm to have time slice split and check
- Generate the data schema
- Connecting to CosmosDB
- Connecting to Azure Blob Storage [Temp. file storage]

### [Prerequisites](https://docs.microsoft.com/en-gb/azure/app-service/containers/quickstart-nodejs#prerequisites)