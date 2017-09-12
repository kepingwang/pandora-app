
function isLoggedIn(req, res, next) {
  if (process.env.NODE_ENV === 'dev') {
    return next();
  }
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'not authenticated' });
  }
  return next();
}

function isAdmin(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'not authenticated' });
  }
  if (!req.user.admin) {
    return res.status(401).json({ message: 'not master account' });
  }
  return next();
}

module.exports = {
  isLoggedIn, isAdmin,
};
