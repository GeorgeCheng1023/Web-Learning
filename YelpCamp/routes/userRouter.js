const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const userController = require('../controllers/userController')

//get to regist page
router.get('/regist', userController.toRegist);

// post regist account
router.post('/', catchAsync(userController.regist));


router.route('/login')
    //get to login page
    .get(userController.toLogin)
    //post login authentication
    .post(passport.authenticate('local', { failureRedirect: '/users/login', failureFlash: true }),
        catchAsync(userController.login)
    );

//logout
router.get('/logout', userController.logout);

module.exports = router;