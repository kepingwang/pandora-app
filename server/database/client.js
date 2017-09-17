const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1',
  endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
});

module.exports = docClient;
