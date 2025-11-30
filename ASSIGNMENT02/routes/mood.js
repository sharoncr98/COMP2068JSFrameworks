const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
router.use(ensureAuthenticated);
//mood list
router.get('/', async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user._id })
      .sort({ date: -1 });
    res.render('mood/index', { 
      title: 'Mood Tracker',
      moods: moods
    });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error loading mood entries.');
    res.redirect('/');
  }
});
//form
router.get('/add', (req, res) => {
  res.render('mood/add', { title: 'Log Mood' });
});
//create
router.post('/add', async (req, res) => {
  try {
    const { mood, intensity, notes, date } = req.body;
    await Mood.create({
      user: req.user._id,
      mood,
      intensity: intensity || 5,
      notes,
      date: date || new Date()
    });
    req.flash('success', 'Mood logged successfully!');
    res.redirect('/mood');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error logging mood.');
    res.redirect('/mood/add');
  }
});
//edit
router.get('/edit/:id', async (req, res) => {
  try {
    const mood = await Mood.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    });
    if (!mood) {
      req.flash('error', 'Mood entry not found.');
      return res.redirect('/mood');
    }
    res.render('mood/edit', { 
      title: 'Edit Mood Entry',
      mood: mood
    });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error loading mood entry.');
    res.redirect('/mood');
  }
});
//update
router.post('/edit/:id', async (req, res) => {
  try {
    const { mood, intensity, notes, date } = req.body;
    await Mood.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { mood, intensity, notes, date }
    );
    req.flash('success', 'Mood entry updated successfully!');
    res.redirect('/mood');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error updating mood entry.');
    res.redirect('/mood');
  }
});
//delete
router.post('/delete/:id', async (req, res) => {
  try {
    await Mood.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user._id 
    });
    req.flash('success', 'Mood entry deleted successfully!');
    res.redirect('/mood');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error deleting mood entry.');
    res.redirect('/mood');
  }
});

module.exports = router;