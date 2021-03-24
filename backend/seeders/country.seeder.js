import { Seeder } from 'mongoose-data-seed';
import Country from '../models/country.model';

const data = [
    {
        name: 'US',
    },
    {
        name: 'Germany',
    },
    {
        name: 'France',
    },
    {
        name: 'Lebanon',
    },
];

class CountriesSeeder extends Seeder {
    async shouldRun() {
        const count = await Country.countDocuments().exec();

        return count === 0;
    }

    async run() {
        return Country.create(data);
    }
}

export default CountriesSeeder;