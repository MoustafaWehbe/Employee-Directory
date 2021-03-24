import CountriesSeeder from './seeders/country.seeder'
import DepartmentsSeeder  from './seeders/department.seeder'

const mongoose = require('mongoose');
const properties = require('./config/properties');
const mongoURL = properties.DB;

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
export const seedersList = {
  CountriesSeeder,
  DepartmentsSeeder
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
export const connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
export const dropdb = async () => mongoose.connection.db.dropDatabase();
