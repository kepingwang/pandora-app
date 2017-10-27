const router = require('express').Router();

if (process.env.NODE_ENV === 'prod') {
  router.use((req, res, next) => {
    if (req.header('x-forwarded-proto') === 'http') {
      return res.redirect(`https://${req.hostname}${req.url}`);
    }
    return next();
  });
}

module.exports = router;
