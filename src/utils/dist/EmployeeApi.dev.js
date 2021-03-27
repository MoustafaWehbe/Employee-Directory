"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadPicture = exports.getAllCountries = exports.getAllDepartments = exports.createEmployee = exports.updateEmployee = exports.deleteEmployee = exports.getAllEmployees = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = process.env.API_URL || 'http://localhost:4000/api/v1';
var config = {
  'Content-Type': 'application/json'
};
var config2 = {
  'Content-Type': 'multipart/form-data'
};

var getAllEmployees = function getAllEmployees(page, q, filterByValue, filterByKey) {
  var paramsText = "";
  var params = [];

  if (page) {
    params.push("page=" + page);
  } else {
    params.push("page=" + 1);
  }

  if (q) {
    params.push("q=" + q);
  }

  if (filterByValue) {
    params.push("filterByValue=" + filterByValue);
  }

  if (filterByKey) {
    params.push("filterByKey=" + filterByKey);
  }

  paramsText = "?" + params.join("&");
  return _axios["default"].get("".concat(api, "/employee").concat(paramsText), config);
};

exports.getAllEmployees = getAllEmployees;

var deleteEmployee = function deleteEmployee(empId) {
  return _axios["default"]["delete"]("".concat(api, "/employee/").concat(empId), config);
};

exports.deleteEmployee = deleteEmployee;

var updateEmployee = function updateEmployee(emp) {
  return _axios["default"].put("".concat(api, "/employee/").concat(emp._id), emp, config);
};

exports.updateEmployee = updateEmployee;

var createEmployee = function createEmployee(emp) {
  return _axios["default"].post("".concat(api, "/employee"), emp, config);
};

exports.createEmployee = createEmployee;

var getAllDepartments = function getAllDepartments() {
  return _axios["default"].get("".concat(api, "/department"), config);
};

exports.getAllDepartments = getAllDepartments;

var getAllCountries = function getAllCountries() {
  return _axios["default"].get("".concat(api, "/country"), config);
};

exports.getAllCountries = getAllCountries;

var uploadPicture = function uploadPicture(empId, data) {
  return _axios["default"].post("".concat(api, "/employee/photo/").concat(empId), data, config2);
};

exports.uploadPicture = uploadPicture;