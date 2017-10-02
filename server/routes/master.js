const router = require('express').Router();
const da = require('../data-access');
const validateMaster = require('./auth').validateMaster;

router.post('/api/master/get-room-info',
  validateMaster,
  async (req, res) => {
    const room = await da.getRoom(req.body.roomName);
    return res.json(room);
  });

router.post('/api/master/join-room',
  validateMaster,
  async (req, res) => {
    await da.setUserRoom(req.user.email, req.body.roomName);
    return res.json({ message: 'master join room success' });
  });

module.exports = router;
