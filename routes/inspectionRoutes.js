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

const {
  changeExteriorInspection,
  getExterior,
} = require("../controllers/exteriorController");

const {
  changeInteriorInspection,
  getInterior,
} = require("../controllers/interiorController");

const {
  getKolong,
  changeKolongInsp,
} = require("../controllers/kolongController");
const {
  getRoadTest,
  changeRoadTestInsp,
} = require("../controllers/roadtestController");

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
router.get("/exterior-detail/:id", getExterior);

router.patch(
  "/interior-detail/:id",
  adminAuthentication,
  changeInteriorInspection
);
router.get("/interior-detail/:id", getInterior);

router.get("/kolong-detail/:id", getKolong);
router.patch("/kolong-detail/:id", adminAuthentication, changeKolongInsp);

router.get("/roadtest-detail/:id", getRoadTest);
router.patch("/roadtest-detail/:id", adminAuthentication, changeRoadTestInsp);

module.exports = router;
