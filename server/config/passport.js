const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');

function configurePassport(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser((email, done) => {
    db.get({
      TableName: 'UserInfo',
      Key: { email },
    }, (err, data) => {
      if (err) return done(err);
      return done(null, {
        email: data.Item.email,
        username: data.Item.username,
        master: data.Item.master,
      });
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  }, (req, email, password, done) => {
    db.get({
      TableName: 'UserInfo',
      Key: { email },
    }, (err, data) => {
      if (err) return done(err);

      if (data.Item) return done(null, false, { message: 'Email already taken' });

      const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(12));
      const { username } = req.body;
      return db.put({
        TableName: 'UserInfo',
        Item: { email, username, hashedPassword },
      }, (e1) => {
        if (e1) return done(e1);
        return done(null, { email });
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, done) => {
    db.get({
      TableName: 'UserInfo',
      Key: { email },
    }, (err, data) => {
      if (err) return done(err);

      if (!data.Item) return done(null, false, { message: 'No user found' });

      if (!bcrypt.compareSync(password, data.Item.hashedPassword)) {
        return done(null, false, { message: 'Wrong password!' });
      }
      return done(null, { email });
    });
  }));
}

module.exports = configurePassport;
