const express = require('express');
const passport = require('passport');
const { serializeUser } = require('passport');
const router = express.Router();

//auth with google
//Get /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));


//google auth callback
//GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/'}), (req, res) => {
  res.redirect('/dashboard');
});

//user logout
//GET /auth/logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
module.exports = router;