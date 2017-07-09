var router = require('express').Router();
var passport = require('passport');
var passportLocalMongoose = require('passport-local-mongoose');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('../../models/account');
var mongoose = require('mongoose');

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

router.use(passport.initialize());
router.use(passport.session());

module.exports = router;