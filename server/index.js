/* eslint no-console: 0 */
const path = require('path');
const express = require('express');
const http = require('http');

const AWS = require('aws-sdk');

if (process.env.NODE_ENV === 'dev') { // setting AWS_PROFILE env variable doesn't work
  const credentials = new AWS.SharedIniFileCredentials({ profile: 'pandora' });
  AWS.config.credentials = credentials;
}

require('./config/logging');
const httpsRedirector = require('./routes/https-redirector');
const preprocessors = require('./routes/preprocess');
const authRoutes = require('./routes/auth').router;
const mainRoutes = require('./routes/main');
const gameRoutes = require('./routes/game');
const masterRoutes = require('./routes/master');
const errorHandlers = require('./routes/error-handlers');
const io = require('./socket/io');

const app = express();
const PORT = process.env.PORT || 80;
const HOST = '0.0.0.0';
const server = http.createServer(app);

app.use(httpsRedirector);
app.use(preprocessors);
app.use(authRoutes);
app.use(mainRoutes);
app.use(gameRoutes);
app.use(masterRoutes);
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.post('*', (req, res) => {
  res.status(404).json({ message: 'API not found.' });
});
app.use(errorHandlers);

io.attach(server);

server.listen(PORT, HOST);
console.log(`server listens at ${HOST}:${PORT}`);
