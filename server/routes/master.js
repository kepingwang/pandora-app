const router = require('express').Router();
const db = require('../database/client');
const validateMaster = require('./auth').validateMaster;
const io = require('../socket/io');

router.post('/api/master/get-game-info',
  validateMaster,
  (req, res, next) => {
    const { roomName } = req.body;
    db.get({
      TableName: 'PandoraRooms',
      Key: { roomName },
    }, (err, data) => {
      if (err) return next(err);
      const item = data.Item;
      return res.json({
        status: item.gameStatus,
      });
    });
  });

router.post('/api/master/update-game-status',
  validateMaster,
  (req, res, next) => {
    const { roomName, status } = req.body;
    db.update({
      TableName: 'PandoraRooms',
      Key: { roomName },
      UpdateExpression: 'SET gameStatus = :s',
      ExpressionAttributeValues: {
        ':s': status,
      },
    }).promise()
      .then(() => {
        res.json({ message: 'Update success.' });
        io.to(roomName).emit('updateStatus');
      })
      .catch((err) => { if (err) next(err); });
  });

router.post('/api/master/join-room',
  validateMaster,
  (req, res, next) => {
    db.update({
      TableName: 'UserInfo',
      Key: { email: req.user.email },
      UpdateExpression: 'SET roomName = :r',
      ExpressionAttributeValues: {
        ':r': req.body.roomName,
      },
    }, (err) => {
      if (err) return next(err);
      return res.json({ message: 'master join room success' });
    });
  });

router.post('/api/master/full-room-info',
  validateMaster,
  (req, res) => {
    res.json({
      message: 'dummy data',
    });
  });

module.exports = router;
