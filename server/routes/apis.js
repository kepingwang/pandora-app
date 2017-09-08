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

  app.post('/api/get-user-room-character', (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: 'not logged in' });
    }
    return db.get({
      TableName: 'UserInfo',
      Key: { email: req.user.email },
    }, (err, data) => {
      if (data.Item) {
        return res.json({
          roomName: data.Item.roomName,
          characterName: data.Item.characterName,
        });
      }
      return res.json({
        roomName: null,
        characterName: null,
      });
    });
  });

  app.post('/api/get-room-info',
    isLoggedIn,
    (req, res) => {
      console.log(req.body);
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
        if (character.email && character.email !== req.user.email) {
          return res.status(400).json({ message: 'Character already taken by another player.' });
        }
        const joinedCharacter = data.Item.characters.find(ch => ch.email === req.user.email);
        if (joinedCharacter && joinedCharacter.characterName !== characterName) {
          return res.status(400).json({ message: 'You already joined the game as another character.' });
        }
        character.email = req.user.email;
        console.log(data.Item.characters);
        return db.put({
          TableName: 'PandoraRooms',
          Item: data.Item,
        }, (e1, d1) => {
          return db.update({
            TableName: 'UserInfo',
            Key: { email: req.user.email },
            UpdateExpression: 'SET roomName = :r, characterName = :c',
            ExpressionAttributeValues: {
              ':r': roomName,
              ':c': characterName,
            },
          }, (e2, d2) => {
            res.json({ message: 'join room success' });
          });
        });
      });
    });

  app.post('/api/get-stats',
    isLoggedIn,
    (req, res) => {
      console.log(req.user);
      console.log(req.body);
      // TODO: verifies email, roomName, and characterName
      // if (!req.user) res.status(401).json({ message: 'you are not authorized' });
      const { roomName, characterName } = req.body;
      console.log(`${roomName}:${characterName}`);
      db.get({
        TableName: 'PandoraRooms',
        Key: { roomName: `${roomName}:${characterName}` },
      }, (err, data) => {
        if (data.Item) {
          return res.json({ stats: data.Item.stats });
        }
        return res.json({ message: 'data not found' });
      });
    });

  app.post('/api/submit-action',
    isLoggedIn,
    (req, res) => {
      const { roomName, characterName, actionName, scope } = req.body;
      db.get({
        TableName: 'PandoraRooms',
        Key: { roomName: `${roomName}:${characterName}` },
      }, (err, data) => {
        if (data.Item) {
          const stats = data.Item.stats;
          let changeNumber = 1;
          if (scope === 'private') {
            changeNumber = 1;
          } else if (scope === 'community') {
            changeNumber = 2;
          } else if (scope === 'global') {
            changeNumber = 3;
          }
          stats.affluence += changeNumber;
          stats.influence += changeNumber;
          stats.wellbeing += changeNumber;
          if (!stats.history) {
            stats.history = [];
          }
          stats.history.push({ actionName, scope });
          console.log(data.Item);
          return db.put({
            TableName: 'PandoraRooms',
            Item: data.Item,
          }, (e1, d1) => {
            console.log(e1);
            console.log(d1);
            return res.json({ message: 'data updated' });
          });
        }
        return res.json({ message: 'data not found' });
      });
    });

  /*
    app.post('/api/logout', (req, res) => {
      req.logout(); // provided by passport
    });
  */
}

module.exports = setApiRoutes;
