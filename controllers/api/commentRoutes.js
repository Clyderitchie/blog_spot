const router = require('express').Router();
const { Comment } = require('../../models');


router.post('/', async (req, res) => {
    try {
        const comment = await Comment.create({...req.body, user_id: req.session.user_id})
        res.json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
});

module.exports = router;