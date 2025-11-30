const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const { ensureAuthenticated } = require('../middleware/auth');
router.use(ensureAuthenticated);
//workouts list
router.get('/', async (req, res) => {
  try {
    console.log('User in workouts route:', req.user);
    if (!req.user) {
      req.flash('error', 'User session not found. Please login again.');
      return res.redirect('/auth/login');
    }
    const userId = req.user._id || req.user.id;
    console.log('Using user ID:', userId);
    const workouts = await Workout.find({ user: userId })
      .sort({ date: -1 });
    console.log('Found workouts:', workouts.length);
    
    res.render('workouts/index', { 
      title: 'Workouts',
      workouts: workouts
    });
  } catch (error) {
    console.error('Error loading workouts:', error);
    req.flash('error', 'Error loading workouts: ' + error.message);
    res.redirect('/');
  }
});
//add
router.get('/add', (req, res) => {
  res.render('workouts/add', { title: 'Add Workout' });
});

//create
router.post('/add', async (req, res) => {
  try {
    console.log('Adding workout for user:', req.user);
    if (!req.user) {
      req.flash('error', 'User session not found. Please login again.');
      return res.redirect('/auth/login');
    }
    const userId = req.user._id || req.user.id;
    const { type, duration, calories, date, notes } = req.body;
    console.log('Creating workout with data:', { userId, type, duration, calories, date, notes });
    const workout = await Workout.create({
      user: userId,
      type,
      duration,
      calories: calories || 0,
      date: date || new Date(),
      notes
    });
    //added debugging logs
    console.log('Workout created:', workout);
    req.flash('success', 'Workout added successfully!');
    res.redirect('/workouts');
  } catch (error) {
    console.error('Error adding workout:', error);
    req.flash('error', 'Error adding workout: ' + error.message);
    res.redirect('/workouts/add');
  }
});
//edit
router.get('/edit/:id', async (req, res) => {
  try {
    if (!req.user) {
      req.flash('error', 'User session not found. Please login again.');
      return res.redirect('/auth/login');
    }
    const userId = req.user._id || req.user.id;
    const workout = await Workout.findOne({ 
      _id: req.params.id, 
      user: userId 
    });
    if (!workout) {
      req.flash('error', 'Workout not found.');
      return res.redirect('/workouts');
    }
    //formatting date field
    const formattedDate = workout.date.toISOString().split('T')[0];
    res.render('workouts/edit', { 
      title: 'Edit Workout',
      workout: {
        ...workout.toObject(),
        date: formattedDate
      }
    });
  } catch (error) {
    console.error('Error loading workout:', error);
    req.flash('error', 'Error loading workout: ' + error.message);
    res.redirect('/workouts');
  }
});
//update
router.post('/edit/:id', async (req, res) => {
  try {
    if (!req.user) {
      req.flash('error', 'User session not found. Please login again.');
      return res.redirect('/auth/login');
    }
    const userId = req.user._id || req.user.id;
    const { type, duration, calories, date, notes } = req.body;
    await Workout.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      { type, duration, calories, date, notes }
    );
    req.flash('success', 'Workout updated successfully!');
    res.redirect('/workouts');
  } catch (error) {
    console.error('Error updating workout:', error);
    req.flash('error', 'Error updating workout: ' + error.message);
    res.redirect('/workouts');
  }
});
//delete
router.post('/delete/:id', async (req, res) => {
  try {
    if (!req.user) {
      req.flash('error', 'User session not found. Please login again.');
      return res.redirect('/auth/login');
    }
    const userId = req.user._id || req.user.id;
    await Workout.findOneAndDelete({ 
      _id: req.params.id, 
      user: userId 
    });
    req.flash('success', 'Workout deleted successfully!');
    res.redirect('/workouts');
  } catch (error) {
    console.error('Error deleting workout:', error);
    req.flash('error', 'Error deleting workout: ' + error.message);
    res.redirect('/workouts');
  }
});

module.exports = router;