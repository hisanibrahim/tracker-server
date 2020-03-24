require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");
const mongoUri =
  "mongodb+srv://admin:6XeW2eNxwdYCVf@tracker-cluster-1sx3f.mongodb.net/test?retryWrites=true&w=majority";

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

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

app.get("/", requireAuth, (req, res) => {
  res.send("Hello world!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
