const countryModel = require('../models/country.model')

const findAllCountries = (req, res, next) => countryModel.find()
    .then(c => res.json(c))
    .catch(err => res.json({ message: 'error occured', error: err }));

module.exports = {
    findAllCountries,
}