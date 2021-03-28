"use strict";

var Employees = require('../controllers/employee.controller');

module.exports = function (router) {
  router.post('/employee', Employees.addNewEmployee);
  router.get('/employee', Employees.findAllEmployees);
  router.get('/employee/:id', Employees.findEmployeesById);
  router.put('/employee/:id', Employees.updateEmployee);
  router["delete"]('/employee/:id', Employees.deleteEmployeeById);
};