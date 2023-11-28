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
                attributes: ['name', 'id']
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
            include: [{
                model: User,
                attributes: ['name']
            }, {
                model: Comment, include: [User]
            }]
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
router.get('/profile', async (req, res) => {
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
});

router.get('/users/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [Post]
        })
        const user = userData.get({ plain: true })
        res.render('profile', {
            user,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
})

module.exports = router


// want to know if the api routes for creating a user are in the right spot 
// want to know if the api routes for the post are in the right spot such as get all of them get all of a single users post
// create a new post and things of that nature

// want to know why the .get for /profile is not rendering correctly to the page
// where would I add the routes for adding a comment section for the post
// I believe it would be adding another Model, adding it in routes to like for example /comment and then creating a handlebar for it