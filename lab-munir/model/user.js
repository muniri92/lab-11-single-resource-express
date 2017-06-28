'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  age: {type: Number, required: true},
  created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('user', userSchema);

// add static methods to Note contructor
