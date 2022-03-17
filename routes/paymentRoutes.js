const router = require("express").Router();

const { payment } = require("../controllers/paymentController");

router.post("/", payment);

module.exports = router;
