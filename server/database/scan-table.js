const dynamodb = require('./dynamodb');

const docClient = new dynamodb.DocumentClient();
const params = {
  TableName: 'Music',
  ProjectionExpression: 'Artist, SongTitle',
};

module.exports = function scanTable(req, res) {
  console.log('Scanning Music table.');
  docClient.scan(params, function onScan(err, data) {
    if (err) {
      console.error('Unable to scan table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      // print all the movies
      console.log('Scan succeeded.');
      data.Items.forEach((song) => {
        console.log(song.artist);
      });
      res.send(data);

      // continue scanning if we have more movies, because
      // scan can retrieve a maximum of 1MB of data
      if (typeof data.LastEvaluatedKey !== 'undefined') {
        console.log('Scanning for more...');
        params.ExclusiveStartKey = data.LastEvaluatedKey;
        docClient.scan(params, onScan);
      }
    }
  });
};
