const router = require('express').Router();
const { Post } = require('../../models');

// Create a post
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
});

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
});

// Edit a post
router.put('/edit/:id', async (req, res) => {
    try {
        const edit = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.json(edit);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
});

module.exports = router;