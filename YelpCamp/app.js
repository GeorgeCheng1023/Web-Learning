const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const app = express();

const ExpressError = require('./utils/ExpressError');
const campgroundRouter = require('./routes/campgroundRouter')
const reviewRouter = require('./routes/reviewRouter');

//connet to mongo
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelpcamp');
}

const sessionConfig = {
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 24 * 60 * 60 * 7
    }
}
app.use(session(sessionConfig));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

app.engine('ejs', ejsMate);

app.get('/', (req, res) => {
    res.render('home')
});

//use router
app.use('/campgrounds', campgroundRouter);
app.use('/campgrounds/:id/reviews/', reviewRouter)

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