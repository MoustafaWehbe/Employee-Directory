const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    website: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
    country: { type: Schema.Types.ObjectId, ref: 'Country', required: true },
    imgUrl: { type: String, required: true },
    birthDate: { type: Date, required: true }
}, {
    timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;