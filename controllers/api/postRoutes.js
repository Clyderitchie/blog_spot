const router = require('express').Router();
const { Post } = require('../../models');

// Get all post for blog spot website
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}) // Works in Thunder Client

// Get post by certain user
router.get('/:id', async (req, res) => {
    try {
        const userPost = await Post.findByPk(req.params.id)
        res.status(200).json(userPost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}) // Works in Thunder Client

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
})

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!projectData) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
        }

        res.status(200).json(projectData);
    } catch (err) {
        res.status(500).json(err.message);
    }
})

module.exports = router;