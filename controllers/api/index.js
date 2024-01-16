const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./blogRoutes');

// Middleware or configuration that runs before reaching the routes
router.use((req, res, next) => {
    // Include any pre-processing logic here
    console.log('Middleware executing');
    next();
});

// Routes related to users
router.use('/users', userRoutes);

// Routes related to projects or blogs
router.use('/projects', projectRoutes);

// Default route for the root endpoint
router.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

module.exports = router;
