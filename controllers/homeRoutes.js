const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// This get req is showing each of the posts that are within the seeds to act like a home page main feed
// Like the Twitter(X) and Facebook home page 
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
}); // Working


router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
    }
    res.render('login')
});

// Renders a single post to the page when user clicks on the posts title
router.get('/posts/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: {
                model: User,
                attributes: ['name']
            }
        }
        )
        const post = postData.get({ plain: true });
        res.render('singlePost', {
            ...post,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
}); // Working 

// Expecting this code to render a profile like page for a user of the Blog Spot
// Expecting to see each post that the user has made to the Blog Spot website
// Getting an error saying failed to lookup view "login" in views
router.get('/profile', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            }
        })
        const posts = postData.map(p => p.get({ plain: true }))
        res.render('profile', {
            posts,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
})

module.exports = router