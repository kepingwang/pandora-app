
function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'not authenticated' });
  }
  return next();
}

function isMaster(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'not authenticated' });
  }
  if (!req.user.master) {
    return res.status(401).json({ message: 'not master account' });
  }
  return next();
}

module.exports = {
  isLoggedIn, isMaster,
};
