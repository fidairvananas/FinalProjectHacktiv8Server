const express = require("express");
const router = express.Router();
const { register } = require("../controllers/dealerController");

router.get("/", (req, res, next) => {
  res.send("dari dealer routes");
});

module.exports = router;
