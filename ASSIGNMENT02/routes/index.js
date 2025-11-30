const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const { getWeather } = require('../public/javascripts/weather');
const Workout = require('../models/Workout');
const Meal = require('../models/Meal');
const Mood = require('../models/Mood');
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

//dashboard (charts) will be in the homepage
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    //get dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setDate(monthAgo.getDate() - 30);
    //grab data
    const [workouts, meals, moods, weather] = await Promise.all([
      Workout.find({ user: userId, date: { $gte: monthAgo } }).sort({ date: -1 }),
      Meal.find({ user: userId, date: { $gte: monthAgo } }).sort({ date: -1 }),
      Mood.find({ user: userId, date: { $gte: monthAgo } }).sort({ date: -1 }),
      getWeather(process.env.WEATHER_CITY || 'Barrie', process.env.WEATHER_COUNTRY || 'CA')
    ]);
    //calculations
    const stats = {
      totalWorkouts: workouts.length,
      totalMeals: meals.length,
      totalMoods: moods.length,
      totalCaloriesBurned: workouts.reduce((sum, w) => sum + (w.calories || 0), 0),
      totalCaloriesConsumed: meals.reduce((sum, m) => sum + (m.calories || 0), 0),
      avgWorkoutDuration: workouts.length > 0 
        ? Math.round(workouts.reduce((sum, w) => sum + w.duration, 0) / workouts.length) 
        : 0,
      thisWeekWorkouts: workouts.filter(w => w.date >= weekAgo).length,
      thisWeekMeals: meals.filter(m => m.date >= weekAgo).length,
      thisWeekMoods: moods.filter(m => m.date >= weekAgo).length
    };
    const chartData = {
      workouts: prepareWorkoutChartData(workouts),
      meals: prepareMealChartData(meals),
      moods: prepareMoodChartData(moods)
    };
    res.render('dashboard', {
      title: 'Dashboard',
      stats,
      weather,
      chartData: JSON.stringify(chartData),
      recentWorkouts: workouts.slice(0, 5),
      recentMeals: meals.slice(0, 5),
      recentMoods: moods.slice(0, 5)
    });
  } catch (error) {
    console.error('Error loading dashboard:', error);
    req.flash('error', 'Error loading dashboard.');
    res.redirect('/');
  }
});
function prepareWorkoutChartData(workouts) {
  const last7Days = getLast7Days();
  const workoutsByDay = {};
  last7Days.forEach(day => {
    workoutsByDay[day] = 0;
  });
  workouts.forEach(workout => {
    const day = workout.date.toISOString().split('T')[0];
    if (workoutsByDay.hasOwnProperty(day)) {
      workoutsByDay[day] += workout.duration;
    }
  });
  return {
    labels: last7Days,
    data: last7Days.map(day => workoutsByDay[day])
  };
}
function prepareMealChartData(meals) {
  const last7Days = getLast7Days();
  const caloriesByDay = {};
  last7Days.forEach(day => {
    caloriesByDay[day] = 0;
  });
  meals.forEach(meal => {
    const day = meal.date.toISOString().split('T')[0];
    if (caloriesByDay.hasOwnProperty(day)) {
      caloriesByDay[day] += meal.calories;
    }
  });
  return {
    labels: last7Days,
    data: last7Days.map(day => caloriesByDay[day])
  };
}
function prepareMoodChartData(moods) {
  const moodCounts = {};
  moods.forEach(mood => {
    moodCounts[mood.mood] = (moodCounts[mood.mood] || 0) + 1;
  });
  return {
    labels: Object.keys(moodCounts),
    data: Object.values(moodCounts)
  };
}
function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days;
}

module.exports = router;