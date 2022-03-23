const express = require('express');
const router = express.Router({
    mergeParams: true
});
const catchAsync = require('../utils/catchAsync')

const {
    validateCampground
} = require('../utils/validate');
const isLoggedIn = require('../utils/isLoggIn');
const {
    isCampgroundAuthor
} = require('../utils/isAuthor');
const campgroundController = require('../controllers/campgroundController');


//Read  - all
router.get('/', campgroundController.index);

//Create a new
router.get('/new', isLoggedIn, campgroundController.toNew);
//Read - id
router.get('/:id', catchAsync(campgroundController.showById));

//Create - post request
router.post('/', isLoggedIn, validateCampground, catchAsync(campgroundController.new));

//Update - to edit
router.get('/:id/edit', isLoggedIn, isCampgroundAuthor, catchAsync(campgroundController.toUpdate));

//Update - put request
router.put('/:id', isLoggedIn, isCampgroundAuthor, validateCampground, catchAsync(campgroundController.update));

//Delete - delete request
router.delete('/:id', isLoggedIn, isCampgroundAuthor, catchAsync(campgroundController.delete))

module.exports = router;