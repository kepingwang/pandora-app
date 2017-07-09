var router = require('express').Router();

router.use(function(req, res, next) {
  var err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

router.use(function(err, req, res, next) {
  if (err) {
    res.send(err);
  }
});

module.exports = router;