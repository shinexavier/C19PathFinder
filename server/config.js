const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    sampleLocationPointsFile: './data/sample-location-history-for-last-15-days.json'
  },

  test: {},

  production: {}
};

module.exports = config[env];
