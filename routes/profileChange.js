const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.get('/', (req, res) => {
  if (req.session.Authenticated) {
    res.render('profileChange', { Authenticated: true, login: req.session.user.login, email: req.session.user.email });
  } else {
    res.redirect('/');
  }
});

router.put('/', async (req, res) => {
  const { emailChange, usernameChange } = req.body;
  const userMailCheck = await User.findOne({ where: { email: emailChange }, raw: true });
  const userLoginCheck = await User.findOne({ where: { login: usernameChange }, raw: true });
  if (emailChange === '' || usernameChange === '') {
    return res.json({ message: false, reason: 'Брат, тормози, пустой нельзя' });
  }
  if (userMailCheck || userLoginCheck) {
    return res.json({ message: false, reason: 'Брат, такой логин или мэйл уже имеется' });
  }
  const changedUser = await User.update({ login: usernameChange, email: emailChange },
    { where: { id: req.session.user.id } });
  console.log(changedUser);
  req.session.user.login = usernameChange;
  req.session.user.email = emailChange;
  return res.json({ message: true });
});

module.exports = router;
