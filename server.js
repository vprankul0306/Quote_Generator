const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { response } = require("express");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  const url = "https://api.adviceslip.com/advice";
  https.get(url, function (response) {
    response.on("data", function (data) {
      const adviceJson = JSON.parse(data);
      const advice = adviceJson.slip.advice;
      const id = adviceJson.slip.id;
      res.render("index", { advice: advice, id: id });
    });
  });
});

app.listen(3000, function () {
  console.log("Listening on port 3000");
});
