const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const { campgroundSchema, reviewSchema } = require('./models/Schema')
const Review = require('./models/review')
const Campground = require('./models/compground');
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError');
const campgroundRoutes = require('./routes/campgroundRoutes')
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

app.use('/campgrounds', campgroundRoutes);

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






//Error handler - page not found
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

//Error handler - undefind
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = 'Something went wrong'
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log("listening on port 3000");
});