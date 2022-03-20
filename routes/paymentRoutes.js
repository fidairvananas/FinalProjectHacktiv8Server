const router = require("express").Router();

const {
  payment,
  firstInstallment,
  nextInstallment,
  status,
  updatePayment,
} = require("../controllers/paymentController");

const buyerAuthentication = require("../middlewares/buyerAuth");

router.post("/", buyerAuthentication, payment);
router.get("/status", status);
router.patch("/update/:id", updatePayment);
router.post("/credits/cars", nextInstallment);
router.post("/credits/:id", buyerAuthentication, firstInstallment);

module.exports = router;
