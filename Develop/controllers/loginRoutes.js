// loginRoutes.js

const router = require('express').Router();
const { User } = require('../models');

// Route to render the login page
router.get('/', (req, res) => {
  res.render('login');
});

// Route to handle login form submission
router.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
      console.log(userData)
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
      console.log("line 32")
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
