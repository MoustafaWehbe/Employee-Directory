"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongooseDataSeed = require("mongoose-data-seed");

var _employee = _interopRequireDefault(require("../models/employee.model"));

var _department = require("./department.seeder");

var _country = require("./country.seeder");

var _utils = require("../utils/utils");

var _department2 = _interopRequireDefault(require("../models/department.model"));

var _country2 = _interopRequireDefault(require("../models/country.model"));

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

var faker = require('faker');

var getRandomData = function getRandomData() {
  var employees = [];

  for (var i = 0; i < 50; i++) {
    var api = {};
    api.firstName = faker.name.firstName();
    api.lastName = faker.name.lastName();
    api.email = faker.internet.email();
    api.website = faker.internet.url();
    api.phone = faker.phone.phoneNumber();
    api.address = faker.address.streetAddress();
    api.profileImageData = faker.image.imageUrl();
    api.department = (0, _utils.getRandomItem)(_department.departmentData.map(function (el) {
      return el._id;
    }));
    api.country = (0, _utils.getRandomItem)(_country.countryData.map(function (el) {
      return el._id;
    }));
    api.birthDate = faker.date.past();
    employees.push(api);
  }

  return employees;
};

var EmployeesSeeder =
/*#__PURE__*/
function (_Seeder) {
  _inherits(EmployeesSeeder, _Seeder);

  function EmployeesSeeder() {
    _classCallCheck(this, EmployeesSeeder);

    return _possibleConstructorReturn(this, _getPrototypeOf(EmployeesSeeder).apply(this, arguments));
  }

  _createClass(EmployeesSeeder, [{
    key: "shouldRun",
    value: function shouldRun() {
      var count;
      return regeneratorRuntime.async(function shouldRun$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_employee["default"].countDocuments().exec());

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
              return _context2.abrupt("return", _employee["default"].create(getRandomData()));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }]);

  return EmployeesSeeder;
}(_mongooseDataSeed.Seeder);

var _default = EmployeesSeeder;
exports["default"] = _default;