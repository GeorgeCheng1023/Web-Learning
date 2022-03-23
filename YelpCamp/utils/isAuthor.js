const Campground = require('../models/compground');
module.exports = async(req, res, next) => {
    const { id } = req.params;
    const foundCampground = await Campground.findById(id);
    if (!foundCampground.author.equals(req.user._id)) {
        req.flash('error', 'Sorry you are not allowed to do this.')
        res.redirect(`/campgrounds/${id}`);
    }
    next();
}