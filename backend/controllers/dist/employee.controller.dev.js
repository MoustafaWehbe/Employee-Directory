"use strict";

var employeeModel = require('../models/employee.model');

var findAllEmployees = function findAllEmployees(req, res, next) {
  employeeModel.find().populate('department').populate('country').then(function (employees) {
    return res.json(employees);
  });
};

var findEmployeesById = function findEmployeesById(req, res, next) {
  employeeModel.findById(req.params['id']).then(function (emp) {
    return res.json(emp);
  })["catch"](function (err) {
    return res.json({
      message: 'error occured',
      error: err
    });
  });
};

var deleteEmployeeById = function deleteEmployeeById(req, res, next) {
  return employeeModel.deleteOne({
    _id: req.params['id']
  }).then(function (emp) {
    return res.json(emp);
  })["catch"](function (err) {
    return res.json({
      message: 'error occured',
      error: err
    });
  });
};

var addNewEmployee = function addNewEmployee(req, res, next) {
  return employeeModel.create(req.body).then(function (emp) {
    return res.json(emp);
  })["catch"](function (err) {
    return res.json({
      message: 'error occured',
      error: err
    });
  });
};

var updateEmployee = function updateEmployee(req, res, next) {
  return employeeModel.updateOne({
    _id: req.params['id']
  }, {
    $set: req.body
  }).then(function (emp) {
    return res.json(emp);
  })["catch"](function (err) {
    return res.json({
      message: 'error occured',
      error: err
    });
  });
};

module.exports = {
  findAllEmployees: findAllEmployees,
  findEmployeesById: findEmployeesById,
  deleteEmployeeById: deleteEmployeeById,
  addNewEmployee: addNewEmployee,
  updateEmployee: updateEmployee
};