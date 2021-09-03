const router = require('express').Router();
const { Post } = require('../models');

router.get('/', (req, res) => {
  if (req.session.Authenticated) {
    res.render('createpost', { Authenticated: true, login: req.session.user.login, email: req.session.user.email });
  } else {
    res.redirect('/');
  }
});

router.post('/', async (req, res) => {
  if (req.session.Authenticated) {
    const { title, description } = req.body;
    if (title === '' || description === '') {
      return res.json({ message: false, reason: 'Брат, тормози, пустой нельзя' });
    }
    const newPost = await Post.create({
      UserId: req.session.user.id,
      title,
      description,
    });
    return res.json({ message: true });
  }
});

module.exports = router;
