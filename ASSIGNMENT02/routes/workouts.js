const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
router.use(ensureAuthenticated);
//workouts list
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id })
      .sort({ date: -1 });
    res.render('workouts/index', { 
      title: 'Workouts',
      workouts: workouts
    });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error loading workouts.');
    res.redirect('/');
  }
});
//form
router.get('/add', (req, res) => {
  res.render('workouts/add', { title: 'Add Workout' });
});
//create
router.post('/add', async (req, res) => {
  try {
    const { type, duration, calories, date, notes } = req.body;
    await Workout.create({
      user: req.user._id,
      type,
      duration,
      calories: calories || 0,
      date: date || new Date(),
      notes
    });
    req.flash('success', 'Workout added successfully!');
    res.redirect('/workouts');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error adding workout.');
    res.redirect('/workouts/add');
  }
});
//edit
router.get('/edit/:id', async (req, res) => {
  try {
    const workout = await Workout.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    });
    if (!workout) {
      req.flash('error', 'Workout not found.');
      return res.redirect('/workouts');
    }
    res.render('workouts/edit', { 
      title: 'Edit Workout',
      workout: workout
    });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error loading workout.');
    res.redirect('/workouts');
  }
});
//update
router.post('/edit/:id', async (req, res) => {
  try {
    const { type, duration, calories, date, notes } = req.body;
    
    await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { type, duration, calories, date, notes }
    );  
    req.flash('success', 'Workout updated successfully!');
    res.redirect('/workouts');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error updating workout.');
    res.redirect('/workouts');
  }
});
//delete
router.post('/delete/:id', async (req, res) => {
  try {
    await Workout.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user._id 
    });
    
    req.flash('success', 'Workout deleted successfully!');
    res.redirect('/workouts');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error deleting workout.');
    res.redirect('/workouts');
  }
});

module.exports = router;