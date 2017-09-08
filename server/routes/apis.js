const db = require('../config/db');

function isLoggedIn(req, res, next) {
  if (process.env.NODE_ENV === 'dev') {
    return next();
  }
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: 'not authenticated' });
}

function setApiRoutes(app, passport) {
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

  app.post('/api/get-rooms', (req, res) => {
    db.scan({
      TableName: 'PandoraRooms',
      ProjectionExpression: 'roomName',
    }, (err, data) => {
      if (err) return res.status(500).send('db error');
      return res.json(data.Items);
    });
  });

  app.post('/api/get-room-info',
    isLoggedIn,
    (req, res) => {
      db.get({
        TableName: 'PandoraRooms',
        Key: { roomName: req.body.roomName },
      }, (err, data) => {
        if (err) return res.error(err);
        return res.json(data.Item);
      });
    });

  app.post('/api/join-room',
    isLoggedIn,
    (req, res) => {
      if (!req.user) return res.status(401).send({ message: 'not authenticated' });
      const { roomName, characterName } = req.body;
      db.get({
        TableName: 'PandoraRooms',
        Key: { roomName },
      }, (err, data) => {
        console.log(data);
        if (err) return res.error(err);
        const character = data.Item.characters.find(ch => ch.characterName === characterName);
        if (!character) return res.status(400).json({ message: 'Character does not exist.' });
        if (character.email) {
          if (character.email === req.user.email) {
            return res.json({ message: 'Join success - already joined.' });
          }
          return res.status(400).json({ message: 'Character already taken by another player.' });
        }
        const joinedCharacter = data.Item.characters.find(ch => ch.email === req.user.email);
        if (joinedCharacter && joinedCharacter.characterName !== characterName) {
          return res.status(400).json({ message: 'You already joined the game as another character.' });
        }
        character.email = req.user.email;
        console.log(data.Item.characters);
        db.put({
          TableName: 'PandoraRooms',
          Item: data.Item,
        }, (e1, d1) => {
          console.log(e1);
          console.log(d1);
          return res.json({ message: 'Join success.' });
        });
      });
    });

  /*
    app.post('/api/logout', (req, res) => {
      req.logout(); // provided by passport
    });
  */
}

module.exports = setApiRoutes;
