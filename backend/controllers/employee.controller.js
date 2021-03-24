const employeeModel = require('../models/employee.model')

const findAllEmployees = (req, res, next) => {
    employeeModel.find().populate('department').populate('country')
        .then(employees => res.json(employees))
};

const findEmployeesById = (req, res, next) => {
    employeeModel.findById(req.params['id'])
        .then(emp => res.json(emp))
        .catch(err => res.json({ message: 'error occured', error: err }));
}

const deleteEmployeeById = (req, res, next) =>
    employeeModel.deleteOne({ _id: req.params['id'] })
        .then(emp => res.json(emp))
        .catch(err => res.json({ message: 'error occured', error: err }));

const addNewEmployee = (req, res, next) => employeeModel.create(req.body)
    .then(emp => res.json(emp))
    .catch(err => res.json({ message: 'error occured', error: err }));

const updateEmployee = (req, res, next) => employeeModel.updateOne({ _id: req.params['id'] }, { $set: req.body })
    .then(emp => res.json(emp))
    .catch(err => res.json({ message: 'error occured', error: err }));

module.exports = {
    findAllEmployees,
    findEmployeesById,
    deleteEmployeeById,
    addNewEmployee,
    updateEmployee
}