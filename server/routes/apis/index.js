const router = require('express').Router();
const db = require('../../config/db');
const { isLoggedIn, isAdmin } = require('../auth-middlewares');

router.post('/api/get-rooms',
  isLoggedIn,
  (req, res, next) => {
    db.scan({
      TableName: 'PandoraRooms',
      ProjectionExpression: 'roomName',
    }, (err, data) => {
      if (err) return next(err);
      return res.json(data.Items);
    });
  });

router.post('/api/get-user-room-character',
  isLoggedIn,
  (req, res, next) => {
    db.get({
      TableName: 'UserInfo',
      Key: { email: req.user.email },
    }, (err, data) => {
      if (err) return next(err);
      if (!data.Item) {
        return res.status(400).json({ message: 'user not found' });
      }
      return res.json({
        roomName: data.Item.roomName,
        characterName: data.Item.characterName,
      });
    });
  });

router.post('/api/get-room-info',
  isLoggedIn,
  (req, res, next) => {
    db.get({
      TableName: 'PandoraRooms',
      Key: { roomName: req.body.roomName },
    }, (err, data) => {
      if (err) return next(err);
      return res.json(data.Item);
    });
  });

router.post('/api/join-room',
  isLoggedIn,
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

router.post('/api/get-stats',
  isLoggedIn,
  (req, res, next) => {
    const { roomName, characterName } = req.body;
    // TODO: verify email roomName characterName
    db.get({
      TableName: 'PandoraRooms',
      Key: { roomName: `${roomName}:${characterName}` },
    }, (err, data) => {
      if (err) return next(err);
      if (!data.Item) {
        return res.json({ message: 'data not found' });
      }
      return res.json({ stats: data.Item.stats });
    });
  });

router.post('/api/submit-action',
  isLoggedIn,
  (req, res, next) => {
    const { roomName, characterName, actionName, scope } = req.body;
    db.get({
      TableName: 'PandoraRooms',
      Key: { roomName: `${roomName}:${characterName}` },
    }, (err, data) => {
      if (err) return next(err);
      if (!data.Item) {
        return res.json({ message: 'data not found' });
      }

      // calculations to update stats
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

      return db.put({
        TableName: 'PandoraRooms',
        Item: data.Item,
      }, (e1) => {
        if (e1) return next(e1);
        return res.json({ message: 'action taken, data updated' });
      });
    });
  });

module.exports = router;
