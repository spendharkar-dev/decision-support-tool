// Database configuration

const dbConfig = {
  url: process.env.DB_URL || 'mongodb://localhost:27017/default-db',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 5,
    connectTimeoutMS: 10000
  }
};

module.exports = dbConfig;