var Departments = require('../controllers/department.controller');

module.exports = function (router) {
    router.get('/department', Departments.findAllDepartments);
}