const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
router.use(ensureAuthenticated);
//List all workouts
router.get('/', (req, res) => {
  res.render('workouts/index', { title: 'Workouts' });
});
router.get('/add', (req, res) => {
  res.render('workouts/add', { title: 'Add Workout' });
});
//Create new workout
router.post('/add', (req, res) => {
  console.log(req.body);
  req.flash('success', 'Workout added successfully!');
  res.redirect('/workouts');
});
router.get('/edit/:id', (req, res) => {
  res.render('workouts/edit', { 
    title: 'Edit Workout',
    workout: {}
  });
});
router.post('/edit/:id', (req, res) => {
  console.log(req.body);
  req.flash('success', 'Workout updated successfully!');
  res.redirect('/workouts');
});
router.post('/delete/:id', (req, res) => {
  req.flash('success', 'Workout deleted successfully!');
  res.redirect('/workouts');
});

module.exports = router;