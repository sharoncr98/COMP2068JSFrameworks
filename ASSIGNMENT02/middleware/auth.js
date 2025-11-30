function ensureAuthenticated(req, res, next) {
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