const router = require('express').Router();
const game = require('../game');
const da = require('../data-access');
const validateLogin = require('./auth').validateLogin;


router.post('/api/game/get-game-info',
  validateLogin,
  async (req, res) => {
    const gameInfo = await game.getGameInfo(req.body.roomName, req.user.email);
    return res.json(gameInfo);
  });

router.post('/api/game/get-action-info',
  validateLogin,
  async (req, res) => {
    const actionInfo = await da.getAction(req.body.gameName, req.body.actionName);
    return res.json(actionInfo);
  });


module.exports = router;
