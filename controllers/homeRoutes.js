const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: {
                model: User,
                attributes: ['name']
            }
        });
        const posts = postData.map(p => p.get({ plain: true }))
        res.render('post', {
            posts,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
})

module.exports = router