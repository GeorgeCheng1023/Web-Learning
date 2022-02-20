const express = require('express');
const app = express();


app.post('post', (req, res) => {
    console.log("post");
    res.send('post it')
})

app.listen(3000, () => {
    console.log("listen on port 3000");
})