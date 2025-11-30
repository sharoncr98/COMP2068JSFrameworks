const express = require('express');
const router = express.Router();
//API endpoints for workouts, meals and moods
router.get('/workouts', (req, res) => {
  res.json({ 
    success: true, 
    data: [] 
  });
});
router.get('/meals', (req, res) => {
  res.json({ 
    success: true, 
    data: [] 
  });
});
router.get('/mood', (req, res) => {
  res.json({ 
    success: true, 
    data: [] 
  });
});
router.get('/stats', (req, res) => {
  res.json({ 
    success: true, 
    data: {
      totalWorkouts: 0,
      totalMeals: 0,
      moodEntries: 0
    }
  });
});

module.exports = router;