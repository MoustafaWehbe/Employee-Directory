"use strict";

var employeeModel = require('../models/employee.model');

var perPage = 10;

var getFindConditions = function getFindConditions(q, filterByKey, filterByValue) {
  var resCondition = {};

  if (!q && !filterByKey && !filterByValue) {
    return {};
  }

  var filterObj = null;

  if (filterByKey && filterByValue) {
    filterObj = filterByKey == 'department' ? {
      'department': filterByValue
    } : filterByKey == 'country' ? {
      'country': filterByValue
    } : null;
  }

  if (q) {
    if (filterObj) {
      resCondition = {
        $and: [{
          $or: [{
            firstName: {
              $regex: q,
              $options: "i"
            }
          }, {
            lastName: {
              $regex: q,
              $options: "i"
            }
          }, {
            email: {
              $regex: q,
              $options: "i"
            }
          }]
        }, filterObj]
      };
    } else {
      resCondition = {
        $or: [{
          firstName: {
            $regex: q,
            $options: "i"
          }
        }, {
          lastName: {
            $regex: q,
            $options: "i"
          }
        }, {
          email: {
            $regex: q,
            $options: "i"
          }
        }]
      };
    }
  } else {
    resCondition = filterObj || {};
  }

  return resCondition;
};

var findAllEmployees = function findAllEmployees(req, res, next) {
  var page = Math.max(1, req.query.page); // page start at 1

  var q = req.query.q;
  var filterByKey = req.query.filterByKey;
  var filterByValue = req.query.filterByValue;
  employeeModel.find(getFindConditions(q, filterByKey, filterByValue)).populate('department').populate('country').limit(perPage).skip(perPage * (page - 1)).sort({
    firstName: 'asc'
  }).then(function _callee(employees) {
    var result;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = {
              employees: employees,
              pagination: {
                perPage: perPage,
                page: page
              }
            };
            return _context.abrupt("return", res.json(result));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
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