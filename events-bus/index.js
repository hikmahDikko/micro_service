const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.json());

const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;

  events.push(event);

  await axios.post("http://posts-srv:4000/events", event).catch((err) => {
    console.log(err);
  });
  await axios
    .post("http://comments-clusterip-srv:4001/events", event)
    .catch((err) => {
      console.log(err);
    });
  await axios.post("http://query-srv:4002/events", event).catch((err) => {
    console.log(err);
  });
  await axios.post("http://moderations-srv:4003/events", event).catch((err) => {
    console.log(err);
  });

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
