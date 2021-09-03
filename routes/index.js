const router = require('express').Router();

router.get('/', (req, res) => {
  if (req.session.Authenticated) {
    res.render('index', { Authenticated: true });
  } else {
    res.render('index', { Authenticated: false });
  }
});

module.exports = router;
