const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

module.exports = router;

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),(req, res) => {
    res.redirect('/dashboard');
  });

router.get('/verify',(req , res)=>{
	if(req.user){
		console.log(req.user);
	}else{
		console.log('Not Auth');
	}
});

router.get('/logout',(req , res)=>{
	req.logout();
	res.redirect('/');
});
