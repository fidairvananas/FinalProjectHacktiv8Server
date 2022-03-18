const express = require("express");
const router = express.Router();
const dealerRoutes = require("./dealerRoutes");
const carRoutes = require("./carRoutes");
const adminRoutes = require("./adminRoutes");

router.use("/dealers", dealerRoutes);
router.use("/cars", carRoutes);
router.use("/admins", adminRoutes);

module.exports = router;
