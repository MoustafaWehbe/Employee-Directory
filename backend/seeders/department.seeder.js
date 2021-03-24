import { Seeder } from 'mongoose-data-seed';
import Department from '../models/department.model';

const data = [
    {
        name: 'Engineering',
    },
    {
        name: 'HR',
    },
    {
        name: 'Sales',
    },
    {
        name: 'Marketing',
    },
];

class DepartmentsSeeder extends Seeder {
    async shouldRun() {
        const count = await Department.countDocuments().exec();

        return count === 0;
    }

    async run() {
        return Department.create(data);
    }
}

export default DepartmentsSeeder;