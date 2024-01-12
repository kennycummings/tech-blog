const router = require('express').Router();
const { User, Post, Comment } = require('../models'); // Import your models

// Dashboard route
router.get('/', async (req, res) => {
  try {
    // Fetch data from the database (example: fetching posts)
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['text', 'date_created'],
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
      ],
      order: [['date_created', 'DESC']],
    });

    // Render your dashboard view with the fetched data
    res.render('dashboard', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Other routes for the dashboard if needed

module.exports = router;
