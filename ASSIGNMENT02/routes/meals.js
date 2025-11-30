const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
router.use(ensureAuthenticated);
//meal list
router.get('/', async (req, res) => {
  try {
    const meals = await Meal.find({ user: req.user._id })
      .sort({ date: -1 });
    res.render('meals/index', { 
      title: 'Meals',
      meals: meals
    });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error loading meals.');
    res.redirect('/');
  }
});
//form
router.get('/add', (req, res) => {
  res.render('meals/add', { title: 'Add Meal' });
});
//create
router.post('/add', async (req, res) => {
  try {
    const { name, calories, protein, carbs, fats, date, mealType, notes } = req.body;
    await Meal.create({
      user: req.user._id,
      name,
      calories,
      protein: protein || 0,
      carbs: carbs || 0,
      fats: fats || 0,
      date: date || new Date(),
      mealType: mealType || 'lunch',
      notes
    });
    req.flash('success', 'Meal added successfully!');
    res.redirect('/meals');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error adding meal.');
    res.redirect('/meals/add');
  }
});
//edit
router.get('/edit/:id', async (req, res) => {
  try {
    const meal = await Meal.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    });
    
    if (!meal) {
      req.flash('error', 'Meal not found.');
      return res.redirect('/meals');
    }
    res.render('meals/edit', { 
      title: 'Edit Meal',
      meal: meal
    });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error loading meal.');
    res.redirect('/meals');
  }
});
//update
router.post('/edit/:id', async (req, res) => {
  try {
    const { name, calories, protein, carbs, fats, date, mealType, notes } = req.body; 
    await Meal.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name, calories, protein, carbs, fats, date, mealType, notes }
    );  
    req.flash('success', 'Meal updated successfully!');
    res.redirect('/meals');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error updating meal.');
    res.redirect('/meals');
  }
});
//delete
router.post('/delete/:id', async (req, res) => {
  try {
    await Meal.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user._id 
    });
    req.flash('success', 'Meal deleted successfully!');
    res.redirect('/meals');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error deleting meal.');
    res.redirect('/meals');
  }
});

module.exports = router;