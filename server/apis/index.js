function isLoggedIn(req, res, next) {

}

function setApiRoutes(app, passport) {
  // app.post('/api/login', do all our passport stuff here);
  // app.post('/api/signup', do all our passport stuff here);

  app.post('/api/echo', (req, res) => {
    res.send(req.body);
  });

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

  app.post('/api/unprotected', (req, res) => {
    res.send({
      info: 'here is the unprotected information',
    });
  });

  app.post('/api/protected', isLoggedIn, (req, res) => {
    res.send({
      info: 'here is the protected info',
    });
  });

  app.post('/api/logout', (req, res) => {
    req.logout(); // provided by passport
    res.redirect('/');
  });
}

module.exports = setApiRoutes;
