/* eslint no-console: 0 */
const path = require('path');
const express = require('express');
const http = require('http');

const preprocessors = require('./routes/preprocess');
const authRoutes = require('./routes/auth').router;
const mainRoutes = require('./routes/main');
const gameRoutes = require('./routes/game');
const masterRoutes = require('./routes/master');
const errorHanlders = require('./routes/error-handlers');
const io = require('./socket/io');

const app = express();
const PORT = process.env.PORT || 80;
const HOST = '0.0.0.0';
const server = http.createServer(app);

app.use(preprocessors);
app.use(authRoutes);
app.use(mainRoutes);
app.use(gameRoutes);
app.use(masterRoutes);
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.status(404).json({ message: 'Page not found.' });
});
app.post('*', (req, res) => {
  res.status(404).json({ message: 'API not found.' });
});
app.use(errorHanlders);

io.attach(server);

server.listen(PORT, HOST);
console.log(`server listens at ${HOST}:${PORT}`);
