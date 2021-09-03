const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

router.get('/', (req, res) => {
  res.render('reg');
});

router.post('/', async (req, res) => {
  const { emailReg, usernameReg, passwordReg } = req.body;
  const user = await User.findOne({
    raw: true,
    where: {
      email: emailReg,
    },
  });
  const userLoginCheck = await User.findOne({
    raw: true,
    where: {
      login: usernameReg,
    },
  });
  if (emailReg === '' || usernameReg === '') {
    return res.json({ message: false, reason: 'Брат, тормози, пустой нельзя' });
  }
  if (passwordReg.length < 8) {
    return res.json({ message: false, reason: 'А че пароль то такой короткий?!' });
  }
  if (user || userLoginCheck) {
    return res.json({ message: false, reason: 'Че с фантазией?! Повторяешься...' });
  }
  const hash = await bcrypt.hash(passwordReg, 10);
  const newUser = await User.create({
    login: usernameReg,
    email: emailReg,
    password: hash,
  });
  req.session.Authenticated = true;
  req.session.user = newUser;
  return res.json({ message: true });
});

module.exports = router;
