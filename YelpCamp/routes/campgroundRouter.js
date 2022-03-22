const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const Campground = require('../models/compground');
const { campgroundSchema } = require('../models/Schema');
const ExpressError = require('../utils/ExpressError');
const isLoggedIn = require('../utils/isLoggIn')

//Error Handle - joi schema check campground
const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const message = error.details.map(errDetails => errDetails.message).join(', ');
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

//Read  - all
router.get('', async(req, res) => {
    const allCampgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds: allCampgrounds });
});

//Create a new
router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
});

//Read - id
router.get('/:id', catchAsync(async(req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate('reviews');
    if (!campground) {
        req.flash('error', 'Campground not found')
        res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { campground })
}));

//Create - post request
router.post('/', isLoggedIn, validateCampground, catchAsync(async(req, res) => {
    const campground = new Campground(req.body.campground)
    await campground.save();
    req.flash('success', 'Successfully created campground');
    res.redirect(`/campgrounds/${campground._id}`)
}));

//Update - to edit
router.get('/:id/edit', isLoggedIn, async(req, res) => {
    const foundCampground = await Campground.findById(req.params.id);
    if (!foundCampground) {
        req.flash('error', 'Campground not found');
        res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', { campground: foundCampground });
})

//Update - put request
router.put('/:id', isLoggedIn, validateCampground, catchAsync(async(req, res) => {
    if (!(req.body.campground)) throw new ExpressError('Your data is not available', 400);
    const campground = await Campground.findByIdAndUpdate(req.params.id, req.body.campground);
    req.flash('success', 'Successfully updated campground')
    res.redirect(`/campgrounds/${campground._id}`)
}))

//Delete - delete request
router.delete('/:id', async(req, res) => {
    const campground = await Campground.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds')
})

module.exports = router;