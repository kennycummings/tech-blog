const express = require('express');
const router = express.Router();
const { Session } = require('../models'); // Make sure to import your Session model

// Define session-related routes here
router.get('/', async (req, res) => {
    try {
        const sessions = await Session.findAll();
        res.json(sessions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add more routes as needed

module.exports = router;
