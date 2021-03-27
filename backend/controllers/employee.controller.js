var multer = require('multer')

const employeeModel = require('../models/employee.model')
const perPage = 10;

const getFindConditions = (q, filterByKey, filterByValue) => {
    let resCondition = {};
    if (!q && !filterByKey && !filterByValue) {
        return {};
    }
    let filterObj = null;
    if (filterByKey && filterByValue) {
        filterObj = filterByKey == 'department' ? { 'department': filterByValue } :
            filterByKey == 'country' ?
                { 'country': filterByValue } : null
    }
    if (q) {
        if (filterObj) {
            resCondition = {
                $and: [
                    {
                        $or: [
                            { firstName: { $regex: q, $options: "i" } },
                            { lastName: { $regex: q, $options: "i" } },
                            { email: { $regex: q, $options: "i" } },
                        ],
                    },
                    filterObj
                ]
            }
        }
        else {
            resCondition = {
                $or: [
                    { firstName: { $regex: q, $options: "i" } },
                    { lastName: { $regex: q, $options: "i" } },
                    { email: { $regex: q, $options: "i" } },
                ],
            }
        }
    }
    else {
        resCondition = filterObj || {};
    }
    return resCondition;
}

const findAllEmployees = (req, res, next) => {
    const page = Math.max(1, req.query.page); // page start at 1
    const q = req.query.q;
    const filterByKey = req.query.filterByKey;
    const filterByValue = req.query.filterByValue;

    employeeModel
        .find(getFindConditions(q, filterByKey, filterByValue))
        .populate('department').populate('country')
        .limit(perPage)
        .skip(perPage * (page - 1))
        .sort({
            firstName: 'asc'
        })
        .then(async (employees) => {
            employeeModel.countDocuments(getFindConditions(q, filterByKey, filterByValue))
                .exec((err, count) => {
                    if (err) {
                        return res.json({ message: 'error occured', error: err });
                    }
                    let result = {
                        employees,
                        total: count,
                        pagination: {
                            perPage,
                            page
                        }
                    }
                    return res.json(result)
                })
        });
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, true);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


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

const uploadPhoto = (req, res) => {
    upload.single('fdsf')(req, res, () => {
        return employeeModel.updateOne({ _id: req.params['id'] }, {
            profileImageName: req.body.imageName,
            profileImageData: req.file.path
        })
            .then(res => res.json(res))
            .catch(err => res.json({ message: 'error occured', error: err }));
    });
}

module.exports = {
    findAllEmployees,
    findEmployeesById,
    deleteEmployeeById,
    addNewEmployee,
    updateEmployee,
    uploadPhoto
}