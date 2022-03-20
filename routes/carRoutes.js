const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const {
  addCar,
  getCars,
  getCar,
  deleteCar,
  editcar,
  changeInspectionStatus,
} = require("../controllers/carController");
const adminAuthentication = require("../middlewares/adminAuth");

router.get("/", getCars);
router.post("/", authentication, addCar);
router.get("/:id", getCar);
router.delete("/:id", authentication, deleteCar);
router.put("/:id", authentication, editcar);
router.patch("/:id", adminAuthentication, changeInspectionStatus);

module.exports = router;
