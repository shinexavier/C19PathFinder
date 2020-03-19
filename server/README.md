# C19PathFinder Server

This repository contains the code for the server application. It is built on NodeJS - Express Framework. And will be deployed as Azure App Service.

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