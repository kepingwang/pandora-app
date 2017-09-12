
function setAuthRoutes(app, passport) {
  app.post('/api/signup',
    (req, res, next) => {
      passport.authenticate('local-signup', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json(info);
        return req.logIn(user, (e1) => {
          if (e1) return next(e1);
          return res.json({ message: 'Signup success' });
        });
      })(req, res, next);
    });

  app.post('/api/login',
    (req, res, next) => {
      passport.authenticate('local-login', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json(info);
        return req.logIn(user, (e1) => {
          if (e1) return next(e1);
          return res.json({ message: 'Login success' });
        });
      })(req, res, next);
    });

  /*
    app.post('/api/logout', (req, res) => {
      req.logout(); // provided by passport
    });
  */
}

module.exports = setAuthRoutes;
