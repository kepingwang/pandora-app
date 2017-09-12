const router = require('express').Router();
const db = require('../../config/db');
const { isMaster } = require('../auth-middlewares');

router.post('/api/master/join-room',
  isMaster,
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
  isMaster,
  (req, res) => {
    res.json({
      message: 'dummy data',
    });
  });

module.exports = router;
