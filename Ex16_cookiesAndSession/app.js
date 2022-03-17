const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))

app.use(flash());

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));

app.get('/flashdemo', (req, res) => {
    req.flash('demo', 'This is flash demo');
    res.redirect('/main', { messages: req.flash('demo') });
})

app.get('/main', (req, res) => {
    res.render('main');
})

app.get('/', (req, res) => {

})

app.listen(3000, () => {
    console.log('listening on port 3000');
})