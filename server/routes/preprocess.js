const router = require('express').Router();
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

if (process.env.NODE_ENV === 'dev') {
  router.use(morgan('dev'));
} else {
  router.use(morgan('common', {
    stream: fs.createWriteStream(
      path.join(__dirname, '../../access.log'),
      { flags: 'a' },
    ),
  }));
}
router.use(cookieParser());
router.use(bodyParser.json()); // parse application/json
router.use(bodyParser.json({
  type: 'application/vnd.api+json',
}));
router.use(bodyParser.urlencoded({
  extended: true,
}));
router.use(methodOverride('X-HTTP-Method-Override'));

module.exports = router;
