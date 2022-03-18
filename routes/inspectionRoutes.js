const express = require("express");
const router = express.Router();
const {
  changeMainInspection,
  changeExterior,
  changeInterior,
  changeRoadTest,
  changeKolong,
} = require("../controllers/inspectionController");

const adminAuthentication = require("../middlewares/adminAuth");
const adminAuthorization = require("../middlewares/adminAuthorization");

router.patch(
  "/main/:id",
  adminAuthentication,
  adminAuthorization,
  changeMainInspection
);

router.patch(
  "/exterior/:id",
  adminAuthentication,
  adminAuthorization,
  changeExterior
);

router.patch(
  "/interior/:id",
  adminAuthentication,
  adminAuthorization,
  changeInterior
);

router.patch(
  "/roadtest/:id",
  adminAuthentication,
  adminAuthorization,
  changeRoadTest
);

router.patch(
  "/kolong/:id",
  adminAuthentication,
  adminAuthorization,
  changeKolong
);
module.exports = router;
