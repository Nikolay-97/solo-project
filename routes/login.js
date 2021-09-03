const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const { emailLogin, passwordLogin } = req.body;
  const user = await User.findOne({ where: { login: emailLogin }, raw: true });
  if (user) {
    const match = await bcrypt.compare(passwordLogin, user.password);
    console.log(match);
    if (match && user) {
      req.session.Authenticated = true;
      req.session.user = user;
      return res.json({ message: true });
    }
  }
  return res.json({ message: false, reason: 'Че-то неверно ввел походу' });
});

module.exports = router;
