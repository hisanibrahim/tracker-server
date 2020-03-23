const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    return res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  // if email and password not there
  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  // find user using email
  const user = await User.findOne({ email });

  // if user not exist
  if (!user) {
    return res.status(422).send({ error: "Invalid email or password" });
  }

  // if user exist
  try {
    // compare password using comparePassword method defined in src/models/User.js
    await user.comparePassword(password);

    // sign token
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    // if anything goes wrong
    return res.status(422).send({ error: "Invalid email or password" });
  }
});

module.exports = router;
