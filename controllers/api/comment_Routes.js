const router = require('express').Router();
const { Comment } = require('../../models');

// Route to create a new comment
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create(req.body);
        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to update a comment by ID
router.put('/:id', async (req, res) => {
    try {
        const [updatedRows] = await Comment.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (updatedRows === 0) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to delete a comment by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedRows = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (deletedRows === 0) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
