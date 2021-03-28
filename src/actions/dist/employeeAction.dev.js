"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClearAddResponse = exports.DeleteEmployee = exports.UpdateEmployee = exports.addEmployee = exports.getEmployees = void 0;

var _actionTypes = require("./actionTypes");

var _EmployeeApi = require("../utils/EmployeeApi");

var getEmployees = function getEmployees(page, q, filterByValue, filterByKey) {
  return function _callee(dispatch) {
    var result;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap((0, _EmployeeApi.getAllEmployees)(page, q, filterByValue, filterByKey));

          case 3:
            result = _context.sent;
            dispatch({
              type: _actionTypes.GET_EMPLOYEES_SUCCESS,
              payload: result.data
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            dispatch({
              type: _actionTypes.GET_EMPLOYEES_ERROR,
              error: _context.t0
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
};

exports.getEmployees = getEmployees;

var addEmployee = function addEmployee(emp) {
  return function _callee2(dispatch) {
    var result;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap((0, _EmployeeApi.createEmployee)(emp));

          case 3:
            result = _context2.sent;
            dispatch({
              type: _actionTypes.ADD_EMPLOYEE_SUCCESS,
              payload: result.data
            });
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            dispatch({
              type: _actionTypes.ADD_EMPLOYEE_ERROR,
              error: _context2.t0
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
};

exports.addEmployee = addEmployee;

var UpdateEmployee = function UpdateEmployee(emp, emp_id) {
  return function _callee3(dispatch) {
    var result;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap((0, _EmployeeApi.updateEmployee)(emp, emp_id));

          case 3:
            result = _context3.sent;
            dispatch({
              type: _actionTypes.UPDATE_EMPLOYEE_SUCCESS,
              payload: result.data
            });
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            dispatch({
              type: _actionTypes.UPDATE_EMPLOYEE_ERROR,
              error: _context3.t0
            });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
};

exports.UpdateEmployee = UpdateEmployee;

var DeleteEmployee = function DeleteEmployee(empId) {
  return function _callee4(dispatch) {
    var result;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return regeneratorRuntime.awrap((0, _EmployeeApi.deleteEmployee)(empId));

          case 3:
            result = _context4.sent;
            dispatch({
              type: _actionTypes.DELETE_EMPLOYEE_SUCCESS,
              payload: result.data
            });
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            dispatch({
              type: _actionTypes.DELETE_EMPLOYEE_ERROR,
              error: _context4.t0
            });

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
};

exports.DeleteEmployee = DeleteEmployee;

var ClearAddResponse = function ClearAddResponse() {
  return function (dispatch) {
    dispatch({
      type: _actionTypes.CLEAR_ADD_RESPONSE,
      payload: null
    });
  };
};

exports.ClearAddResponse = ClearAddResponse;