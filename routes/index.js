const express = require("express");
const router = express.Router();
const dealerRoutes = require("./dealerRoutes");
const carRoutes = require("./carRoutes");
const adminRoutes = require("./adminRoutes");
const inspectionRoutes = require("./inspectionRoutes");
const brandRoutes = require("./brandRoutes");
const typeRoutes = require("./typeRoutes");

router.use("/dealers", dealerRoutes);
router.use("/cars", carRoutes);
router.use("/admins", adminRoutes);
router.use("/inspections", inspectionRoutes);
router.use("/brands", brandRoutes);
router.use("/types", typeRoutes);

module.exports = router;
