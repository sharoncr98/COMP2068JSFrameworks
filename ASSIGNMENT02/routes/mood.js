const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
router.use(ensureAuthenticated);
//List mood entries
router.get('/', (req, res) => {
  res.render('mood/index', { title: 'Mood Tracker' });
});
router.get('/add', (req, res) => {
  res.render('mood/add', { title: 'Log Mood' });
});
router.post('/add', (req, res) => {
  console.log(req.body);
  req.flash('success', 'Mood logged successfully!');
  res.redirect('/mood');
});
router.get('/edit/:id', (req, res) => {
  res.render('mood/edit', { 
    title: 'Edit Mood Entry',
    mood: {}
  });
});
router.post('/edit/:id', (req, res) => {
  console.log(req.body);
  req.flash('success', 'Mood entry updated successfully!');
  res.redirect('/mood');
});
router.post('/delete/:id', (req, res) => {
  req.flash('success', 'Mood entry deleted successfully!');
  res.redirect('/mood');
});

module.exports = router;