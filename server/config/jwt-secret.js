const AWS = require('aws-sdk');

let jwtSecret = null;

const fetchJwtSecret = () =>
  new Promise((resolve, reject) => {
    if (jwtSecret) {
      return resolve(jwtSecret);
    }
    const s3 = new AWS.S3();
    return s3.getObject({
      Bucket: 'config.play-pandora.com',
      Key: 'jwt-secret.txt',
    }).promise()
      .then((data) => {
        jwtSecret = data.Body.toString('utf-8');
        resolve(jwtSecret);
      })
      .catch(err => reject(err));
  });

/* eslint-disable no-console */
fetchJwtSecret().then().catch(err => console.log(err));
/* eslint-enable */

module.exports = fetchJwtSecret;
