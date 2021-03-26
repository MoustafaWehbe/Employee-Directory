"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCountries = exports.getDepartments = exports.createEmployee = exports.updateEmployee = exports.deleteContact = exports.getAllEmployees = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = process.env.API_URL || 'http://localhost:4000/api/v1';
var config = {
  'Content-Type': 'application/json'
}; // var config2 = {
//     'Content-Type': 'multipart/form-data',
// }

var getAllEmployees = function getAllEmployees() {
  return _axios["default"].get("".concat(api, "/employee"), config);
};

exports.getAllEmployees = getAllEmployees;

var deleteContact = function deleteContact(empId) {
  return _axios["default"]["delete"]("".concat(api, "/employee/").concat(empId), config);
};

exports.deleteContact = deleteContact;

var updateEmployee = function updateEmployee(emp) {
  return _axios["default"].post("".concat(api, "/employee"), emp, config);
};

exports.updateEmployee = updateEmployee;

var createEmployee = function createEmployee(emp) {
  return _axios["default"].post("".concat(api, "/employee"), emp, config);
};

exports.createEmployee = createEmployee;

var getDepartments = function getDepartments() {
  return _axios["default"].get("".concat(api, "/department"), config);
};

exports.getDepartments = getDepartments;

var getCountries = function getCountries() {
  return _axios["default"].get("".concat(api, "/country"), config);
}; // export const upload = (data, id) => {
//     console.log(data);
//     return axios.post(`${api}/upload/${id}`, data, config2);
// }


exports.getCountries = getCountries;