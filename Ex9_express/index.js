import express from "express";
const app = express();
app.get('/search', (req, res) => {
    const { q } = req.query;
    res.send(`Response ${q}!!!`);
})
app.listen(8080, () => {
    console.log("listening on port 8080");
});