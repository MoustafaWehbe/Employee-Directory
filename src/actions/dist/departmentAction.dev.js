"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDepartments = void 0;

var _actionTypes = require("./actionTypes");

var _EmployeeApi = require("../utils/EmployeeApi");

var getDepartments = function getDepartments() {
  return function _callee(dispatch) {
    var result;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap((0, _EmployeeApi.getAllDepartments)());

          case 3:
            result = _context.sent;
            dispatch({
              type: _actionTypes.GET_DEPARTMENTS_SUCCESS,
              payload: result.data
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            dispatch({
              type: _actionTypes.GET_DEPARTMENTS_ERROR,
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

exports.getDepartments = getDepartments;