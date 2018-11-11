/**
 * module dependencies for server configuration
 */
const path = require('path');

/**
 * server configurations
 */
const serverConfig = {
  PRODUCTION: process.env.NODE_ENV === 'production',
  PORT: process.env.PORT || 3000,
  ROOT: path.resolve(__dirname, '..'),
  DBURL: 'mongodb://localhost:27017/collar',
  SECRET: 'H-9BL2jN#4vy4%6a',
  GOOGLE_CLIENT_ID: '216176704370-kakt3a0ami4stqdt4i9kkeogpi56v234.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: 'mt3pknLt8gDGhcFn84Ar_fUQ'
};

module.exports = serverConfig;
