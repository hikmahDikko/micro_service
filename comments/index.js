const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(bodyParser.json())

app.use(cors());

const commentsByPostId = {};

app.post("/posts/comments/:id", async (req, res) => {
    const commentId = randomBytes(4).toString('hex');

    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({
        id : commentId, content
    });

    commentsByPostId[req.params.id] = comments

    await axios.post('http://localhost:4005/events', {
        type : 'CommentCreated',
        daat : {
            id : commentId,
            content,
            postId : req.params.id
        }
    })

    res.status(201).send(comments);
});

app.get("/posts/comments/:id", (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post("/events", (req, res) => {
    console.log("Event Received ", req.body.type);

    res.send({});
})

app.listen(4001, () => {
    console.log("Listening on port 4001");
});