const express = require("express");
const router = express.Router();
const dealerRoutes = require("./dealerRoutes");
const carRoutes = require("./carRoutes");

router.use("/dealers", dealerRoutes);
router.use("/cars", carRoutes);

module.exports = router;
