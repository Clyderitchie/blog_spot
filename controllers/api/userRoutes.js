const router = require('express').Router();
const { User } = require('../../models');


// Finds all users of the blog post website
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}); // Working in thunder client

// Finds a certain user by their user_id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id,)
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}); // Working in thunder client

// Updates a user for the blog post website
router.put('/:id', async (req, res) => {
    try {
        const newUser = await User.update(
            { name: req.body.name },
            { email: req.body.email },
            { password: req.body.password },
            { where: { id: req.params.id } }
        )
        res.status(200).json(newUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}) // needs work some more

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            res.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(200).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;