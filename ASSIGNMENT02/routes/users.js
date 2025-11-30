const express = require('express');
const router = express.Router();
router.get('/profile', (req, res) => {
  if (!req.user) {
    return res.redirect('/auth/login');
  }
  res.render('users/profile', { 
    title: 'My Profile',
    user: req.user 
  });
});
router.get('/profile/edit', (req, res) => {
  if (!req.user) {
    return res.redirect('/auth/login');
  }
  res.render('users/edit', { 
    title: 'Edit Profile',
    user: req.user 
  });
});
router.post('/profile/edit', (req, res) => {
  console.log(req.body);
  req.flash('success', 'Profile updated successfully!');
  res.redirect('/users/profile');
});

module.exports = router;