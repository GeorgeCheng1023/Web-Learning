const Campground = require('../models/compground');
const Review = require('../models/review');
module.exports.isCampgroundAuthor = async(req, res, next) => {
    const { id } = req.params;
    const foundCampground = await Campground.findById(id);
    if (!foundCampground.author.equals(req.user._id)) {
        req.flash('error', 'Sorry you are not allowed to do this.')
        res.redirect(`/campgrounds/${id}`);
    }
    next();
};
module.exports.isReviewAuthor = async(req, res, next) => {
    const { id, reviewId } = req.params;
    const foundReview = await Review.findById(reviewId);
    if (!foundReview.author.equals(req.user._id)) {
        req.flash('error', 'Sorry you are not allowed to do this.')
        res.redirect(`/campgrounds/${id}`);
    }
    next();
};