const winston = require('winston');

if (process.env.NODE_ENV === 'dev') {
  winston.configure({
    transports: [
      new (winston.transports.Console)({
        level: 'debug',
      }),
    ],
  });
} else {
  winston.configure({
    transports: [
      new (winston.transports.File)({
        filename: 'pandora.log',
        level: 'info',
      }),
    ],
  });
}

module.exports = winston;
