// Express configs

/**
 * module dependencies for express configuration
 */
// const morgan = require('morgan');
const compress = require('compression');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const session = require('express-session');
// const mongoStore = require('connect-mongo')(session);
const cors = require('cors');
// const passport = require('passport');
// const flash = require('connect-flash');
/**
 * express configuration
 */
const expressConfig = (app, serverConfig) => {

  // apply gzip compression (should be placed before express.static)
  app.use(compress());

  // log server requests to console
  // !serverConfig.PRODUCTION && app.use(morgan('dev'));

  // get data from html froms
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // read cookies (should be above session)
  // app.use(cookieParser());

  // use session with mongo
  // app.use(session({
  //   resave: false,
  //   saveUninitialized: true,
  //   secret: '@3LKJjWzz3=$22Dm',
  //   store: new mongoStore({
  //     url: serverConfig.DBURL,
  //     collection : 'sessions',
  //   }),
  // }));

  // connect flash for flash messages (should be declared after sessions)
  // app.use(flash());

   // apply passport configs
  require('./passport')(app);
 
  //cors
  app.use(cors());

  // apply route configs
  require('./api/routes')(app);
};

module.exports = expressConfig;
