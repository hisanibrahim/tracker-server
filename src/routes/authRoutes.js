const express = require("express");
const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log(req.body);
  res.send("You made a post request");
});

module.exports = router;
