// loginRoutes.js

const router = require('express').Router();
const { User } = require('../models');

// Route to render the login page
router.get('/', (req, res) => {
  res.render('login');
});

// Route to handle login form submission
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Implement login logic here
    // Example: Check if the user with the given email and password exists

    // If login is successful, you might redirect to the dashboard
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
