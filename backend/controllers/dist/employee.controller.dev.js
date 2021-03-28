"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var properties = require('../config/properties');

var multer = require('multer');

var employeeModel = require('../models/employee.model');

var perPage = 15;

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
    firstName: 'desc'
  }).then(function _callee(employees) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            employeeModel.countDocuments(getFindConditions(q, filterByKey, filterByValue)).exec(function (err, count) {
              if (err) {
                return res.json({
                  message: 'error occured',
                  error: err
                });
              }

              var result = {
                employees: employees,
                total: count,
                pagination: {
                  perPage: perPage,
                  page: page
                }
              };
              return res.json(result);
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  });
};

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, properties.DIR);
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
}).single("myfile");

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
  upload(req, res, function (err) {
    employeeModel.create(_objectSpread({}, req.body, {
      profileImageName: req.body.imageName,
      profileImageData: req.file ? req.file.path : ''
    })).then(function (emp) {
      return res.json(emp);
    })["catch"](function (err) {
      return res.json({
        message: 'error occured',
        error: err
      });
    });
  });
};

var updateEmployee = function updateEmployee(req, res, next) {
  upload(req, res, function (err) {
    employeeModel.updateOne({
      _id: req.params['id']
    }, {
      $set: _objectSpread({}, req.body, {
        profileImageName: req.body.imageName,
        profileImageData: req.file ? req.file.path : req.body.profileImageData
      })
    }).then(function (emp) {
      return res.json(emp);
    })["catch"](function (err) {
      return res.json({
        message: 'error occured',
        error: err
      });
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