const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync')
const Campground = require('../models/compground');
const Review = require('../models/review')
const { reviewSchema } = require('../models/Schema');
const isLoggedIn = require('../utils/isLoggIn');

//Error Handle - joi schema check review
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const message = error.details.map(errDetails => errDetails.message).join(', ');
        throw new ExpressError(message, 400);
    } else {
        next();
    }
};
//Create review - get to reviews list
router.post('/', isLoggIn, validateReview, catchAsync(async(req, res) => {
    const { id } = req.params;
    console.log(req.params.id);
    const foundCampground = await Campground.findById(id);
    const newReview = new Review(req.body.review);
    foundCampground.reviews.push(newReview);
    await foundCampground.save();
    await newReview.save();
    res.redirect(`/campgrounds/${id}`);
}));

//Delete review 
router.delete('/:reviewId', catchAsync(async(req, res) => {
    const { id, reviewId } = req.params;
    const foundCampground = await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    const deleteData = await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}));

module.exports = router;