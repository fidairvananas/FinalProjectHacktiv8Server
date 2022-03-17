const express = require("express");
const router = express.Router();
const dealerRoutes = require("./dealerRoutes");
const paymentRoutes = require('./paymentRoutes')

router.use("/dealers", dealerRoutes);
router.use("/payments", paymentRoutes)

module.exports = router;
