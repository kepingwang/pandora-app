const path = require('path');
const express = require('express');
const preprocessors = require('./routes/preprocess');
const database = require('./routes/database');
const errorHanlders = require('./routes/error-handlers');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(preprocessors);
app.use(database);
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res, next) => {
  const err = new Error('Page Not Found. Sorry :(');
  err.status = 404;
  next(err);
});
app.use(errorHanlders);

app.listen(PORT, HOST);
console.log(`server listens at ${HOST}:${PORT}`);

/*
// =======================
// routes ================
// =======================
// basic route
app.get('/', function(req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.get('/api/hello', (req, res) => {
  res.send('helo helo');
});

app.get('/setup', function(req, res) {
  var nick = new User({
    name: 'Nick',
    password: 'password',
    admin: true
  });

  nick.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({
      success: true
    });
  });
});

// get an instance of the router for api routes
var apiRoutes = express.Router();

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {

  console.log(req.body);
  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 24 * 60 * 60 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
});

// Verification Middleware
apiRoutes.use(function(req, res, next) {
  // TODO: different headers?
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded
        next();
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function(req, res) {
  res.json({
    message: 'Welcome to the coolest API on earth!'
  });
});

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});


app.use('/api', apiRoutes);

settings = {
  port: "3002",
  hostname: 'localhost'
}

const server = require('./connection/server.js').create(settings, app);
console.log('Magic happens on ' + settings.hostname + ':' + settings.port);
module.exports = server; */
