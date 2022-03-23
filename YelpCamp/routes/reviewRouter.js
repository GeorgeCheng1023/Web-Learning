const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync')
const Campground = require('../models/compground');
const Review = require('../models/review')
const { validateReview } = require('../utils/validate');
const isLoggedIn = require('../utils/isLoggIn');

router.get('/', catchAsync(async(req, res) => {
    const { id } = req.params;
    res.redirect(`/campgrounds/${id}`)
}))

//Create review - get to reviews list
router.post('/', isLoggedIn, validateReview, catchAsync(async(req, res) => {
    const { id } = req.params;
    const foundCampground = await Campground.findById(id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    foundCampground.reviews.push(newReview);
    await foundCampground.save();
    await newReview.save();
    res.redirect(`/campgrounds/${id}`);
}));

//Delete review 
router.delete('/:reviewId', catchAsync(async(req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}));

module.exports = router;