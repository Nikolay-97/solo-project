const router = require('express').Router();
const { Post } = require('../db/models');

router.get('/', async (req, res) => {
  if (req.session.Authenticated) {
    const allPosts = await Post.findAll({ raw: true });
    res.render('posts', { Authenticated: true, allPosts, user: req.session.user.login });
  } else {
    res.redirect('/');
  }
});

router.get('/:id/edit', async (req, res) => {
  if (req.session.Authenticated) {
    const onePost = await Post.findOne({ where: { id: req.params.id }, raw: true });
    res.render('postedit', { Authenticated: true, onePost, user: req.session.user.login });
  } else {
    res.redirect('/');
  }
});

router.put('/:id/edit', async (req, res) => {
  const { title, description } = req.body;
  if (title === '' || description === '') {
    return res.json({ message: false, reason: 'Брат, тормози, пустой нельзя' });
  }
  await Post.update({ title, description },
    { where: { id: req.params.id } });
  return res.json({ message: true });
});

module.exports = router;
