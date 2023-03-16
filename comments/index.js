const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json())

const commentsByPostId = {};

app.post("/posts/comments/:id", (req, res) => {
    const commentId = randomBytes(4).toString('hex');

    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({
        id : commentId, content
    });

    commentsByPostId[req.params.id] = comments

    res.status(201).send(comments);
});

app.get("/posts/comments/:id", (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.listen(4001, () => {
    console.log("Listening on port 4001");
});