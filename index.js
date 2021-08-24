'use strict';
require('dotenv').config()
const server = require('./src/server');
const { db } = require('./src/auth/models/index.js');
db.sync()
  .then(() => {

    // Start the web server
    server.start(process.env.PORT||3000);
  }).catch(console.error);