const express = require('express');
const { serializeUser } = require('passport');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//login / landing page >> pass in the layout object so that route knows to use that layout
//Get /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

//dashboard page
//GET /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
  res.render('dashboard', {
    //pass in username from google login to display in the dashboard (views> dashboard)
    name: req.user.firstName,
  });
});

module.exports = router;