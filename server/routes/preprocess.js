const router = require('express').Router();
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

router.use(logger('dev'));
router.use(bodyParser.json()); // parse application/json
router.use(bodyParser.json({
  type: 'application/vnd.api+json',
}));
router.use(bodyParser.urlencoded({
  extended: true,
}));
router.use(methodOverride('X-HTTP-Method-Override'));

module.exports = router;
