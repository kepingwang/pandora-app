/* eslint no-unused-vars: 0 */
const router = require('express').Router();

// error-handling middleware functions have 4 arguments instead of 3.

if (process.env.NODE_ENV === 'dev') {
  router.use((err, req, res, next) => {
    res.status(500).json({
      message: err.message,
      error: err,
    });
  });
}

router.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    error: {},
  });
});

module.exports = router;
