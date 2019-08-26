// Express configs
const compress = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
/**
 * express configuration
 */
const expressConfig = (app, serverConfig) => {
  // apply gzip compression (should be placed before express.static)
  app.use(compress());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  // apply passport configs
  require('./passport')(app);
 
  // apply route configs
  require('./api/routes')(app);
};

module.exports = expressConfig;
