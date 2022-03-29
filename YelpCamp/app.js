if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const mongoSanitize = require('express-mongo-sanitize');
const app = express();

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user')

const ExpressError = require('./utils/ExpressError');
const campgroundRouter = require('./routes/campgroundRouter')
const reviewRouter = require('./routes/reviewRouter');
const userRouter = require('./routes/userRouter');

//connet to mongo
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelpcamp');
}

//setting session
const sessionConfig = {
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 24 * 60 * 60 * 7
    }
}

//setting session and flash
app.use(session(sessionConfig));
app.use(flash());

//setting mongo sanitize
app.use(
    mongoSanitize({
        replaceWith: '_',
    }),
);

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


//setting passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//setting local
app.use((req, res, next) => {
    //setting user logIn data
    res.locals.currentUser = req.user;

    //setting flash
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.get('/', (req, res) => {
    res.render('home')
});


//use router
app.use('/campgrounds', campgroundRouter);
app.use('/campgrounds/:id/reviews/', reviewRouter);
app.use('/users', userRouter);

//Error handler - page not found
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
});

//Error handler - undefind
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = 'Something went wrong'
    res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});