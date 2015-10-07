'use strict';

// Load correct configuration file according to 'NODE_ENV' variable
module.exports = require('./env/' + process.env.NODE_ENV + '.js');