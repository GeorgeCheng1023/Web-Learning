const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const Campground = require('../models/compground');
const { reviewSchema } = require('../models/Schema');

//Error Handle - joi schema check review
const validateReview = (req, res, next) => {
        const { error } = reviewSchema.validate(req.body);
        if (error) {
            const message = error.details.map(errDetails => errDetails.message).join(', ');
            throw new ExpressError(message, 400);
        } else {
            next();
        }
    }
    //Create review - get to reviews list
app.post('/campgrounds/:id/reviews', validateReview, catchAsync(async(req, res) => {
    const { id } = req.params;
    const foundCampground = await Campground.findById(id);
    const newReview = new Review(req.body.review);
    foundCampground.reviews.push(newReview);
    await foundCampground.save();
    await newReview.save();
    res.redirect(`/campgrounds/${id}`);
}))

//Delete review 
app.delete('/campgrounds/:id/reviews/:reviewId', catchAsync(async(req, res) => {
    const { id, reviewId } = req.params;
    const foundCampground = await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    const deleteData = await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}))