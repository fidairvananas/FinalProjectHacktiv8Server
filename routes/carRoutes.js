const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const {
  addCar,
  getCars,
  getCar,
  deleteCar,
  editcar,
  changeInspectionStatus,
} = require("../controllers/carController");
const adminAuthentication = require("../middlewares/adminAuth");
const adminAuthorization = require("../middlewares/adminAuthorization");

router.get("/", getCars);
router.post("/", authentication, addCar);
router.get("/:id", getCar);
router.delete("/:id", authentication, authorization, deleteCar);
router.put("/:id", authentication, authorization, editcar);
router.patch(
  "/:id",
  adminAuthentication,
  adminAuthorization,
  changeInspectionStatus
);

module.exports = router;
