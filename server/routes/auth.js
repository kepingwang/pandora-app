const express = require('express');
/* const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Account = require('../../models/account');*/

const router = express.Router();

/* passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

router.use(passport.initialize());
router.use(passport.session());*/

module.exports = router;
