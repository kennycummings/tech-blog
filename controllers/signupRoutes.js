const router = require('express').Router();
const { User } = require('../models');

// Route to render the signup page
router.get('/', (req, res) => {
  res.render('signup');
});

// Route to handle signup form submission
router.post('/', async (req, res) => {
  try {
    // Extract user input from the request body
    const { name, email, password } = req.body;

    // Implement signup logic here
    // Example: Create a new user, hash password, etc.
    const newUser = await User.create({
      name,
      email,
      password, // Remember to hash the password before saving it to the database
    });

    // Redirect to the dashboard after successful signup
    res.render('dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add more routes as needed

module.exports = router;
