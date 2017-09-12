const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const session = require('express-session');
const passport = require('passport');

const configurePassport = require('./config/passport');
const preprocessors = require('./routes/preprocess');
const setAuthRoutes = require('./routes/set-auth-routes');
const errorHanlders = require('./routes/error-handlers');
const apis = require('./routes/apis');

const app = express();
const PORT = process.env.PORT || 80;
const HOST = '0.0.0.0';

app.use(preprocessors);
configurePassport(passport);
app.use(session({ secret: 'iamkepingwanghello' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../client/build')));
setAuthRoutes(app, passport);
app.use(apis);
app.get('*', (req, res, next) => {
  const err = new Error('Page Not Found. Sorry :(');
  err.status = 404;
  next(err);
});
app.use(errorHanlders);

const server = http.createServer(app);
const io = socketIO(server);
io.on('connection', (client) => {
  console.log(`socket io connection established ${client}`);
});
server.listen(PORT, HOST);
console.log(`server listens at ${HOST}:${PORT}`);
