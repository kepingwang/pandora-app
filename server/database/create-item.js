const dynamodb = require('./dynamodb');

const docClient = new dynamodb.DocumentClient();

function put(params, callback) {
  docClient.put(params, callback);
}

module.exports = put;
