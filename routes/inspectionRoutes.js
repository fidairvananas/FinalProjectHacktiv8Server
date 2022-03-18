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

router.patch("/main/:id", adminAuthentication, changeMainInspection);

router.patch("/exterior/:id", adminAuthentication, changeExterior);

router.patch("/interior/:id", adminAuthentication, changeInterior);

router.patch("/roadtest/:id", adminAuthentication, changeRoadTest);

router.patch(
  "/kolong/:id",
  adminAuthentication,
  changeKolong
);
module.exports = router;
