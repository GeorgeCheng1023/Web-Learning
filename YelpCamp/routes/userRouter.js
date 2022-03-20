const express = require('express');
const router = express.Router();
const User = require('../models/user');

//get to regist page
router.get('/register', (req, res, next) => {
    res.render('users/register');
})

// post regist 
router.post('/', async(req, res, next) => {
    try {
        const { email, password, username } = req.body.user;
        const user = new User({ email, username });
        const registUser = await User.register(user, password);
        req.flash('success', 'You have successfully registered')
        res.redirect('/');
    } catch (e) {
        req.flash('error', 'Username or email already registered')
        res.redirect('/users/register');
    }
})

module.exports = router;