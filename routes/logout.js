const router = require('express').Router();

router.get('/', (req, res) => {
  req.session.destroy();
  res.clearCookie();
  res.redirect('/');
});

module.exports = router;
