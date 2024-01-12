const router = require('express').Router();
const { Post, Comment, User } = require('../models');

// Routes for the dashboard

// Route to render the dashboard
router.get('/', async (req, res) => {
  try {
    // Fetch data from the database as needed
    const posts = await Post.findAll({ include: [User, Comment] });

    // Render the dashboard template with the fetched data
    res.render('dashboard', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add more routes as needed

module.exports = router;
