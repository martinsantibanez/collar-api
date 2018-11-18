var express = require('express');
const mongoose = require('mongoose');
const serverConfig = require('./config');

mongoose.connect(serverConfig.DBURL, { useNewUrlParser: true });

const app = express();

require('./server/express')(app, serverConfig);

// fire up the server
app.listen(serverConfig.PORT, (error) => {
    if (error) throw error;
    console.log('Server running on port: ' + serverConfig.PORT);
});
  