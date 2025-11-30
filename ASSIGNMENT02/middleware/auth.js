function ensureAuthenticated(req, res, next) {
  console.log('Checking authentication...');
  console.log('req.isAuthenticated():', req.isAuthenticated());
  console.log('req.user:', req.user);
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Please login to access this page.');
  res.redirect('/auth/login');
}
//check if user is authenticated
function ensureGuest(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}
module.exports = {
  ensureAuthenticated,
  ensureGuest
};