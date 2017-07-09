const router = require('express').Router();
const passport = require('passport');
const Account = require('../models/account');

router.post('/register', (req, res) => {
  Account.register(new Account({
    username: req.body.username,
    email: req.body.email
  }), req.body.password, function(err, account) {
    if (err) {
      res.send(err);
    } else {
      res.send('success');
    }
  });
});

router.post('/login', function(req, res) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.send(err); }
    if (!user) { return res.send({ message: 'invalid username or password' });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.send(err);
      } else {
        return res.send('success');
      }
    });
  })(req, res);
});

router.get('/logout', (req, res) => {
  req.session.destroy(function(err) {
    res.send('logout');
  });
});

module.exports = router;