const { log } = require('console');
const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
    console.log('mongoose connected');
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.send('test');
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})