"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var employeeSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  website: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  profileImageName: {
    type: String
  },
  profileImageData: {
    type: String
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});
var Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;