const Campground = require('../models/compground');
module.exports.index = async(req, res) => {
    const allCampgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds: allCampgrounds });
};

module.exports.showById = async(req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
        .populate({ //populate reviews author
            path: 'reviews',
            populate: {
                path: 'author'
            }
        })
        .populate('author'); //populate campground author
    if (!campground) {
        req.flash('error', 'Campground not found')
        res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { campground })
};

module.exports.toNew = (req, res) => {
    res.render('campgrounds/new');
};

module.exports.new = async(req, res) => {
    const campground = new Campground(req.body.campground)
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully created campground');
    res.redirect(`/campgrounds/${campground._id}`)
};

module.exports.toUpdate = async(req, res) => {
    const foundCampground = await Campground.findById(req.params.id);
    if (!foundCampground) {
        req.flash('error', 'Campground not found');
        res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', { campground: foundCampground });
};

module.exports.update = async(req, res) => {
    if (!(req.body.campground)) throw new ExpressError('Your data is not available', 400);
    const campground = await Campground.findByIdAndUpdate(req.params.id, req.body.campground);
    req.flash('success', 'Successfully updated campground')
    res.redirect(`/campgrounds/${campground._id}`)
};

module.exports.delete = async(req, res) => {
    const campground = await Campground.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds')
};