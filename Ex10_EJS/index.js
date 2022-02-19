import { createRequire } from "module";
const require = createRequire(
    import.meta.url);
import express from 'express';
const app = express();
const path = require('path');
const __dirname = path.resolve();
const data = require('./data.json');

console.log(__dirname);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.get('/:input', (req, res) => {
    const { input } = req.params;
    const inputData = data[input];
    res.render('home.ejs', {...inputData });
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});