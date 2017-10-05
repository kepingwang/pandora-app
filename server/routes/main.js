const router = require('express').Router();
const da = require('../data-access');
const validateLogin = require('./auth').validateLogin;

router.post('/api/get-user-info',
  validateLogin,
  async (req, res) => {
    const user = await da.getUser(req.user.email);
    delete user.hashedPassword;
    return res.json(user);
  });

router.post('/api/exit-room',
  validateLogin,
  async (req, res) => {
    await da.setUserRoom(req.user.email, null);
    return res.json({ message: 'exit room success' });
  });

router.post('/api/get-rooms',
  validateLogin,
  async (req, res) => {
    const roomNames = await da.getRoomNames();
    return res.json(roomNames);
  });

router.post('/api/get-room-info',
  validateLogin,
  async (req, res) => {
    const room = await da.getRoom(req.body.roomName);
    room.characters = room.characters.map(ch => ({
      characterName: ch.characterName,
      email: ch.email,
    }));
    return res.json(room);
  });

router.post('/api/join-room',
  validateLogin,
  async (req, res) => {
    const room = await da.getRoom(req.body.roomName);
    const character = room.characters.find(
      ch => ch.characterName === req.body.characterName,
    );
    if (!character) {
      return res.status(400).json({ message: 'Character does not exist.' });
    }
    if (character.email && character.email !== req.user.email) {
      return res.status(400).json({ message: 'Character already taken by another player.' });
    }
    const joinedCharacter = room.characters.find(
      ch => ch.email === req.user.email,
    );
    if (joinedCharacter && joinedCharacter.characterName !== req.body.characterName) {
      return res.status(400).json({ message: 'You already joined the game as another character.' });
    }
    if (!joinedCharacter && character.token && character.token !== req.body.token) {
      return res.status(401).json({ message: 'Wrong token!' });
    }
    character.email = req.user.email;
    await da.setRoom(room);
    await da.setUserRoom(req.user.email, req.body.roomName, req.body.characterName);
    return res.json({ message: 'join room success' });
  });

module.exports = router;
