const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

module.exports = router;

router.get('/google',passport.authenticate('google',{
	scope:['profile','email']
}));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });
