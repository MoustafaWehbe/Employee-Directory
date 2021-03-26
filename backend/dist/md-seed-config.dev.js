"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropdb = exports.connect = exports.seedersList = void 0;

var _country = _interopRequireDefault(require("./seeders/country.seeder"));

var _department = _interopRequireDefault(require("./seeders/department.seeder"));

var _employee = _interopRequireDefault(require("./seeders/employee.seeder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mongoose = require('mongoose');

var properties = require('./config/properties');

var mongoURL = properties.DB;
/**
 * Seeders List
 * order is important
 * @type {Object}
 */

var seedersList = {
  CountriesSeeder: _country["default"],
  DepartmentsSeeder: _department["default"],
  EmployeesSeeder: _employee["default"]
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */

exports.seedersList = seedersList;

var connect = function connect() {
  return regeneratorRuntime.async(function connect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(mongoose.connect(mongoURL, {
            useNewUrlParser: true
          }));

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */


exports.connect = connect;

var dropdb = function dropdb() {
  return regeneratorRuntime.async(function dropdb$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", mongoose.connection.db.dropDatabase());

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.dropdb = dropdb;