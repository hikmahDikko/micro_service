const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();

app.get("/posts", async(req, res) => {

});

app.get("/events", async(req, res) => {

});

app.listen(4002, () =>{
    console.log("Listening on port 4002")
})