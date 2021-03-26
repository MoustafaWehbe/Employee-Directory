import { Seeder } from 'mongoose-data-seed';
import Country from '../models/country.model';

const mongoose = require('mongoose');

export const countryData = [
    {
        _id: mongoose.Types.ObjectId(),
        name: 'US',
    },
    {
        _id: mongoose.Types.ObjectId(),
        name: 'Germany',
    },
    {
        _id: mongoose.Types.ObjectId(),
        name: 'France',
    },
    {
        _id: mongoose.Types.ObjectId(),
        name: 'Lebanon',
    },
];

class CountriesSeeder extends Seeder {
    async shouldRun() {
        const count = await Country.countDocuments().exec();

        return count === 0;
    }

    async run() {
        return Country.create(countryData);
    }
}

export default CountriesSeeder;