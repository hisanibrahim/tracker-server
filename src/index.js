const express = require("express");
const mongoose = require("mongoose");

const mongoUri =
  "mongodb+srv://admin:6XeW2eNxwdYCVf@tracker-cluster-1sx3f.mongodb.net/test?retryWrites=true&w=majority";

const app = express();

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb instance..");
});

mongoose.connection.on("error", err => {
  console.error("Error connecting to mongo..", err);
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
