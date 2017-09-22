const router = require('express').Router();
const db = require('../database/client');
const validateLogin = require('./auth').validateLogin;

router.post('/api/get-user-info',
  validateLogin,
  (req, res, next) => {
    db.get({
      TableName: 'UserInfo',
      Key: { email: req.user.email },
    }, (err, data) => {
      if (err) next(err);
      const { email, username, master, roomName, characterName } = data.Item;
      res.json({ email, username, master, roomName, characterName });
    });
  });

router.post('/api/exit-room',
  validateLogin,
  (req, res, next) => {
    db.update({
      TableName: 'UserInfo',
      Key: { email: req.user.email },
      UpdateExpression: 'REMOVE roomName, characterName',
    }, (err) => {
      if (err) return next(err);
      return res.json({ message: 'exit room success' });
    });
  });

router.post('/api/get-rooms',
  validateLogin,
  (req, res, next) => {
    db.scan({
      TableName: 'PandoraRooms',
      ProjectionExpression: 'roomName',
    }, (err, data) => {
      if (err) return next(err);
      return res.json(data.Items.map(item => item.roomName));
    });
  });

router.post('/api/get-room-info',
  validateLogin,
  (req, res, next) => {
    db.get({
      TableName: 'PandoraRooms',
      Key: { roomName: req.body.roomName },
    }, (err, data) => {
      if (err) return next(err);
      const item = data.Item;
      // filter out character tokens
      item.characters = data.Item.characters.map(ch => ({
        characterName: ch.characterName,
        email: ch.email,
      }));
      return res.json(data.Item);
    });
  });

router.post('/api/join-room',
  validateLogin,
  (req, res, next) => {
    db.get({
      TableName: 'PandoraRooms',
      Key: { roomName: req.body.roomName },
    }, (err, data) => {
      if (err) return next(err);

      const character = data.Item.characters.find(
        ch => ch.characterName === req.body.characterName);

      if (!character) {
        return res.status(400).json({ message: 'Character does not exist.' });
      }

      if (character.email && character.email !== req.user.email) {
        return res.status(400).json({ message: 'Character already taken by another player.' });
      }

      const joinedCharacter = data.Item.characters.find(
        ch => ch.email === req.user.email);

      if (joinedCharacter && joinedCharacter.characterName !== req.body.characterName) {
        return res.status(400).json({ message: 'You already joined the game as another character.' });
      }

      if (!joinedCharacter && character.token && character.token !== req.body.token) {
        return res.status(401).json({ message: 'Wrong token!' });
      }

      character.email = req.user.email;

      return db.put({
        TableName: 'PandoraRooms',
        Item: data.Item,
      }, (e1) => {
        if (e1) return next(e1);

        return db.update({
          TableName: 'UserInfo',
          Key: { email: req.user.email },
          UpdateExpression: 'SET roomName = :r, characterName = :c',
          ExpressionAttributeValues: {
            ':r': req.body.roomName,
            ':c': req.body.characterName,
          },
        }, (e2) => {
          if (e2) return next(e2);

          return res.json({ message: 'join room success' });
        });
      });
    });
  });

module.exports = router;
