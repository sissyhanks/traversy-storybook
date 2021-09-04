const express = require('express');
const { serializeUser } = require('passport');
const router = express.Router();

//login / landing page >> pass in the layout object so that route knows to use that layout
//Get /
router.get('/', (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

//dashboard page
//GET /dashboard
router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

module.exports = router;