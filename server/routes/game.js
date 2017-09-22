const router = require('express').Router();
const db = require('../database/client');
const validateLogin = require('./auth').validateLogin;


router.post('/api/game/get-game-info',
  validateLogin,
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

router.post('/api/game/submit-action',
  validateLogin,
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
