const router = require('express').Router();
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchJwtSecret = require('../config/jwt-secret');
const COOKIE_NAME = require('../config/cookie-name');
const da = require('../data-access');

async function generateToken(email, master) {
  const jwtSecret = await fetchJwtSecret();
  return jwt.sign({
    sub: email, master,
  }, jwtSecret, { expiresIn: '1d' });
}

function setTokenCookie(req, res, token, maxAge = (80000 * 1000)) {
  res.cookie(COOKIE_NAME, token, {
    secure: false,
    httpOnly: true,
    maxAge,
    domain: req.hostname,
    sameSite: false,
  });
}

router.post('/api/signup', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Please send email and password.' });
  }
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'The email address is badly formatted.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password cannot be shorter than 6 characters.' });
  }
  if (password.length > 18) {
    return res.status(400).json({ message: 'Password cannot be longer than 18 characters.' });
  }
  const hasUser = await da.hasUser(email);
  if (hasUser) {
    return res.status(400).json({ message: 'The email address is already taken.' });
  }
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(12));
  const username = req.body.username;
  await da.createUser(email, hashedPassword, username);
  const token = await generateToken(email, false);
  setTokenCookie(req, res, token);
  return res.json({ message: 'Signup success.' });
});

router.post('/api/login', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Please send email and password.' });
  }
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'The email address is badly formatted.' });
  }
  let user;
  try {
    user = await da.getUser(email);
  } catch (err) {
    return res.status(400).json({ message: 'The email does not exist.' });
  }
  if (!bcrypt.compareSync(password, user.hashedPassword)) {
    return res.status(400).json({ message: 'Invalid password.' });
  }
  const token = await generateToken(email, Boolean(user.master));
  setTokenCookie(req, res, token);
  return res.json({ message: 'Login success.' });
});

async function validateLogin(req, res, next) {
  const jwtSecret = await fetchJwtSecret();
  let decoded;
  try {
    decoded = jwt.verify(req.cookies[COOKIE_NAME], jwtSecret);
  } catch (err) {
    return res.status(401).json({ message: 'Not logged in.' });
  }
  const email = decoded.sub;
  const master = decoded.master;
  req.user = { email, master };
  return next();
}

async function validateMaster(req, res, next) {
  const jwtSecret = await fetchJwtSecret();
  let decoded;
  try {
    decoded = jwt.verify(req.cookies[COOKIE_NAME], jwtSecret);
  } catch (err) {
    return res.status(401).json({ message: 'Not logged in.' });
  }
  const email = decoded.sub;
  const master = decoded.master;
  if (!master) {
    return res.status(401).json({ message: 'Not authorized as master.' });
  }
  req.user = { email, master };
  return next();
}

router.post('/api/is-logged-in', async (req, res) => {
  const jwtSecret = await fetchJwtSecret();
  try {
    jwt.verify(req.cookies[COOKIE_NAME], jwtSecret);
    return res.json({ result: true });
  } catch (err) {
    return res.json({ result: false });
  }
});

router.post('/api/logout',
  validateLogin,
  (req, res) => {
    setTokenCookie(req, res, req.cookies[COOKIE_NAME], -1);
    res.json({ message: 'Logout success' });
  });

module.exports = { router, validateLogin, validateMaster };
