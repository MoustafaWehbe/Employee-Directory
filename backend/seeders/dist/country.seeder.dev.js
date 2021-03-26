"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.countryData = void 0;

var _mongooseDataSeed = require("mongoose-data-seed");

var _country = _interopRequireDefault(require("../models/country.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var mongoose = require('mongoose');

var countryData = [{
  _id: mongoose.Types.ObjectId(),
  name: 'US'
}, {
  _id: mongoose.Types.ObjectId(),
  name: 'Germany'
}, {
  _id: mongoose.Types.ObjectId(),
  name: 'France'
}, {
  _id: mongoose.Types.ObjectId(),
  name: 'Lebanon'
}];
exports.countryData = countryData;

var CountriesSeeder =
/*#__PURE__*/
function (_Seeder) {
  _inherits(CountriesSeeder, _Seeder);

  function CountriesSeeder() {
    _classCallCheck(this, CountriesSeeder);

    return _possibleConstructorReturn(this, _getPrototypeOf(CountriesSeeder).apply(this, arguments));
  }

  _createClass(CountriesSeeder, [{
    key: "shouldRun",
    value: function shouldRun() {
      var count;
      return regeneratorRuntime.async(function shouldRun$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_country["default"].countDocuments().exec());

            case 2:
              count = _context.sent;
              return _context.abrupt("return", count === 0);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "run",
    value: function run() {
      return regeneratorRuntime.async(function run$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", _country["default"].create(countryData));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }]);

  return CountriesSeeder;
}(_mongooseDataSeed.Seeder);

var _default = CountriesSeeder;
exports["default"] = _default;