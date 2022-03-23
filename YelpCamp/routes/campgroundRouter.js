const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync')

const { validateCampground } = require('../utils/validate');
const isLoggedIn = require('../utils/isLoggIn');
const { isCampgroundAuthor } = require('../utils/isAuthor');
const campgroundController = require('../controllers/campgroundController');

router.route('/')
    //to index
    .get(campgroundController.index)
    //create new campground
    .post(isLoggedIn,
        validateCampground,
        catchAsync(campgroundController.new));

//get to new page
router.get('/new',
    isLoggedIn,
    campgroundController.toNew);

router.route('/:id')
    //get to show page
    .get(catchAsync(campgroundController.showById))
    //update campground
    .put(isLoggedIn,
        isCampgroundAuthor,
        validateCampground,
        catchAsync(campgroundController.update))
    //delete campground
    .delete(isLoggedIn,
        isCampgroundAuthor,
        catchAsync(campgroundController.delete));

//Update - to edit
router.get('/:id/edit',
    isLoggedIn,
    isCampgroundAuthor,
    catchAsync(campgroundController.toUpdate));

module.exports = router;