const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.send("You made a post request");
  } catch (err) {
    res.status(422).send(err.message);
  }
});

module.exports = router;
