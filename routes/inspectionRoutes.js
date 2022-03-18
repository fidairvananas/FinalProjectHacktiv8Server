const express = require("express");
const router = express.Router();
const {
  changeMainInspection,
  changeExterior,
  changeInterior,
  changeRoadTest,
  changeKolong,
  getInspections,
  getInspection,
} = require("../controllers/inspectionController");

const adminAuthentication = require("../middlewares/adminAuth");
const changeExteriorInspection = require("../controllers/exteriorController");
const changeInteriorInspection = require("../controllers/interiorController");

router.get("/", getInspections);

router.get("/:id", getInspection);

router.patch("/main/:id", adminAuthentication, changeMainInspection);

router.patch("/exterior/:id", adminAuthentication, changeExterior);

router.patch("/interior/:id", adminAuthentication, changeInterior);

router.patch("/roadtest/:id", adminAuthentication, changeRoadTest);

router.patch("/kolong/:id", adminAuthentication, changeKolong);

router.patch(
  "/exterior-detail/:id",
  adminAuthentication,
  changeExteriorInspection
);

router.patch(
  "/interior-detail/:id",
  adminAuthentication,
  changeInteriorInspection
);

module.exports = router;
