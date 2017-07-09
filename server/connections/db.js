var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost:27017/pandora';

mongoose.Promise = global.Promise;
var connection = mongoose.createConnection(dbURI);

module.exports = connection;