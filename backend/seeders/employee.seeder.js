import { Seeder } from 'mongoose-data-seed';
import Employee from '../models/employee.model';
import { departmentData } from './department.seeder'
import { countryData } from './country.seeder'
import { getRandomItem } from '../utils/utils'
import Department from '../models/department.model';
import Country from '../models/country.model';

var faker = require('faker');

const getRandomData = () => {
    let employees = [];
    for (let i = 0; i < 50; i++) {
        let api = {};
        api.firstName = faker.name.firstName();
        api.lastName = faker.name.lastName();
        api.email = faker.internet.email();
        api.website = faker.internet.url();
        api.phone = faker.phone.phoneNumber();
        api.address = faker.address.streetAddress();
        api.profileImageData = faker.random.image();
        api.department = getRandomItem(departmentData.map(el => el._id));
        api.country = getRandomItem(countryData.map(el => el._id));
        api.birthDate = faker.date.past();
        employees.push(api);
    }

    return employees;
}

class EmployeesSeeder extends Seeder {
    async shouldRun() {
        const count = await Employee.countDocuments().exec();

        return count === 0;
    }

    async run() {
        return Employee.create(getRandomData());
    }
}

export default EmployeesSeeder;