const express = require('express');
const app = express();
app.get('/home', (req, res) => {
    res.send('Response home')
})
app.listen(8080, () => {
    console.log("listening on port 8080");
});