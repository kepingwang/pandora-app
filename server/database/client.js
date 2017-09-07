const dynamodb = require('./dynamodb');

const docClient = new dynamodb.DocumentClient();

module.exports = docClient;
