const router = require('express').Router();

router.get('/', (req, res) => {
  if (req.session.Authenticated) {
    res.render('chat', { user: req.session.user.login, Authenticated: true });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
