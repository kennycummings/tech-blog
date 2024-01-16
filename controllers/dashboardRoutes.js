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

// Route to handle creating a new post
router.post('/create', async (req, res) => {
  try {
    // Get the post data from the form
    const { postTitle, postContent } = req.body;

const userId = req.session.userId; // Retrieve user_id from session

const newPost = await Post.create({
  title: postTitle,
  content: postContent,
  user_id: userId, // Assign user_id to the post
});

    // Redirect to the dashboard or the newly created post
    res.redirect('/dashboard'); // Change this as needed
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Other routes for the dashboard if needed

module.exports = router;
