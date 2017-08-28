var router = require('express').Router();
var session = require('express-session');
var db = require('../../connections/db');
var MongoStore = require('connect-mongo')(session);

router.use(session({
  name: 'pandora-server-session-cookie',
  secret: 'keyboard cat keping',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new MongoStore({ mongooseConnection: db })
}));

router.use(function printSession(req, res, next) {
  // console.log('req.session.passport: ', req.session.passport);
  return next();
});

router.get('/check-auth', (req, res) => {
  res.send(req.session);
});

module.exports = router;