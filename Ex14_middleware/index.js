const express = require('express');
const app = express();

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'ji32k7au4a83') {
        next();
    }
    res.send('Wrong password')
}

app.get('/data', verifyPassword, (req, res) => {
    res.send('ru au4y xul4');
})


app.listen(3000, function() {
    console.log('listening on port 3000');
})