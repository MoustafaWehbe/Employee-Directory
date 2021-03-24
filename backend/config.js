require('babel-register')({
    presets: [ 'env' ]
})
// Import the rest of our application.
module.exports = require('./your_server_file.js')