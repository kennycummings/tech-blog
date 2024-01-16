const router = require('express').Router();
const { Post, Comment } = require('../../models');

// Route to get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        // Include associated comments
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
          include: {
            // Include the user who made the comment
            model: User,
            attributes: ['username'],
          },
        },
        // Include the user who created the post
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve posts.' });
  }
});

// Route to get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        // Include associated comments
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
          include: {
            // Include the user who made the comment
            model: User,
            attributes: ['username'],
          },
        },
        // Include the user who created the post
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!post) {
      res.status(404).json({ error: 'Post not found.' });
      return;
    }

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve the post.' });
  }
});

// Route to create a new post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id, // Assuming you have a user ID from the authenticated user
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create a new post.' });
  }
});

// Route to update a post by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (updatedPost[0] === 0) {
      res.status(404).json({ error: 'Post not found.' });
      return;
    }

    res.status(200).json({ message: 'Post updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update the post.' });
  }
});

// Route to delete a post by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedPost === 0) {
      res.status(404).json({ error: 'Post not found.' });
      return;
    }

    res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete the post.' });
  }
});

module.exports = router;
