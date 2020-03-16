const env = process.env.NODE_ENV || 'development';

const config = {
  development: {},

  test: {},

  production: {}
};

module.exports = config[env];
