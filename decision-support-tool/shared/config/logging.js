// Logging configuration

const loggingConfig = {
  level: process.env.LOG_LEVEL || 'info',
  format: 'json',
  transports: [
    'console',
    // Add file or external logging service here
  ]
};

module.exports = loggingConfig;