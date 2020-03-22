const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    sampleLocationPointsFile: './data/sample-location-history-for-last-15-days.json',
    COSMODDB_USER: 'c19pathfinder',
    COSMOSDB_PASSWORD: '85IbEdFg3cfCVGm1T5PXhHNsynrcJ6e8tZa3U7HP1l9Rk0mNNr3YDGhmgZMcumRPzoLdpPO2ooGfEJvm9FDG4g==',
    COSMOSDB_DBNAME: 'c19pfstore',
    COSMOSDB_HOST: 'c19pathfinder.mongo.cosmos.azure.com',
    COSMOSDB_PORT: 10255
  },

  test: {},

  production: {}
};

module.exports = config[env];