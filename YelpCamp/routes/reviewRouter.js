const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');

const { validateReview } = require('../utils/validate');
const isLoggedIn = require('../utils/isLoggIn');
const { isReviewAuthor } = require('../utils/isAuthor');
const reviewController = require('../controllers/reviewController');

router.route('/')
    //get to index
    .get(catchAsync(reviewController.index))
    //Create review - get to reviews list
    .post(isLoggedIn, validateReview, catchAsync(reviewController.new));

//Delete review 
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviewController.delete));

module.exports = router;