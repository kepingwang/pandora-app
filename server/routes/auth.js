const router = require('express').Router();
const AWS = require('aws-sdk');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/client');

const COOKIE_NAME = 'pandora-token';
let jwtSecret = null;

const fetchJwtSecret = () =>
  new Promise((resolve, reject) => {
    if (jwtSecret) {
      return resolve(jwtSecret);
    }
    const s3 = new AWS.S3();
    return s3.getObject({
      Bucket: 'secret.kepingwang.com',
      Key: 'pandora-app/pandora-app-jwt-secret.txt',
    }).promise()
      .then((data) => {
        jwtSecret = data.Body.toString('utf-8');
        resolve(jwtSecret);
      })
      .catch(err => reject(err));
  });

/* eslint-disable no-console */
fetchJwtSecret().then().catch(err => console.log(err));
/* eslint-enable */

const generateToken = (email, master) =>
  fetchJwtSecret()
    .then(secret => jwt.sign({
      sub: email,
      master,
    }, secret, { expiresIn: '1d' }));

const setTokenCookie =
  (req, res, token, maxAge = (80000 * 1000)) => {
    res.cookie(COOKIE_NAME, token, {
      secure: false,
      httpOnly: true,
      maxAge,
      domain: req.hostname,
      sameSite: false,
    });
    return res;
  };

router.use('/api/signup',
  (req, res, next) => {
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
    return db.get({
      TableName: 'UserInfo',
      Key: { email },
    }).promise()
      .then((data) => {
        if (data.Item) {
          res.status(400).json({ message: 'The email address is already taken.' });
          return Promise.reject();
        }
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(12));
        const username = req.body.username;
        return db.put({
          TableName: 'UserInfo',
          Item: { email, username, hashedPassword },
        }).promise();
      })
      .then(() => generateToken(email, false))
      .then(token => setTokenCookie(req, res, token))
      .then(() => res.json({ message: 'Signup success.' }))
      .catch((err) => { if (err) next(err); });
  });

router.use('/api/login',
  (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Please send email and password.' });
    }
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'The email address is badly formatted.' });
    }
    return db.get({
      TableName: 'UserInfo',
      Key: { email },
    }).promise()
      .then((data) => {
        if (!data.Item) {
          res.status(400).json({ message: 'The email does not exist.' });
          return Promise.reject();
        }
        if (!bcrypt.compareSync(password, data.Item.hashedPassword)) {
          res.status(400).json({ message: 'Invalid password.' });
          return Promise.reject();
        }
        return generateToken(email, Boolean(data.Item.master));
      })
      .then(token => setTokenCookie(req, res, token))
      .then(() => res.json({ message: 'Login success.' }))
      .catch((err) => { if (err) next(err); });
  });

function validateLogin(req, res, next) {
  fetchJwtSecret()
    .then((secret) => {
      jwt.verify(req.cookies[COOKIE_NAME], secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Not logged in.' });
        }
        const email = decoded.sub;
        const master = decoded.master;
        req.user = { email, master };
        return next();
      });
    })
    .catch((err) => { if (err) next(err); });
}

function validateMaster(req, res, next) {
  fetchJwtSecret()
    .then((secret) => {
      jwt.verify(req.cookies[COOKIE_NAME], secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Not logged in.' });
        }
        const email = decoded.sub;
        const master = decoded.master;
        if (!master) {
          return res.status(401).json({ message: 'Not authorized as master.' });
        }
        req.user = { email, master };
        return next();
      });
    })
    .catch((err) => { if (err) next(err); });
}

router.post('/api/is-logged-in',
  (req, res, next) => {
    fetchJwtSecret()
      .then((secret) => {
        jwt.verify(req.cookies[COOKIE_NAME], secret, (err) => {
          if (err) {
            return res.json({ result: false });
          }
          return res.json({ result: true });
        });
      })
      .catch((err) => { if (err) next(err); });
  });

router.post('/api/logout',
  validateLogin,
  (req, res) => {
    setTokenCookie(req, res, req.cookies[COOKIE_NAME], -1);
    res.json({ message: 'Logout success' });
  });

module.exports = { router, validateLogin, validateMaster };
