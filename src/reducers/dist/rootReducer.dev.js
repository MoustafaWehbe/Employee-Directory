"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _employeeReducer = _interopRequireDefault(require("./employeeReducer"));

var _departmentReducer = _interopRequireDefault(require("./departmentReducer"));

var _countryReducer = _interopRequireDefault(require("./countryReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _redux.combineReducers)({
  employee: _employeeReducer["default"],
  department: _departmentReducer["default"],
  country: _countryReducer["default"]
});

exports["default"] = _default;