### Aggregator Utils

#### Geographic Coordinate Systems Utils - Public Methods
- getLatitude
  - Method for getting corrected latitude in degree from latitude value in google's takeout data
- getLongitude
  - Method for getting corrected longitude in degree from latitude value in google's takeout data
- getRadian
  - Method for converting a value in radian to degree
  - Precision is 0.0001
- getDegree
  - Method for converting a value in degree to radian
- getDistance
  - Method to find the air distance between two points based on Spherical Law of Cosines
  - Unit is metres, error can be upto 10m
- getMidpoint
  - Method to find the mid point of two geographical points
  - Error can be upto 20m

#### Aggregator Utils - Public Methods
- aggregate
  - Aggregate location points which are within 100m radius and distance/timeInterval is less than 5Km.
  - Accuracy is updated for aggregated point as distance + maximum value of points
  - Test for the same is available in `test/aggregatorTests`
  - Method expects location points to be chronologically ordered (ASC)


