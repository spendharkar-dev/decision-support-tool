// Environment-specific configuration

const config = {
  development: {
    dbUrl: 'mongodb://localhost:27017/dev-db',
    apiKey: 'dev-api-key',
    logLevel: 'debug'
  },
  production: {
    dbUrl: 'mongodb://localhost:27017/prod-db',
    apiKey: 'prod-api-key',
    logLevel: 'error'
  }
};

const env = process.env.NODE_ENV || 'development';

module.exports = config[env];