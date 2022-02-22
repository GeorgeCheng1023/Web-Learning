const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

const list = [{
    'id': uuidv4(),
    'username': 'Jack',
    'comment': 'Bad'
}]

app.get('/comment', (req, res) => {
    res.render('comments/index', { list });
})
app.get('/comment/new', (req, res) => {
    res.render('comments/new');
});
app.get('/comment/:id', (req, res) => {
    const { id } = req.params;
    const comment = list.find(c => c.id === id);
    res.render('comments/show', { comment });
})

app.post('/comment/new', (req, res) => {
    const { username, comment } = req.body;
    list.push({ username, comment, id: uuidv4() });
    res.redirect('/comment');
})

app.listen(3000, () => {
    console.log("listen on port 3000");
})