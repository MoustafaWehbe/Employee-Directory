import { Seeder } from 'mongoose-data-seed';
import Department from '../models/department.model';

const mongoose = require('mongoose');

export const departmentData = [
    {
        _id: mongoose.Types.ObjectId(),
        name: 'Engineering',
    },
    {
        _id: mongoose.Types.ObjectId(),
        name: 'HR',
    },
    {
        _id: mongoose.Types.ObjectId(),
        name: 'Sales',
    },
    {
        _id: mongoose.Types.ObjectId(),
        name: 'Marketing',
    },
];

class DepartmentsSeeder extends Seeder {
    async shouldRun() {
        const count = await Department.countDocuments().exec();

        return count === 0;
    }

    async run() {
        return Department.create(departmentData);
    }
}

export default DepartmentsSeeder;