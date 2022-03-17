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
} = require("../controllers/carController");

router.get("/", getCars);
router.post("/", authentication, addCar);
router.get("/:id", getCar);
router.delete("/:id", authentication, authorization, deleteCar);
router.put("/:id", authentication, authorization, editcar);

module.exports = router;
