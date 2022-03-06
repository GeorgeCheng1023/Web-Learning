const express = require('express');
const app = express();
const myErrorHandler = require('./myErrorHandler');

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'ji32k7au4a83') {
        next();
    }
    throw new myErrorHandler('Password Wrong', 401)
}

app.get('/data', verifyPassword, (req, res) => {
    res.send('ru au4y xul4');
})

app.use(function(err, req, res, next) {
    const { status, message } = err;
    console.log(status, message);
    res.send(status);
})

app.listen(3000, function() {
    console.log('listening on port 3000');
})