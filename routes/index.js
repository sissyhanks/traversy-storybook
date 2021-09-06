const express = require('express');
const { serializeUser } = require('passport');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Story = require ('../models/Story');

//login / landing page >> pass in the layout object so that route knows to use that layout
//Get /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

//dashboard page
//GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    //get stories from used that is logged in with current id
    const stories = await Story.find({ user: req.user.id }).lean()
    res.render('dashboard', {
    //pass in username from google login to display in the dashboard (views> dashboard)
    name: req.user.firstName,
    stories
  });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }

});

module.exports = router;