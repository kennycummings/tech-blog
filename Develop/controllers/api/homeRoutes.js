const router = require('express').Router();
// controllers/api/homeRoutes.js
const { Post, User, Comment } = require('../../models');

// Route to render the homepage with a list of posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['name'] }],
      order: [['date_created', 'DESC']],
    });

    const formattedPosts = posts.map(post => {
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        author: post.User.name,
        date_created: post.date_created,
      };
    });

    res.render('homepage', { posts: formattedPosts, loggedIn: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});

// Route to render a single post
router.get('/post/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId, {
      include: [
        { model: User, attributes: ['name'] },
        { model: Comment, include: [{ model: User, attributes: ['name'] }] },
      ],
    });

    if (!post) {
      return res.status(404).render('404');
    }

    const formattedPost = {
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.User.name,
      date_created: post.date_created,
      comments: post.Comments.map(comment => ({
        id: comment.id,
        text: comment.text,
        commenter: comment.User.name,
        date_created: comment.date_created,
      })),
    };

    res.render('single-post', { post: formattedPost, loggedIn: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve the post' });
  }
});

module.exports = router;
