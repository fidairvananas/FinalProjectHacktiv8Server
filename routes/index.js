const express = require("express");
const router = express.Router();
const dealerRoutes = require("./dealerRoutes");

router.use("/dealers", dealerRoutes);

module.exports = router;
