const Campground = require('../models/compground');
module.exports.index = async(req, res) => {
    const allCampgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds: allCampgrounds });
};
const { cloudinary } = require('../cloudinary')

module.exports.showById = async(req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
        //populate reviews author
        .populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }
        })
        //populate campground author
        .populate('author');

    if (!campground) {
        req.flash('error', 'Campground not found')
        res.redirect('/campgrounds')
    }

    res.render('campgrounds/show', { campground })
};

//get to new page
module.exports.toNew = (req, res) => {
    res.render('campgrounds/new');
};

//post new
module.exports.new = async(req, res) => {
    const campground = new Campground(req.body.campground)
    campground.images = req.files.map(file => ({
        url: file.path,
        filename: file.filename
    }))
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully created campground');
    res.redirect(`/campgrounds/${campground._id}`)
};

//get to update
module.exports.toUpdate = async(req, res) => {
    const foundCampground = await Campground.findById(req.params.id);
    if (!foundCampground) {
        req.flash('error', 'Campground not found');
        res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', { campground: foundCampground });
};

//put to update
module.exports.update = async(req, res) => {
    console.log(req.body);
    if (!(req.body.campground)) throw new ExpressError('Your data is not available', 400);
    const campground = await Campground.findByIdAndUpdate(req.params.id, req.body.campground);
    const imgs = req.files.map(file => ({
        url: file.path,
        filename: file.filename
    }))
    campground.images.push(...imgs);
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    await campground.save();
    console.log(campground)
    req.flash('success', 'Successfully updated campground');
    res.redirect(`/campgrounds/${campground._id}`);
};

//delete
module.exports.delete = async(req, res) => {
    const campground = await Campground.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully deleted campground');
    res.redirect('/campgrounds');
};