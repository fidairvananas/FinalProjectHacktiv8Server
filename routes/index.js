const express = require("express");
const router = express.Router();
const dealerRoutes = require("./dealerRoutes");
const carRoutes = require("./carRoutes");
const adminRoutes = require("./adminRoutes");
const inspectionRoutes = require("./inspectionRoutes");

router.use("/dealers", dealerRoutes);
router.use("/cars", carRoutes);
router.use("/admins", adminRoutes);
router.use("/inspections", inspectionRoutes);

module.exports = router;
