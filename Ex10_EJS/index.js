const express = require('express');
const app = express();
const path = require('path');
var data = require('./data.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, 'public')))

app.get('/:input', (req, res) => {
    var { input } = req.params;
    var inputData = data[input];
    res.render('home', {...inputData });
});


app.listen(3000, () => {
    console.log('listening on port 3000');
});