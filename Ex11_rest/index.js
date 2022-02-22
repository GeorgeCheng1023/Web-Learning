const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

var list = [{
    'id': uuidv4(),
    'username': 'Jack',
    'comment': 'Bad'
}];

//Show main page
app.get('/comment', (req, res) => {
    res.render('comments/index', { list });
});
//Shoe add new comment page
app.get('/comment/new', (req, res) => {
    res.render('comments/new');
});
//Shoe by id
app.get('/comment/:id', (req, res) => {
    const { id } = req.params;
    const comment = list.find(c => c.id === id);
    res.render('comments/show', { comment });
});

//Show edit page
app.get('/comment/:id/edit', (req, res) => {
    const { id } = req.params;
    const foundComment = list.find(c => c.id === id);
    res.render('comments/edit', { comment: foundComment });
})

//Post new comment to main page
app.post('/comment/new', (req, res) => {
    const { username, comment } = req.body;
    list.push({ username, comment, id: uuidv4() });
    res.redirect('/comment');
})

//Update comment
app.patch('/comment/:id', (req, res) => {
    const { id } = req.params;
    const newComment = req.body.newComment;
    const foundComment = list.find(c => c.id === id);
    foundComment.comment = newComment;
    res.redirect('/comment');
});

//delete comment
app.delete('/comment/:id', (req, res) => {
    const { id } = req.params;
    list = list.filter(c => c.id !== id);
    res.redirect('/comment');
});
app.listen(3000, () => {
    console.log("listen on port 3000");
});