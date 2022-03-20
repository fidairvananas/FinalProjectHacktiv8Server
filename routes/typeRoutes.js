const express = require("express");
const { getTypes, getType } = require("../controllers/typeController");
const router = express.Router();

router.get("/", getTypes);
router.get("/:id", getType);

module.exports = router;
