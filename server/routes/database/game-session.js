var mongoose = require('mongoose');
var db = require('../../connections/db');
var router = require('express').Router();

var gameSchema = mongoose.Schema({
  name: String,
  personalities: [{
    _id: false,
    type: String,
    items: [{
      _id: false,
      name: String
    }]
  }],
  characters: [{
    _id: false,
    name: String
  }]
});
var Game = db.model('Game', gameSchema, "games");

router.get('/game/names', (req, res) => {
  Game.find({}, { 'name': 1 }, function(err, docs) {
    if (err) { res.send(err); } else { res.json(docs); }
  });
});

router.use('/master/*', (req, res, next) => {
  // console.log('going through master router');
  if (req.session.passport === undefined ||
    req.session.passport.user !== 'master') {
    return res.send('unqualified request');
  }
  next();
});
router.post('/master/game/read', (req, res) => {
  Game.find({
    'name': req.body.name
  }, { '_id': 0, '__v': 0 }, function(err, docs) {
    if (err) { res.send(err); } else { res.json(docs); }
  });
});
router.post('/master/game/update', (req, res) => {
  Game.findOneAndUpdate({
      'name': req.body.name
    }, req.body, { upsert: true }, function(err, raw) {
      console.log(err);
      console.log(raw);
      if (err) {
        res.send(err);
      } else {
        res.send(req.body.name + ' game updated');
      }
    });
});

// user can create new personality while playing the game
router.post('/user/game/personality/add', (req, res) => {
  Game.update({
    'name': req.body.gameName,
    'personalities.type': req.body.type
  }, {
    '$push': {
      'personalities.$.items': {
        'name': req.body.name
      }
    }
  }, function(err, raw) {
    if (err) {
      res.send(err);
    } else {
      res.send('personality added');
    }
  });
});

var gameSessionSchema = mongoose.Schema({
  gameName: String,
  sessionName: String,
  password: String,
  roundNumber: Number,
  characters: [{
    _id: false,
    name: String,
    username: String,
    personalities: [{
      _id: false,
      type: String,
      items: [{
        _id: false,
        name: String
      }]
    }]
  }]
});

var GameSession = db.model('GameSession', gameSessionSchema, "game-sessions");

function createSession(req, res, game) {
  var gameSession = new GameSession({
    gameName: game.name,
    sessionName: req.body.sessionName,
    password: req.body.password,
    roundNumber: 0,
    characters: game.characters
  });
  GameSession.findOneAndUpdate({
      'gameName': game.name,
      'sessionName': req.body.sessionName
    }, { '$setOnInsert': gameSession }, { 'upsert': true },
    function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send('session successfully added');
      }
    });
}

router.post('/master/session/create', (req, res) => {
  Game.find({ 'name': req.body.gameName }, { '_id': 0, '__v': 0 },
    function(err, docs) {
      if (err) { res.send(err); } else {
        if (docs.length === 0) { res.send('no game name found'); }
        var game = docs[0];
        createSession(req, res, game);
      }
    });
});
router.post('/master/session/read', (req, res) => {
  GameSession.find({
    'gameName': req.body.gameName
  }, { '_id': 0, '__v': 0 }, function(err, docs) {
    if (err) {
      res.send(err);
    } else {
      res.send(docs);
    }
  });
});

router.use('/user/*', (req, res, next) => {
  if (req.session.passport === undefined) {
    return res.send('unqualified request');
  }
  next();
});

function isOpen(session) {
  return !session.characters.every((character) => {
    return character.username !== undefined;
  });
}

function isInSession(session, username) {
  return session.characters.some((character) => {
    return character.username === username;
  });
}
router.post('/user/session/names/read/', (req, res) => {
  GameSession.find({}, {}, function(err, docs) {
    if (err) {
      res.send(err);
    } else {
      var docs_res = docs.map((session) => {
        return {
          gameName: session.gameName,
          sessionName: session.sessionName,
          isOpen: isOpen(session),
          isInSession: isInSession(session, req.session.passport.user)
        };
      });
      res.send(docs_res);
    }
  });
});

router.post('/user/game/personality/add', (req, res) => {
  Game.update({
    'name': req.body.gameName,
    'personalities.type': req.body.type
  }, {
    '$push': {
      'personalities.$.items': {
        'name': req.body.name
      }
    }
  }, function(err, raw) {
    if (err) {
      res.send(err);
    } else {
      res.send('personality added');
    }
  });
});

function joinSession(session, req, res) {
  if (session.password !== req.body.password) {
    return res.send({ message: 'wrong session password' });
  }
  var character = session.characters.find((character) => {
    return (character.name === req.body.character);
  });
  if (character === undefined) {
    return res.send({ message: "character doesn't exist" });
  }
  console.log(character);
  if (character.username !== undefined) {
    return res.send({ message: 'character already taken' });
  }
  GameSession.update({
    'gameName': req.body.gameName,
    'sessionName': req.body.sessionName,
    'characters.name': req.body.character
  }, {
    '$set': {
      'characters.$.username': req.session.passport.user
    }
  }, function(err, raw) {
    if (err) { return res.send(err); }
    if (raw) {
      console.log(raw);
      return res.send('success');
    }
  });
}
router.post('/user/session/join', (req, res) => {
  var gameName = req.body.gameName;
  var sessionName = req.body.sessionName;
  GameSession.find({
    'gameName': req.body.gameName,
    'sessionName': req.body.sessionName
  }, {}, function(err, docs) {
    if (err) { return res.send(err); }
    if (docs.length === 0) {
      res.send({ message: "session not found" });
    } else {
      joinSession(docs[0], req, res);
    }
  });
});
router.post('/user/set/session', (req, res) => {
  console.log(req.session);
  console.log(req.body);
  req.session.gameSession = req.body;
  res.send('success');
});
router.post('/user/get/session', (req, res) => {
  console.log(req.session);
  res.send(req.session.gameSession);
});
router.post('/user/get/personality/options', (req, res) => {
  Game.find({
    name: req.session.gameSession.gameName
  }, { personalities: 1 }, function(err, res) {
    if (err) { res.send(err); }
    console.log(res);
  });
});


module.exports = router;