const router = require('express').Router();

router.get('/', (req, res) => {
  if (req.session.Authenticated) {
    res.render('profile', { Authenticated: true, login: req.session.user.login, email: req.session.user.email });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
