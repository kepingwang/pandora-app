const router = require('express').Router();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

router.use(morgan('dev'));
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
