'use strict';

require('dotenv').config();
// const cors = require('cors');
// const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

// app dependencies
const userRouter = require('../route/user_router.js');
const error_middleware = require('./error_middleware.js');

// configure mongoose and connect to database
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

// server
const app = express();
let server;
// add middleware
// app.use(cors());
// app.use(morgan(dev));

// add routes
app.use(userRouter);
// add error middleware
app.use(error_middleware);

// Export module as 'serverControl'
const serverControl = module.exports = {};

// Start server
serverControl.start = () => {
  return new Promise((resolve, reject) => {
    if (!server || !server.isOn) {
      server = app.listen(process.env.PORT, () => {
        console.log('server up :: ', process.env.PORT);
        server.isOn = true;
        resolve();
      });
      return;
    }
    reject();
  });
};

// Close server
serverControl.stop = () => {
  return new Promise((resolve, reject) => {
    if (server && server.isOn) {
      server.close(() => {
        console.log('server down');
        server.isOn = false;
        resolve();
      });
      return;
    }
    reject();
  });
};
