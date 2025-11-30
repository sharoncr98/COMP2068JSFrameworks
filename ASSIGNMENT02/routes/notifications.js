const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
router.use(ensureAuthenticated);
// List notifications
router.get('/', (req, res) => {
  res.render('notifications/index', { title: 'Notifications' });
});
router.post('/read/:id', (req, res) => {
  res.redirect('/notifications');
});
router.post('/delete/:id', (req, res) => {
  req.flash('success', 'Notification deleted successfully!');
  res.redirect('/notifications');
});
router.post('/clear', (req, res) => {
  req.flash('success', 'All notifications cleared!');
  res.redirect('/notifications');
});

module.exports = router;