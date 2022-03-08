const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override');
const { campgroundSchema } = require('./models/Schema')
const Campground = require('./models/compground');
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError');
const { log } = require('console');

//connet to mongo
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelpcamp');
}

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extendend: true }));
app.use(methodOverride('_method'))
app.engine('ejs', ejsMate);
app.get('/', (req, res) => {
    res.render('home')
});

//Error Handle - joi schema check error
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
app.get('/campgrounds', async(req, res) => {
    const allCampgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds: allCampgrounds });
});

//Create a new
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

//Read - id
app.get('/campgrounds/:id', catchAsync(async(req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show', { campground })
}));

//Create - post request
app.post('/campgrounds', validateCampground, catchAsync(async(req, res) => {
    const campground = new Campground(req.body.campground)
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}));

//Update - to edit
app.get('/campgrounds/:id/edit', async(req, res) => {
    const foundCampground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground: foundCampground });
})

//Update - put request
app.put('/campgrounds/:id', validateCampground, catchAsync(async(req, res) => {
    if (!(req.body.campground)) throw new ExpressError('Your data is not available', 400);
    const campground = await Campground.findByIdAndUpdate(req.params.id, req.body.campground);
    res.redirect(`/campgrounds/${campground._id}`)
}))

//Delete - delete request
app.delete('/campgrounds/:id', async(req, res) => {
    const campground = await Campground.findByIdAndDelete(req.params.id);
    res.redirect('/campgrounds')
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

//Error handling - undefind
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = 'Something went wrong'
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log("listening on port 3000");
});