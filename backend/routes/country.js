var Countries = require('../controllers/country.controller');

module.exports = function (router) {
    router.get('/country', Countries.findAllCountries);
}