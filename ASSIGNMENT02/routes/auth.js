const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const { ensureGuest, ensureAuthenticated } = require('../middleware/auth');

//login form
router.get('/login', ensureGuest, (req, res) => {
  res.render('auth/login', { title: 'Login' });
});

//login
router.post('/login', ensureGuest, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true
}));
router.get('/register', ensureGuest, (req, res) => {
  res.render('auth/register', { title: 'Register' });
});
router.post('/register', ensureGuest, async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword) {
      req.flash('error', 'Please fill in all fields.');
      return res.redirect('/auth/register');
    }
    if (password !== confirmPassword) {
      req.flash('error', 'Passwords do not match.');
      return res.redirect('/auth/register');
    }
    if (password.length < 6) {
      req.flash('error', 'Password must be at least 6 characters.');
      return res.redirect('/auth/register');
    }
    const existingUser = await User.findOne({ 
      $or: [{ username: username }, { email: email }] 
    });
    if (existingUser) {
      req.flash('error', 'Username or email already exists.');
      return res.redirect('/auth/register');
    }
    const newUser = await User.create({
      username,
      email,
      password
    });
    req.flash('success', 'Registration successful! Please login.');
    res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
    req.flash('error', 'An error occurred during registration.');
    res.redirect('/auth/register');
  }
});
router.get('/logout', ensureAuthenticated, (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success', 'You have been logged out.');
    res.redirect('/');
  });
});
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/auth/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = router;