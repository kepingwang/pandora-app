const router = require('express').Router();
const db = require('../database/client');
const validateMaster = require('./auth').validateMaster;

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
