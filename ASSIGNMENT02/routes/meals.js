const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
router.use(ensureAuthenticated);
//List all meals
router.get('/', (req, res) => {
  res.render('meals/index', { title: 'Meals' });
});
router.get('/add', (req, res) => {
  res.render('meals/add', { title: 'Add Meal' });
});
router.post('/add', (req, res) => {
  console.log(req.body);
  req.flash('success', 'Meal added successfully!');
  res.redirect('/meals');
});
router.get('/edit/:id', (req, res) => {
  res.render('meals/edit', { 
    title: 'Edit Meal',
    meal: {}
  });
});
router.post('/edit/:id', (req, res) => {
  console.log(req.body);
  req.flash('success', 'Meal updated successfully!');
  res.redirect('/meals');
});
router.post('/delete/:id', (req, res) => {
  req.flash('success', 'Meal deleted successfully!');
  res.redirect('/meals');
});

module.exports = router;