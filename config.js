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
  GOOGLE_CLIENT_ID: '216176704370-obo5sho0fjqc0i5qs49hn4va64b7fl92.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: 'nJts8LaILUtUc6rTvtNAvBHG'
};

module.exports = serverConfig;
