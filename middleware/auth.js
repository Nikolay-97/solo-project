const checkAuth = (req, res, next) => {
  if (req.session.Authenticated) {
    next();
  } else {
    res.redirect('/');
  }
};
module.exports = checkAuth;
