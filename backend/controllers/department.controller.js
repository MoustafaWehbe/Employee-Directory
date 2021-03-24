const departmentModel = require('../models/department.model')

const findAllDepartments = (req, res, next) => departmentModel.find()
    .then(d => res.json(d))
    .catch(err => res.json({ message: 'error occured', error: err }));

module.exports = {
    findAllDepartments,
}