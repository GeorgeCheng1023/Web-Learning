const Campground = require('../models/compground');
const Review = require('../models/review');
module.exports.index = async(req, res) => {
    const { id } = req.params;
    res.redirect(`/campgrounds/${id}`)
}

module.exports.new = async(req, res) => {
    const { id } = req.params;
    const foundCampground = await Campground.findById(id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    foundCampground.reviews.push(newReview);
    await foundCampground.save();
    await newReview.save();
    res.redirect(`/campgrounds/${id}`);
};

module.exports.delete = async(req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
};